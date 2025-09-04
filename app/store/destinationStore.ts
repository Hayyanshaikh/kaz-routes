import { create } from "zustand";

export interface Hotel {
  id: string | number;
  room_name: string;
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
}

export interface Restaurant {
  id: string | number;
  name: string;
}

export interface Destination {
  id: string | number;
  name: string;
  image: string;
  hotels?: Hotel[];
  cars?: Car[];
  sites?: Site[];
  restaurants?: Restaurant[];
}

interface DestinationState {
  destinations: Destination[];

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

const useDestinationStore = create<DestinationState>((set) => ({
  destinations: [],

  addDestination: (destination) =>
    set((state) => ({
      destinations: [
        ...state.destinations,
        { ...destination, hotels: [], cars: [], sites: [], restaurants: [] },
      ],
    })),

  removeDestination: (destinationId) =>
    set((state) => ({
      destinations: state.destinations.filter((d) => d.id !== destinationId),
    })),

  resetDestinations: () => set({ destinations: [] }),

  // ✅ Hotels
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
