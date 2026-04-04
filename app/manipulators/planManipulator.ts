import dayjs from "dayjs";

// ---------------- Types ----------------
type Hotel = {
  id: string | number;
  hotel_id?: string | number;
  room_name: string;
  price_double?: number;
  price?: number;
  hotel?: {
    name: string;
    images?: string[];
    image?: string;
  };
  bookingDates?: any[];
  images?: string[];
  hotel_name?: string;
};

type Car = {
  id: string | number;
  name?: string;
  price?: number;
  daily_rate?: number;
  pickup_location?: string;
  dropoff_location?: string;
  model?: string;
  brand?: { name: string };
  bookingDates?: any[];
  images?: { image_path: string }[];
};

type Site = {
  id: string | number;
  name: string;
  price_adult?: number;
  price_child?: number;
  bookingDates?: any[];
  images?: string[];
};

type Restaurant = {
  restaurant?: {
    id: string | number;
    name: string;
    images?: string[];
  };
  dishId?: string | number;
  dish?: {
    name: string;
    images?: string[];
  };
  variant: { id: string | number; name: string; price?: number };
  quantity: number;
  bookingDates?: (string | { date: string } | any)[];
  mealType: string;
  selectedDate?: (string | { date: string } | any)[];
};

type Destination = {
  id?: string | number;
  nights?: number;
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

export type DayWise = {
  date: string;
  destination: string;
  destinationId: string | number;

  hotelBookings: any[];
  carBookings: any[];
  siteBookings: any[];
  restaurantBookings: any[];
};

// ---------------- Helpers ----------------

// ✅ Normalize all date formats
function normalizeDates(dates: any): string[] {
  if (!Array.isArray(dates)) return [];
  return dates
    .map((d: any) => {
      const dateStr =
        typeof d === "string"
          ? d
          : d?.$isDayjsObject || d?.format
            ? d
            : d?.date;
      if (!dateStr) return null;
      const normalized = dayjs(dateStr).isValid()
        ? dayjs(dateStr).format("YYYY-MM-DD")
        : null;
      return normalized;
    })
    .filter((d): d is string => d !== null); // ✅ Type guard
}

// ✅ Check if an item has this date
function hasDate(item: any, date: string, key = "bookingDates"): boolean {
  const dates = normalizeDates(item[key]);
  return dates.includes(date);
}

// ✅ Generate inclusive date range
function getDateRange(start?: string, end?: string): string[] {
  if (!start || !end || !dayjs(start).isValid() || !dayjs(end).isValid())
    return [];

  let s = dayjs(start).startOf("day");
  let e = dayjs(end).startOf("day");

  if (s.isAfter(e)) [s, e] = [e, s]; // swap

  const res: string[] = [];
  while (s.isBefore(e) || s.isSame(e)) {
    res.push(s.format("YYYY-MM-DD"));
    s = s.add(1, "day");
  }
  return res;
}

// ---------------- Main Transformer ----------------
export function transformToDayWise(payload: Payload): DayWise[] {
  const result: DayWise[] = [];

  for (const dest of payload.destinations || []) {
    if (!dest.nights || dest.nights === 0) continue;
    // ✅ Normalize destination-level date range
    const destDates = getDateRange(dest.startDate, dest.endDate);

    const allDates = new Set(destDates);

    // ✅ Collect all booking dates (extra ones)
    [
      ...(dest.hotels || []),
      ...(dest.sites || []),
      ...(dest.cars || []),
      ...(dest.restaurants || []),
    ].forEach((item) => {
      normalizeDates(item.bookingDates).forEach((d) => allDates.add(d));

      // ✅ Only for restaurants
      if ("selectedDate" in item && item.selectedDate) {
        normalizeDates(item.selectedDate).forEach((d) => allDates.add(d));
      }
    });

    // ✅ Skip invalid or empty destinations
    const dateArray = Array.from(allDates).filter((d) => dayjs(d).isValid());
    if (dateArray.length === 0) continue;

    // ✅ Build day-wise entries
    for (const date of dateArray) {
      result.push({
        date,
        destination: dest.name,
        destinationId: dest.id || "",

        hotelBookings: (dest.hotels || [])
          .filter((h) => hasDate(h, date))
          .map((h) => ({
            hotel_id: h.hotel_id || "",
            room_id: h.id,
            room_name: h.room_name,
            price: Number(h.price || h.price_double || 0),
            hotel_name: h.hotel?.name || h.hotel_name || "",
            thumbnail: h.images?.[0] || h.hotel?.image || "",
            images: [...(h.images || []), ...(h.hotel?.images || [])],
          })),

        carBookings: (dest.cars || [])
          .filter((c) => hasDate(c, date))
          .map((c) => ({
            id: c.id,
            name: c.name || "",
            model: c.model || "",
            brand: c?.brand?.name || "",
            price: Number(c.daily_rate || c.price || 0),
            pickup_location: c.pickup_location || "",
            dropoff_location: c.dropoff_location || "",
            thumbnail: c.images?.[0]?.image_path || "",
            images: (c.images || []).map((img) => img.image_path),
          })),

        siteBookings: (dest.sites || [])
          .filter((s) => hasDate(s, date))
          .map((s) => ({
            id: s.id,
            name: s.name,
            price_adult: Number(s.price_adult || 0),
            price_child: Number(s.price_child || 0),
            date: normalizeDates(s.bookingDates),
            thumbnail: s.images?.[0] || "",
            images: s.images || [],
          })),

        restaurantBookings: (dest.restaurants || [])
          .filter((r) => hasDate(r, date, "selectedDate") || hasDate(r, date))
          .map((r) => ({
            restaurantId: r.restaurant?.id || "",
            restaurantName: r.restaurant?.name || "",
            dishId: r.dishId || "",
            dishName: r.dish?.name || "",
            mealType: r.mealType,
            variantId: r.variant?.id,
            variantName: r.variant?.name,
            price: Number(r.variant?.price || 0),
            quantity: r.quantity,
            thumbnail: r.dish?.images?.[0] || r.restaurant?.images?.[0] || "",
            images: [
              ...(r.dish?.images || []),
              ...(r.restaurant?.images || []),
            ],
          })),
      });
    }
  }

  // ✅ Sort by valid ascending date
  return result
    .filter((r) => dayjs(r.date).isValid())
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
}
