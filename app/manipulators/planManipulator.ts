import dayjs from "dayjs";

// ---------------- Types ----------------
type Hotel = {
  id: string;
  hotel_id: string;
  room_name: string;
  hotel: {
    name: string;
    images?: string[];
    image?: string;
  };
  bookingDates?: (string | { date: string })[];
  images?: string[];
};

type Car = {
  id: string;
  name: string;
  pickup_location: string;
  dropoff_location: string;
  model: string;
  brand?: { name: string };
  bookingDates?: (string | { date: string })[];
  images?: { image_path: string }[];
};

type Site = {
  id: string;
  name: string;
  bookingDates?: (string | { date: string })[];
  images?: string[];
};

type Restaurant = {
  restaurant: {
    id: string;
    name: string;
    images?: string[];
  };
  dishId: string;
  dish: {
    name: string;
    images?: string[];
  };
  variant: { id: string; name: string };
  quantity: number;
  bookingDates?: (string | { date: string })[];
  mealType: string;
  selectedDate?: (string | { date: string })[];
};

type Destination = {
  id?: string;
  name: string;
  startDate?: string;
  endDate?: string;
  hotels?: Hotel[];
  cars?: Car[];
  sites?: Site[];
  restaurants?: Restaurant[];
};

export type Payload = {
  plan?: any;
  destinations?: Destination[];
};

// ---------------- Output structure ----------------
export type DayWise = {
  date: string;
  destination: string;

  hotelBookings: {
    hotel_id: string;
    room_id: string;
    room_name: string;
    hotel_name: string;
    thumbnail: string;
    images: string[];
  }[];

  carBookings: {
    id: string;
    name: string;
    model: string;
    brand: string;
    pickup_location: string;
    dropoff_location: string;
    thumbnail: string;
    images: string[];
  }[];

  siteBookings: {
    id: string;
    name: string;
    date?: string[];
    thumbnail: string;
    images: string[];
  }[];

  restaurantBookings: {
    restaurantId: string;
    restaurantName: string;
    dishId: string;
    dishName: string;
    variantId: string;
    mealType: string;
    variantName: string;
    quantity: number;
    thumbnail: string;
    images: string[];
  }[];
};

// ---------------- Helpers ----------------

// ✅ Normalize bookingDates into string array (ignore hours)
function normalizeDates(dates: any): string[] {
  if (!Array.isArray(dates)) return [];
  return dates
    .map((d) => (typeof d === "string" ? d : d?.date))
    .filter(Boolean);
}

// ✅ Check if a given item is booked on a date
function hasDate(
  item: any,
  date: string,
  key: string = "bookingDates"
): boolean {
  const dates = normalizeDates(item[key]);
  return dates.includes(date);
}

// ✅ Get date range between start & end date
function getDateRange(start?: string, end?: string): string[] {
  if (!start || !end) return [];
  let s = dayjs(start).startOf("day");
  let e = dayjs(end).startOf("day");

  if (s.isAfter(e)) [s, e] = [e, s]; // swap if start > end

  const res: string[] = [];
  while (s.isBefore(e) || s.isSame(e)) {
    res.push(s.format("YYYY-MM-DD"));
    s = s.add(1, "day");
  }
  return res;
}

// ---------------- Main Function ----------------
export function transformToDayWise(payload: Payload): DayWise[] {
  const result: DayWise[] = [];

  for (const dest of payload.destinations || []) {
    const destDates = getDateRange(dest.startDate, dest.endDate);

    // ✅ Include any extra dates from booking arrays (in case date range missing)
    const extraDates = new Set(destDates);
    [
      ...(dest.hotels || []),
      ...(dest.sites || []),
      ...(dest.cars || []),
      ...(dest.restaurants || []),
    ].forEach((item) => {
      normalizeDates(item.bookingDates).forEach((d) => extraDates.add(d));
    });

    Array.from(extraDates).forEach((date) => {
      result.push({
        date,
        destination: dest.name,

        hotelBookings: (dest.hotels || [])
          .filter((h) => hasDate(h, date))
          .map((h) => ({
            hotel_id: h.hotel_id,
            room_id: h.id,
            room_name: h.room_name,
            hotel_name: h.hotel.name,
            thumbnail: h.images?.[0] || h.hotel.image || "",
            images: [...(h.images || []), ...(h.hotel.images || [])],
          })),

        carBookings: (dest.cars || [])
          .filter((c) => hasDate(c, date))
          .map((c) => ({
            id: c.id,
            name: c.name,
            model: c.model,
            brand: c?.brand?.name || "",
            pickup_location: c.pickup_location,
            dropoff_location: c.dropoff_location,
            thumbnail: c.images?.[0]?.image_path || "",
            images: (c.images || []).map((img) => img.image_path),
          })),

        siteBookings: (dest.sites || [])
          .filter((s) => hasDate(s, date))
          .map((s) => ({
            id: s.id,
            name: s.name,
            date: normalizeDates(s.bookingDates),
            thumbnail: s.images?.[0] || "",
            images: s.images || [],
          })),

        restaurantBookings: (dest.restaurants || [])
          .filter((r) => hasDate(r, date, "selectedDate") || hasDate(r, date))
          .map((r) => ({
            restaurantId: r.restaurant?.id,
            restaurantName: r.restaurant?.name,
            dishId: r.dishId,
            dishName: r.dish?.name,
            mealType: r.mealType,
            variantId: r.variant?.id,
            variantName: r.variant?.name,
            quantity: r.quantity,
            thumbnail: r.dish?.images?.[0] || r.restaurant?.images?.[0] || "",
            images: [
              ...(r.dish?.images || []),
              ...(r.restaurant?.images || []),
            ],
          })),
      });
    });
  }

  // ✅ Sort result by date ascending
  return result.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
}
