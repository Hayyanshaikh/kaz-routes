import { create } from "zustand";
import usePlanStore from "./planStore";
import { Dayjs } from "dayjs";

export interface Hotel {
  id: string | number;
  room_name: string;
  nights: number;
  price_double: number;
}

export interface Car {
  id: string | number;
  name: string;
  price: number;
}

export interface Site {
  id: string | number;
  name: string;
  date: Dayjs | string;
}

export interface Restaurant {
  id: string | number;
  name: string;
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
  restaurants?: Restaurant[];
}

interface DestinationState {
  destinations: Destination[];

  addNight: (destinationId: string | number, nightsToAdd: number) => void;
  removeNight: (destinationId: string | number, nightsToRemove: number) => void;

  addDestination: (destination: Destination) => void;
  removeDestination: (destinationId: string | number) => void;
  resetDestinations: () => void;

  // Hotels
  addHotel: (destinationId: string | number, hotel: Hotel) => void;
  removeHotel: (
    destinationId: string | number,
    hotelId: string | number
  ) => void;

  // Cars
  addCar: (destinationId: string | number, car: Car) => void;
  removeCar: (destinationId: string | number, carId: string | number) => void;

  // Sites
  addSite: (destinationId: string | number, site: Site) => void;
  removeSite: (destinationId: string | number, siteId: string | number) => void;

  // Restaurants
  addRestaurant: (
    destinationId: string | number,
    restaurant: Restaurant
  ) => void;
  removeRestaurant: (
    destinationId: string | number,
    restaurantId: string | number
  ) => void;
}

const useDestinationStore = create<DestinationState>((set, get) => ({
  destinations: [
    {
      id: "dest1",
      name: "Paris",
      image: "paris.jpg",
      nights: 2,
    },
  ],

  // Destination ke nights update ke liye
  addNight: (destinationId: string | number, nightsToAdd: number) => {
    const { dayCount, usedDays } = usePlanStore.getState();
    const maxAddable = dayCount - usedDays;
    const actualAdd = Math.min(nightsToAdd, maxAddable);

    if (actualAdd <= 0) return; // koi add na ho

    set((state) => ({
      destinations: state.destinations.map((d) => {
        if (d.id === destinationId) {
          usePlanStore.getState().addUsedDays(actualAdd);
          return { ...d, nights: (d.nights || 0) + actualAdd };
        }
        return d;
      }),
    }));
  },

  removeNight: (destinationId: string | number, nightsToRemove: number) => {
    set((state) => {
      return {
        destinations: state.destinations.map((d) => {
          if (d.id === destinationId) {
            usePlanStore.getState().removeUsedDays(nightsToRemove);
            const newNights = Math.max((d.nights || 0) - nightsToRemove, 0);
            console.log("After remove:", newNights); // debug
            return {
              ...d,
              nights: newNights,
            };
          }
          return d;
        }),
      };
    });
  },

  addDestination: (destination) =>
    set((state) => ({
      destinations: [
        ...state.destinations,
        { ...destination, hotels: [], cars: [], sites: [], restaurants: [] },
      ],
    })),

  removeDestination: (id) => {
    const { destinations } = get();
    const destToRemove = destinations.find((d) => d.id === id);

    if (destToRemove) {
      // Is destination ki nights wapis karo
      const nightsToRemove = destToRemove.nights || 0;
      usePlanStore.getState().removeUsedDays(nightsToRemove);
    }

    // Destination store se delete karo
    set({
      destinations: destinations.filter((d) => d.id !== id),
    });
  },

  resetDestinations: () => set({ destinations: [] }),

  addHotel: (destinationId, hotel) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? { ...d, hotels: [...(d.hotels || []), hotel] }
          : d
      ),
    })),

  removeHotel: (destinationId, hotelId) => {
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? { ...d, hotels: d.hotels?.filter((h) => h.id !== hotelId) || [] }
          : d
      ),
    }));
  },

  // ✅ Cars
  addCar: (destinationId, car) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId ? { ...d, cars: [...(d.cars || []), car] } : d
      ),
    })),

  removeCar: (destinationId, carId) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? { ...d, cars: d.cars?.filter((c) => c.id !== carId) || [] }
          : d
      ),
    })),

  // ✅ Sites
  addSite: (destinationId, site) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId ? { ...d, sites: [...(d.sites || []), site] } : d
      ),
    })),

  removeSite: (destinationId, siteId) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? { ...d, sites: d.sites?.filter((s) => s.id !== siteId) || [] }
          : d
      ),
    })),

  // ✅ Restaurants
  addRestaurant: (destinationId, restaurant) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? { ...d, restaurants: [...(d.restaurants || []), restaurant] }
          : d
      ),
    })),

  removeRestaurant: (destinationId, restaurantId) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? {
              ...d,
              restaurants:
                d.restaurants?.filter((r) => r.id !== restaurantId) || [],
            }
          : d
      ),
    })),
}));

export default useDestinationStore;
