"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { FormInstance } from "antd";

type LatLng = { lat: number; lng: number };

export default function GoogleMapModern({
  center = { lat: 24.8607, lng: 67.0011 }, // Karachi
  zoom = 11,
  height = "480px",
  width = "100%",
  form,
  showMap = true,
}: {
  center?: LatLng;
  zoom?: number;
  height?: string;
  width?: string;
  form: FormInstance;
  showMap?: boolean;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const pickupACRef = useRef<HTMLDivElement | null>(null);
  const dropoffACRef = useRef<HTMLDivElement | null>(null);

  const gmap = useRef<google.maps.Map | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const AdvancedMarkerElementRef = useRef<any>(null);
  const PinElementRef = useRef<any>(null);

  const pickupMarker = useRef<any>(null);
  const dropoffMarker = useRef<any>(null);
  const routePolyline = useRef<google.maps.Polyline | null>(null);

  const [pickup, setPickup] = useState<{
    lat: number | null;
    lng: number | null;
    address: string;
  }>({
    lat: null,
    lng: null,
    address: "",
  });
  const [dropoff, setDropoff] = useState<{
    lat: number | null;
    lng: number | null;
    address: string;
  }>({
    lat: null,
    lng: null,
    address: "",
  });

  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  // helper
  const hasBoth = () =>
    pickup.lat != null &&
    pickup.lng != null &&
    dropoff.lat != null &&
    dropoff.lng != null;

  // ---- BOOT the map once Google is ready
  useEffect(() => {
    const onReady = () => {
      boot().catch(console.error);
    };
    window.addEventListener("gmaps:ready", onReady);

    // If script already loaded (user navigated within app)
    if ((window as any).google?.maps?.importLibrary) {
      onReady();
    }

    return () => window.removeEventListener("gmaps:ready", onReady);
  }, []);

  async function boot() {
    // ✅ Agar map nahi dikhana to sirf inputs load kar do
    const { PlaceAutocompleteElement }: any = await (
      google.maps as any
    ).importLibrary("places");

    const { AdvancedMarkerElement, PinElement }: any = await (
      google.maps as any
    ).importLibrary("marker");

    AdvancedMarkerElementRef.current = AdvancedMarkerElement;
    PinElementRef.current = PinElement;

    geocoder.current = new google.maps.Geocoder();

    // --- Pickup autocomplete
    const pickupEl = new PlaceAutocompleteElement();
    pickupEl.placeholder = "Search pickup…";
    pickupEl.style.width = "100%";
    pickupACRef.current?.replaceChildren(pickupEl);

    pickupEl.addEventListener(
      "gmp-select",
      async ({ placePrediction }: any) => {
        const place = placePrediction.toPlace();
        await place.fetchFields({
          fields: ["formattedAddress", "location", "displayName", "viewport"],
        });
        const loc = place.location;
        setPoint(
          "pickup",
          loc.lat(),
          loc.lng(),
          place.formattedAddress || place.displayName
        );

        // 👇 agar map enable hai to map pe pan/fitBounds karo
        if (showMap) {
          if (place.viewport) gmap.current?.fitBounds(place.viewport);
          else gmap.current?.panTo(loc);
        }
      }
    );

    // --- Dropoff autocomplete
    const dropEl = new PlaceAutocompleteElement();
    dropEl.placeholder = "Search drop-off…";
    dropEl.style.width = "100%";
    dropoffACRef.current?.replaceChildren(dropEl);

    const toggleDropDisabled = () => {
      dropEl.disabled = pickup.lat == null;
    };
    toggleDropDisabled();
    const pickupToggleInterval = window.setInterval(toggleDropDisabled, 250);

    dropEl.addEventListener("gmp-select", async ({ placePrediction }: any) => {
      const place = placePrediction.toPlace();
      await place.fetchFields({
        fields: ["formattedAddress", "location", "displayName", "viewport"],
      });
      const loc = place.location;
      setPoint(
        "dropoff",
        loc.lat(),
        loc.lng(),
        place.formattedAddress || place.displayName
      );

      if (showMap) {
        if (place.viewport) gmap.current?.fitBounds(place.viewport);
        else gmap.current?.panTo(loc);
      }
    });

    // ✅ Agar showMap false hai to yahan hi stop kar do
    if (!showMap) {
      return () => window.clearInterval(pickupToggleInterval);
    }

    // --- Agar map visible hai to initialize karo
    const { Map } = (await (google.maps as any).importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    const { encoding } = await (google.maps as any).importLibrary("geometry");

    gmap.current = new Map(mapRef.current as HTMLDivElement, {
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
      center,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // --- Map click se pickup/dropoff set karna
    gmap.current?.addListener("click", (e: google.maps.MapMouseEvent) => {
      const latLng = e.latLng!;
      const which =
        pickup.lat == null
          ? "pickup"
          : dropoff.lat == null
          ? "dropoff"
          : "dropoff";
      setPointFromLatLng(which as "pickup" | "dropoff", latLng);
    });

    // --- Resize fix
    setTimeout(() => google.maps.event.trigger(gmap.current!, "resize"), 150);

    // Cleanup
    return () => {
      window.clearInterval(pickupToggleInterval);
    };
  }

  function setPointFromLatLng(
    which: "pickup" | "dropoff",
    latLng: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    const lat =
      typeof (latLng as any).lat === "function"
        ? (latLng as google.maps.LatLng).lat()
        : (latLng as any).lat;
    const lng =
      typeof (latLng as any).lng === "function"
        ? (latLng as google.maps.LatLng).lng()
        : (latLng as any).lng;

    // Try Geocoding; if not enabled, fall back to lat,lng
    geocoder.current?.geocode({ location: { lat, lng } }, (results, status) => {
      const addr =
        status === "OK" && results && results[0]
          ? results[0].formatted_address
          : `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setPoint(which, lat, lng, addr);
    });
  }

  function setPoint(
    which: "pickup" | "dropoff",
    lat: number,
    lng: number,
    address: string
  ) {
    const AM = AdvancedMarkerElementRef.current;
    const Pin = PinElementRef.current;

    const buildPin = (bg: string, glyph: string) =>
      new Pin({
        background: bg,
        glyphColor: "#fff",
        borderColor: "#111827",
        glyph,
      });

    if (which === "pickup") {
      setPickup({ lat, lng, address });

      // 👇 hidden form field update
      form.setFieldsValue({
        pickup_location: address,
      });

      if (!pickupMarker.current) {
        pickupMarker.current = new AM({
          map: gmap.current,
          position: { lat, lng },
          content: buildPin("#ef4444", "A").element,
          gmpDraggable: true,
          title: "Pickup",
        });
        pickupMarker.current.addListener("dragend", () => {
          const p = pickupMarker.current.position;
          setPointFromLatLng("pickup", p);
        });
      } else {
        pickupMarker.current.position = { lat, lng };
      }
    } else {
      setDropoff({ lat, lng, address });

      // 👇 hidden form field update
      form.setFieldsValue({
        dropoff_location: address,
      });

      if (!dropoffMarker.current) {
        dropoffMarker.current = new AM({
          map: gmap.current,
          position: { lat, lng },
          content: buildPin("#3b82f6", "B").element,
          gmpDraggable: true,
          title: "Drop-off",
        });
        dropoffMarker.current.addListener("dragend", () => {
          const p = dropoffMarker.current.position;
          setPointFromLatLng("dropoff", p);
        });
      } else {
        dropoffMarker.current.position = { lat, lng };
      }
    }

    if (hasBoth()) computeRoute();
  }

  async function computeRoute() {
    // Clear any previous line
    if (routePolyline.current) {
      routePolyline.current.setMap(null);
      routePolyline.current = null;
    }

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!;
    try {
      const body = {
        origin: {
          location: { latLng: { latitude: pickup.lat, longitude: pickup.lng } },
        },
        destination: {
          location: {
            latLng: { latitude: dropoff.lat, longitude: dropoff.lng },
          },
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
      };

      const res = await fetch(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": key,
            "X-Goog-FieldMask":
              "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      const route = data?.routes?.[0];
      if (!route) {
        setDistance("");
        setDuration("");
        return;
      }

      const path = google.maps.geometry.encoding.decodePath(
        route.polyline.encodedPolyline
      );
      routePolyline.current = new google.maps.Polyline({
        path,
        map: gmap.current!,
        strokeWeight: 5,
      });
      setDistance(`${(route.distanceMeters / 1000).toFixed(1)} km`);
      // e.g. "1234s" → simple formatting
      const secs = Number(String(route.duration).replace("s", ""));
      const mins = Math.round(secs / 60);
      setDuration(
        mins < 60
          ? `${mins} min`
          : `${Math.floor(mins / 60)} h ${mins % 60} min`
      );
    } catch (e) {
      console.error("Routes API error:", e);
      setDistance("");
      setDuration("");
    }
  }

  // Simple haversine fallback if you don’t want to call Routes API on every change:
  function straightLineKm(): string {
    if (!hasBoth()) return "";
    const toRad = (d: number) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad((dropoff.lat! - pickup.lat!) as number);
    const dLng = toRad((dropoff.lng! - pickup.lng!) as number);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(pickup.lat!)) *
        Math.cos(toRad(dropoff.lat!)) *
        Math.sin(dLng / 2) ** 2;
    return (R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(2);
  }

  return (
    <>
      {/* Set the global callback so the script can signal readiness */}
      <Script id="gmaps-ready-callback">{`
        window.__onGmapsReady = function() {
          window.dispatchEvent(new Event('gmaps:ready'));
        };
      `}</Script>

      {/* NEW single loader: weekly + libraries + map_ids + callback */}
      <Script
        id="gmaps-loader"
        strategy="afterInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&v=weekly&libraries=places,marker,geometry&map_ids=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}&callback=__onGmapsReady`}
      />

      <div>
        <div className="flex flex-col gap-2">
          <div
            className="customMapinput *:!text-black flex-1"
            ref={pickupACRef}
          />
          <div className="customMapinput flex-1" ref={dropoffACRef} />
        </div>

        {showMap && (
          <div
            ref={mapRef}
            style={{
              height,
              width,
              marginTop: 12,
              borderRadius: 6,
            }}
          />
        )}
      </div>

      {(distance || hasBoth()) && (
        <div style={{ marginTop: 12, lineHeight: 1.6 }}>
          {distance ? (
            <div>
              📏 Distance (route): <strong>{distance}</strong>
            </div>
          ) : null}
          {duration ? (
            <div>
              ⏱ Duration (route): <strong>{duration}</strong>
            </div>
          ) : null}
          {!distance && hasBoth() ? (
            <div>
              📐 Straight-line (fallback):{" "}
              <strong>{straightLineKm()} km</strong>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
