import dayjs from "dayjs";

// ---------------- Types ----------------

type Hotel = {
  id: string;
  hotel_id: string;
  room_name: string;
  hotel: { name: string };
  fromDate?: string;
  toDate?: string;
  bookingDates?: string[];
};

type Car = {
  id: string;
  name: string;
  pickup_location: string;
  dropoff_location: string;
  bookingDates?: string[];
};

type Site = {
  id: string;
  name: string;
  bookingDates?: string[];
};

type Restaurant = {
  restaurant: { id: string; name: string };
  dishId: string;
  dishName: string;
  variant: { id: string; name: string };
  quantity: number;
  bookingDates?: string[];
  selectedDate?: string[];
};

type Destination = {
  name: string;
  startDate?: string;
  endDate?: string;
  hotels?: Hotel[];
  cars?: Car[];
  sites?: Site[];
  restaurants?: Restaurant[];
};

type Plan = {
  planDateRange?: [string, string];
};

export type Payload = {
  plan?: Plan;
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
  }[];

  carBookings: {
    id: string;
    name: string;
    pickup_location: string;
    dropoff_location: string;
  }[];

  siteBookings: {
    id: string;
    name: string;
    date?: string[];
  }[];

  restaurantBookings: {
    restaurantId: string;
    restaurantName: string;
    dishId: string;
    dishName: string;
    variantId: string;
    variantName: string;
    quantity: number;
  }[];
};

// ---------------- Helpers ----------------

function getDateRange(start?: string, end?: string): string[] {
  if (!start || !end) return [];
  let s = dayjs(start).startOf("day");
  let e = dayjs(end).startOf("day");

  // agar start > end, swap kar do
  if (s.isAfter(e)) {
    [s, e] = [e, s];
  }

  const res: string[] = [];
  while (s.isBefore(e) || s.isSame(e)) {
    res.push(s.format("YYYY-MM-DD"));
    s = s.add(1, "day");
  }
  return res;
}

function hasDate(
  item: any,
  date: string,
  key: string = "bookingDates"
): boolean {
  return Array.isArray(item[key]) && item[key].includes(date);
}

// ---------------- Main Function ----------------

export function transformToDayWise(payload: Payload): DayWise[] {
  const result: DayWise[] = [];

  for (const dest of payload.destinations || []) {
    // sirf destination ka date range use karenge
    const destDates = getDateRange(dest.startDate, dest.endDate);

    destDates.forEach((date) => {
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
          })),

        carBookings: (dest.cars || [])
          .filter((c) => hasDate(c, date))
          .map((c) => ({
            id: c.id,
            name: c.name,
            pickup_location: c.pickup_location,
            dropoff_location: c.dropoff_location,
          })),

        siteBookings: (dest.sites || [])
          .filter((s) => hasDate(s, date))
          .map((s) => ({
            id: s.id,
            name: s.name,
            date: s.bookingDates,
          })),

        restaurantBookings: (dest.restaurants || [])
          .filter((r) => hasDate(r, date, "selectedDate") || hasDate(r, date))
          .map((r) => ({
            restaurantId: r.restaurant?.id,
            restaurantName: r.restaurant?.name,
            dishId: r.dishId,
            dishName: r.dishName,
            variantId: r.variant?.id,
            variantName: r.variant?.name,
            quantity: r.quantity,
          })),
      });
    });
  }

  return result;
}
