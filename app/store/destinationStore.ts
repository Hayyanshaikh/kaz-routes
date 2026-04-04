// useDestinationStore.ts
import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";
import usePlanStore from "./planStore";
import { persist, createJSONStorage } from "zustand/middleware";

// ----------------------------
// Type Definitions (No Change)
// ----------------------------
export interface Hotel {
  id: string | number;
  room_name: string;
  nights?: number; // Updated to optional as per usage
  price_double: number; // Booking dates are now stored in an array inside the item object
  bookingDates?: (string | Dayjs)[]; // Baaki fields jaise hotel, fromDate, toDate bhi is mein shamil ho sakte hain
}

export interface Car {
  id: string | number;
  name?: string; // Model name, etc.
  price: number;
  bookingDates?: (string | Dayjs)[]; // Baaki fields jaise model, brand, daily_rate bhi is mein shamil ho sakte hain
}

export interface Site {
  id: string | number;
  name: string; // Site bookings are stored as objects with date and hours
  price_adult?: number;
  price_child?: number;
  bookingDates?: {
    date: string | Dayjs;
    hours: number;
  }[];
}

export interface RestaurantVariant {
  id: string | number;
  size: string;
  price: number;
}

// Updated based on your data structure, containing selectedDate array
export interface RestaurantBooking {
  id: string | number; // Dish ID or internal unique ID
  restaurantId: string | number;
  name: string; // Restaurant Name
  variant: RestaurantVariant;
  mealType: string;
  quantity: number;
  selectedDate?: (string | Dayjs)[]; // Dates ki list // Baaki fields jaise restaurant, dish bhi shamil ho sakte hain
}

export interface Destination {
  id: string | number;
  name: string;
  image: string;
  nights?: number;
  startDate?: string;
  endDate?: string;
  hotels?: Hotel[];
  cars?: Car[];
  sites?: Site[];
  restaurants?: RestaurantBooking[];
}

interface DestinationState {
  destinations: Destination[];

  addNight: (destinationId: string | number, nightsToAdd: number) => void;
  removeNight: (destinationId: string | number, nightsToRemove: number) => void;

  addDestination: (destination: Destination) => void;
  updateDestination: (
    destinationId: string | number,
    updatedData: Partial<Destination>,
  ) => void;
  removeDestination: (destinationId: string | number) => void;
  resetDestinations: () => void; // --- ID-based functions (Poora item remove) ---

  addHotel: (destinationId: string | number, hotel: Hotel) => void;
  removeHotel: (
    destinationId: string | number,
    hotelId: string | number,
  ) => void;

  addCar: (destinationId: string | number, car: Car) => void;
  removeCar: (destinationId: string | number, carId: string | number) => void;

  addSite: (destinationId: string | number, site: Site) => void;
  removeSite: (destinationId: string | number, siteId: string | number) => void;

  addRestaurant: (
    destinationId: string | number,
    restaurant: RestaurantBooking,
  ) => void;
  removeRestaurant: (
    destinationId: string | number,
    variantId: string | number,
  ) => void; // --- Date-based functions (Sirf Date Remove) ---

  removeHotelByDate: (
    destinationId: string | number,
    hotelId: string | number,
    dateToRemove: string | Dayjs,
  ) => void;

  removeCarByDate: (
    destinationId: string | number,
    carId: string | number,
    dateToRemove: string | Dayjs,
  ) => void;

  removeSiteByDate: (
    destinationId: string | number,
    siteId: string | number,
    dateToRemove: string | Dayjs,
  ) => void;

  removeRestaurantByDate: (
    destinationId: string | number,
    variantId: string | number,
    dateToRemove: string | Dayjs,
  ) => void;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
}

