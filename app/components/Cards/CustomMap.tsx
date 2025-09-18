"use client";

import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FormInstance } from "antd";
import CommonInput from "../common/CommonInput";

type LatLng = { lat: number; lng: number };

const containerStyle = {
  width: "100%",
  height: "380px",
};

export default function GoogleMapModern({
  form,
  center = { lat: 24.8607, lng: 67.0011 }, // Karachi
  zoom = 16,
  showMap = true,
  className = "",
}: {
  center?: LatLng;
  zoom?: number;
  form: FormInstance;
  showMap?: boolean;
  className?: string;
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: ["places"],
  });

  const [pickup, setPickup] = useState<LatLng | null>(null);
  const [dropoff, setDropoff] = useState<LatLng | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const [pickupAC, setPickupAC] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [dropoffAC, setDropoffAC] =
    useState<google.maps.places.Autocomplete | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const onLoadMap = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handlePlaceChanged = (which: "pickup" | "dropoff") => {
    const ac = which === "pickup" ? pickupAC : dropoffAC;
    if (!ac) return;

    const place = ac.getPlace();
    if (!place.geometry?.location) return;

    const pos = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    if (which === "pickup") {
      setPickup(pos);
      form.setFieldsValue({ pickup_location: place.formatted_address });
    } else {
      setDropoff(pos);
      form.setFieldsValue({ dropoff_location: place.formatted_address });
    }
  };

  // Compute Route
  const computeRoute = () => {
    if (!pickup || !dropoff || !isLoaded) return;
    if (typeof window === "undefined" || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (status === "OK" && res) {
          setDirections(res);

          const leg = res.routes[0].legs[0];
          setDistance(leg.distance?.text || "");
          setDuration(leg.duration?.text || "");
        }
      }
    );
  };

  // Auto zoom
  useEffect(() => {
    if (pickup && dropoff && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(pickup);
      bounds.extend(dropoff);
      mapRef.current.fitBounds(bounds);
    }
  }, [pickup, dropoff]);

  // Auto compute route when pickup & dropoff exist
  useEffect(() => {
    if (pickup && dropoff) {
      computeRoute();
    }
  }, [pickup, dropoff]);

  return (
    <div className={className}>
      {/* Inputs */}
      <div className="flex flex-col gap-4 mb-6">
        {isLoaded && (
          <Autocomplete
            onLoad={setPickupAC}
            onPlaceChanged={() => handlePlaceChanged("pickup")}
          >
            {/* <input
              type="text"
              placeholder="Enter pickup location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             transition duration-200 ease-in-out"
            /> */}

            <CommonInput
              name="pickup_location"
              label="Pickup Location"
              placeholder="Enter pickup location"
            />
          </Autocomplete>
        )}

        {isLoaded && (
          <Autocomplete
            onLoad={setDropoffAC}
            onPlaceChanged={() => handlePlaceChanged("dropoff")}
          >
            {/* <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             transition duration-200 ease-in-out mt-3"
            /> */}
            <CommonInput
              name="dropoff_location"
              label="Dropoff Location"
              placeholder="Enter dropoff location"
            />
          </Autocomplete>
        )}
      </div>

      {/* Map */}
      {showMap && isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoadMap}
          options={{
            disableDefaultUI: true,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {pickup && <Marker position={pickup} />}
          {dropoff && <Marker position={dropoff} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}

      {/* Distance & Duration */}
      {(distance || duration) && (
        <div className="text-sm mt-3 space-y-1">
          {distance && (
            <div>
              📏 Distance: <strong>{distance}</strong>
            </div>
          )}
          {duration && (
            <div>
              ⏱ Duration: <strong>{duration}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
