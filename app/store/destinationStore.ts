import { create } from "zustand";
import { Dayjs } from "dayjs";
import usePlanStore from "./planStore";

// Basic types
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

export interface RestaurantVariant {
  id: string | number;
  size: string;
  price: number;
}

export interface Dish {
  id: string | number;
  variants: RestaurantVariant[];
}

export interface Restaurant {
  id: string | number;
  name: string;
  dishes: Dish[];
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

  addHotel: (destinationId: string | number, hotel: Hotel) => void;
  removeHotel: (
    destinationId: string | number,
    hotelId: string | number
  ) => void;

  addCar: (destinationId: string | number, car: Car) => void;
  removeCar: (destinationId: string | number, carId: string | number) => void;

  addSite: (destinationId: string | number, site: Site) => void;
  removeSite: (destinationId: string | number, siteId: string | number) => void;

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
  destinations: [],

  addNight: (destinationId, nightsToAdd) => {
    const { dayCount, usedDays } = usePlanStore.getState();
    const maxAddable = dayCount - usedDays;
    const actualAdd = Math.min(nightsToAdd, maxAddable);
    if (actualAdd <= 0) return;

    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? { ...d, nights: (d.nights || 0) + actualAdd }
          : d
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
        { ...destination, hotels: [], cars: [], sites: [], restaurants: [] },
      ],
    })),

  removeDestination: (destinationId) => {
    const destToRemove = get().destinations.find((d) => d.id === destinationId);
    if (destToRemove && destToRemove.nights) {
      usePlanStore.getState().removeUsedDays(destToRemove.nights);
    }
    set({
      destinations: get().destinations.filter((d) => d.id !== destinationId),
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

  removeHotel: (destinationId, hotelId) =>
    set((state) => ({
      destinations: state.destinations.map((d) =>
        d.id === destinationId
          ? { ...d, hotels: d.hotels?.filter((h) => h.id !== hotelId) || [] }
          : d
      ),
    })),

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

  addRestaurant: (destinationId, restaurant) =>
    set((state) => ({
      destinations: state.destinations.map((d) => {
        if (d.id !== destinationId) return d;

        const exists = d.restaurants?.find(
          (r) => r.variant.id === restaurant.variant.id
        );

        let updatedRestaurants;
        if (exists) {
          updatedRestaurants = d.restaurants.map((r) =>
            r.variant.id === restaurant.variant.id
              ? { ...r, quantity: restaurant.quantity }
              : r
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
              ...d,
              restaurants:
                d.restaurants?.filter((r) => r.variant.id !== variantId) || [],
            }
          : d
      ),
    })),
}));

export default useDestinationStore;