const useDestinationStore = create<DestinationState>()(
  persist(
    (set, get) => ({
      destinations: [], // --- Nights/Destination CRUD ---
      hasHydrated: false,

      addNight: (destinationId, nightsToAdd) => {
        const { dayCount, usedDays } = usePlanStore.getState();
        const maxAddable = dayCount - usedDays;
        const actualAdd = Math.min(nightsToAdd, maxAddable);
        if (actualAdd <= 0) return;

        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? { ...d, nights: (d.nights || 0) + actualAdd }
              : d,
          ),
        }));
        usePlanStore.getState().addUsedDays(actualAdd);
      },

      removeNight: (destinationId, nightsToRemove) => {
        set((state) => ({
          destinations: state.destinations.map((d) => {
            if (d.id === destinationId) {
              const newNights = Math.max((d.nights || 0) - nightsToRemove, 0);
              usePlanStore.getState().removeUsedDays(nightsToRemove);
              return { ...d, nights: newNights };
            }
            return d;
          }),
        }));
      },

      addDestination: (destination) =>
        set((state) => ({
          destinations: [
            ...state.destinations,
            {
              ...destination,
              hotels: [],
              cars: [],
              sites: [],
              restaurants: [],
            },
          ],
        })),

      updateDestination: (destinationId, updatedData) =>
        set((state) => ({
          destinations: state.destinations.map((d) => {
            if (d.id !== destinationId) return d;

            const start = updatedData.startDate || d.startDate;
            const end = updatedData.endDate || d.endDate;

            let correctedStart = start;
            let correctedEnd = end;

            if (start && end && dayjs(start).isAfter(dayjs(end))) {
              correctedStart = end;
              correctedEnd = start;
            }

            return {
              ...d,
              ...updatedData,
              startDate: correctedStart,
              endDate: correctedEnd,
            };
          }),
        })),

      removeDestination: (destinationId) => {
        const destToRemove = get().destinations.find(
          (d) => d.id === destinationId,
        );
        if (destToRemove && destToRemove.nights) {
          usePlanStore.getState().removeUsedDays(destToRemove.nights);
        }
        set({
          destinations: get().destinations.filter(
            (d) => d.id !== destinationId,
          ),
        });
      },

      resetDestinations: () => set({ destinations: [] }), // --- ID-based Hotels ---

      addHotel: (destinationId, hotel) =>
        set((state) => ({
          destinations: state.destinations.map((d) => {
            if (d.id !== destinationId) return d;

            const existsIndex = d.hotels?.findIndex((h) => h.id === hotel.id);

            let updatedHotels;
            if (existsIndex !== undefined && existsIndex > -1) {
              updatedHotels = d.hotels!.map((h, index) =>
                index === existsIndex
                  ? { ...h, bookingDates: hotel.bookingDates }
                  : h,
              );
            } else {
              updatedHotels = [...(d.hotels || []), hotel];
            }
            return { ...d, hotels: updatedHotels };
          }),
        })),

      removeHotel: (destinationId, hotelId) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? {
                  ...d,
                  hotels: d.hotels?.filter((h) => h.id !== hotelId) || [],
                }
              : d,
          ),
        })), // --- ID-based Cars ---

      addCar: (destinationId, car) =>
        set((state) => ({
          destinations: state.destinations.map((d) => {
            if (d.id !== destinationId) return d;

            const existsIndex = d.cars?.findIndex((c) => c.id === car.id);

            let updatedCars;
            if (existsIndex !== undefined && existsIndex > -1) {
              updatedCars = d.cars!.map((c, index) =>
                index === existsIndex ? { ...c, bookingDates: car.bookingDates } : c,
              );
            } else {
              updatedCars = [...(d.cars || []), car];
            }
            return { ...d, cars: updatedCars };
          }),
        })),

      removeCar: (destinationId, carId) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? { ...d, cars: d.cars?.filter((c) => c.id !== carId) || [] }
              : d,
          ),
        })), // --- ID-based Sites ---

      addSite: (destinationId, site) =>
        set((state) => ({
          destinations: state.destinations.map((d) => {
            if (d.id !== destinationId) return d;

            const existsIndex = d.sites?.findIndex((s) => s.id === site.id);

            let updatedSites;
            if (existsIndex !== undefined && existsIndex > -1) {
              updatedSites = d.sites!.map((s, index) =>
                index === existsIndex ? { ...s, bookingDates: site.bookingDates } : s,
              );
            } else {
              updatedSites = [...(d.sites || []), site];
            }
            return { ...d, sites: updatedSites };
          }),
        })),

      removeSite: (destinationId, siteId) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? { ...d, sites: d.sites?.filter((s) => s.id !== siteId) || [] }
              : d,
          ),
        })), // --- ID/Variant-based Restaurants ---

      addRestaurant: (destinationId, restaurant) =>
        set((state) => ({
          destinations: state.destinations.map((d) => {
            if (d.id !== destinationId) return d; // Simplified logic: Always add, or use external logic to merge dates // Agar aap chahte hain ki ek hi variant ki multiple dates ko merge karein, toh logic change hoga. // Filhaal, yeh logic assume kar raha hai ki naya restaurant object ya to add hoga, ya agar existing variantId aur date match ho toh update hoga.

            const existsIndex = d.restaurants?.findIndex(
              (r) => r.variant.id === restaurant.variant.id,
            );

            let updatedRestaurants;
            if (existsIndex !== undefined && existsIndex > -1) {
              updatedRestaurants = d.restaurants!.map((r, index) =>
                index === existsIndex
                  ? {
                      ...r,
                      quantity: restaurant.quantity,
                      selectedDate: restaurant.selectedDate,
                    }
                  : r,
              );
            } else {
              updatedRestaurants = [...(d.restaurants || []), restaurant];
            }

            return { ...d, restaurants: updatedRestaurants };
          }),
        })),

      removeRestaurant: (destinationId, variantId) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? {
                  ...d, // Poora item remove kar dega
                  restaurants:
                    d.restaurants?.filter((r) => r.variant.id !== variantId) ||
                    [],
                }
              : d,
          ),
        })), // ---------------------------- // ✅ UPDATED Date-based Deletion Functions (Type Errors Fixed) // ---------------------------- // Date-based Hotels

      removeHotelByDate: (destinationId, hotelId, dateToRemove) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? {
                  ...d,
                  hotels:
                    (d.hotels
                      ?.map((h) => {
                        if (h.id !== hotelId) return h;
                        if (!h.bookingDates) return h;

                        const updatedDates = h.bookingDates.filter(
                          (b) =>
                            dayjs(b).format("YYYY-MM-DD") !==
                            dayjs(dateToRemove).format("YYYY-MM-DD"),
                        ); // Agar koi booking date nahi bachi, null return karo (jo filter out ho jayega)

                        return updatedDates.length > 0
                          ? { ...h, bookingDates: updatedDates }
                          : null;
                      })
                      .filter(Boolean) as Hotel[]) || [], // Type Assertion added
                }
              : d,
          ),
        })), // Date-based Cars

      removeCarByDate: (destinationId, carId, dateToRemove) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? {
                  ...d,
                  cars:
                    (d.cars
                      ?.map((c) => {
                        if (c.id !== carId) return c;
                        if (!c.bookingDates) return c;

                        const updatedDates = c.bookingDates.filter(
                          (b) =>
                            dayjs(b).format("YYYY-MM-DD") !==
                            dayjs(dateToRemove).format("YYYY-MM-DD"),
                        );

                        return updatedDates.length > 0
                          ? { ...c, bookingDates: updatedDates }
                          : null;
                      })
                      .filter(Boolean) as Car[]) || [], // Type Assertion added
                }
              : d,
          ),
        })), // Date-based Sites

      removeSiteByDate: (destinationId, siteId, dateToRemove) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? {
                  ...d,
                  sites:
                    (d.sites
                      ?.map((s) => {
                        if (s.id !== siteId) return s;

                        if (!s.bookingDates) return s;
                        const updatedDates = s.bookingDates.filter(
                          (b) =>
                            dayjs(b.date).format("YYYY-MM-DD") !==
                            dayjs(dateToRemove).format("YYYY-MM-DD"),
                        );

                        return updatedDates.length > 0
                          ? { ...s, bookingDates: updatedDates }
                          : null;
                      })
                      .filter(Boolean) as Site[]) || [], // Type Assertion added
                }
              : d,
          ),
        })), // Date-based Restaurants (based on variantId)

      removeRestaurantByDate: (destinationId, variantId, dateToRemove) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === destinationId
              ? {
                  ...d,
                  restaurants:
                    (d.restaurants
                      ?.map((r) => {
                        if (r.variant.id !== variantId) return r;

                        if (!r.selectedDate) return r;

                        const updatedDates = r.selectedDate.filter(
                          (b) =>
                            dayjs(b).format("YYYY-MM-DD") !==
                            dayjs(dateToRemove).format("YYYY-MM-DD"),
                        );

                        return updatedDates.length > 0
                          ? { ...r, selectedDate: updatedDates }
                          : null;
                      })
                      .filter(Boolean) as RestaurantBooking[]) || [], // Type Assertion added
                }
              : d,
          ),
        })),
      setHasHydrated: (val: boolean) => set({ hasHydrated: val }),
    }),
    {
      name: "destination-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      merge: (persistedState: any, currentState) => {
        if (!persistedState || !persistedState.destinations)
          return currentState;

        const hydratedDestinations = persistedState.destinations.map(
          (dest: any) => ({
            ...dest,
            hotels: dest.hotels?.map((h: any) => ({
              ...h,
              bookingDates: h.bookingDates?.map((d: any) => dayjs(d)),
            })),
            cars: dest.cars?.map((c: any) => ({
              ...c,
              bookingDates: c.bookingDates?.map((d: any) => dayjs(d)),
            })),
            sites: dest.sites?.map((s: any) => ({
              ...s,
              bookingDates: s.bookingDates?.map((b: any) => ({
                ...b,
                date: dayjs(b.date),
              })),
            })),
            restaurants: dest.restaurants?.map((r: any) => ({
              ...r,
              selectedDate: r.selectedDate?.map((d: any) => dayjs(d)),
            })),
          }),
        );

        return {
          ...currentState,
          ...persistedState,
          destinations: hydratedDestinations,
        };
      },
    },
  ),
);

export default useDestinationStore;
