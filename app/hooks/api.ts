import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import {
  CreatePackagePayload,
  PackageItemPayload,
  RestaurantBookingPayload,
  SiteBookingPayload,
} from "../types/CommonType";

// 🔁 Shared options type for filtering & enabling
type QueryOptions = {
  enabled?: boolean;
  params?: Record<string, any>;
};

// ✅ POST /token
export const usePostToken = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await axios.post("/token", payload);
      return res.data; // usually token, refresh token, user info, etc.
    },
  });
};

/* ------------------- 📦 PACKAGES ------------------- */

// ✅ GET /packages
export const useControllerGetFindAllPackages = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllPackages", options?.params],
    queryFn: async () => {
      const res = await axios.get("/packages", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /packages/:id
export const useControllerGetFindOnePackage = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOnePackage", id],
    queryFn: async () => {
      const res = await axios.get(`/packages/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

/* ------------------- 🚗 CARS ------------------- */

// ✅ GET /cars
export const useControllerGetFindAllCars = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllCars", options?.params],
    queryFn: async () => {
      const res = await axios.get("/cars", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /cars/:id
export const useControllerGetFindOneCar = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneCar", id],
    queryFn: async () => {
      const res = await axios.get(`/cars/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

/* ------------------- 🍽️ RESTAURANTS ------------------- */

// ✅ GET /restaurants
export const useControllerGetFindAllRestaurants = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllRestaurants", options?.params],
    queryFn: async () => {
      const res = await axios.get("/restaurants", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /restaurants/:id
export const useControllerGetFindOneRestaurant = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneRestaurant", id],
    queryFn: async () => {
      const res = await axios.get(`/restaurants/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

/* ------------------- 🏨 HOTELS ------------------- */

// ✅ GET /hotels
export const useControllerGetFindAllHotels = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllHotels", options?.params],
    queryFn: async () => {
      const res = await axios.get("/hotels", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /hotels/:id
export const useControllerGetFindOneHotel = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneHotel", id],
    queryFn: async () => {
      const res = await axios.get(`/hotels/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

/* ------------------- 🏞️ SITES ------------------- */

// ✅ GET /sites
export const useControllerGetFindAllSites = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllSites", options?.params],
    queryFn: async () => {
      const res = await axios.get("/sites", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /sites/:id
export const useControllerGetFindOneSite = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneSite", id],
    queryFn: async () => {
      const res = await axios.get(`/sites/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

/* ------------------- 🌍 COUNTRIES ------------------- */

// ✅ GET /countries
export const useControllerGetFindAllCountries = (options?: {
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["ControllerGetFindAllCountries"],
    queryFn: async () => {
      const res = await axios.get("/countries");
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /countries/:id
export const useControllerGetFindOneCountry = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneCountry", id],
    queryFn: async () => {
      const res = await axios.get(`/countries/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

/* ------------------- 🏙️ CITIES ------------------- */

// ✅ GET /cities
export const useControllerGetFindAllCities = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllCities", options?.params],
    queryFn: async () => {
      const res = await axios.get("/cities", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /cities/:id
export const useControllerGetFindOneCity = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneCity", id],
    queryFn: async () => {
      const res = await axios.get(`/cities/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

/* ------------------- ✅ POST BOOKING ------------------- */

// ✅ POST /car-bookings
export const useControllerPostCreateCarBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/car-bookings", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ControllerGetFindAllCarBookings"],
      });
    },
  });
};

/* ------------------- 🏨 HOTEL BOOKINGS ------------------- */

// ✅ POST /hotel-bookings
export const useControllerPostCreateHotelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/hotel-bookings", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ControllerGetFindAllHotelBookings"],
      });
    },
  });
};

// ✅ POST /api/restaurant-bookings
export const useControllerPostCreateRestaurantBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RestaurantBookingPayload) => {
      const res = await axios.post("/restaurant-bookings", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ControllerGetFindAllRestaurantBookings"],
      });
    },
  });
};

/* ------------------- 🏞️ SITE BOOKINGS ------------------- */

// ✅ POST /api/site-bookings
export const useControllerPostCreateSiteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SiteBookingPayload) => {
      const res = await axios.post("/site-bookings", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ControllerGetFindAllSiteBookings"],
      });
    },
  });
};

// ✅ POST /api/agent-packages

export const useControllerPostCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePackagePayload) => {
      const res = await axios.post("/agent-packages", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ControllerGetFindAllPackages"],
      });
    },
  });
};

// ✅ POST /agent-package-items
export const useControllerCreatePackageItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: PackageItemPayload) => {
      const res = await axios.post("/agent-package-items", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ControllerGetFindAllAgentPackageItems"],
      });
    },
  });
};

// ✅ GET /travel-guides
export const useControllerGetFindAllTravelGuides = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllTravelGuides", options?.params],
    queryFn: async () => {
      const res = await axios.get("/travel-guides", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /page-content
export const useControllerGetFindAllPageContents = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["ControllerGetFindAllPageContents", options?.params],
    queryFn: async () => {
      const res = await axios.get("/page-content", {
        params: options?.params,
      });
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /api/agent-package-items/find

export const useControllerGetFindAllAgentPackageItems = (
  params: {
    package_id: number;
    item_date: string;
  },
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["ControllerGetAgentPackageItemsByDate", params],
    queryFn: async () => {
      const res = await axios.get("/package-items/find", {
        params,
      });
      return res.data;
    },
    enabled: enabled && !!params?.package_id && !!params?.item_date,
  });

export const useControllerGetAgentPackageItemsByPackageId = (
  packageId: number,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["ControllerGetAgentPackageItemsByPackageId", packageId],
    queryFn: async () => {
      const res = await axios.get("/agent-package-items", {
        params: {
          package_id: packageId,
        },
      });
      return res.data;
    },
    enabled: enabled && !!packageId,
  });

export const useCreateItinerary = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await axios.post("/itinerary", payload);
      return response.data;
    },
  });
};

// ✅ POST /itineraries
export const useControllerPostCreateItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post("/itineraries", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ControllerGetFindAllItineraries"],
      });
    },
  });
};

// ✅ GET /package-itineraries?package_id=14
export const useControllerGetFindPackageItinerariesByPackageId = (
  packageId: number,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["ControllerGetFindPackageItinerariesByPackageId", packageId],
    queryFn: async () => {
      const res = await axios.get("/package-itineraries", {
        params: { package_id: packageId },
      });
      return res.data;
    },
    enabled: enabled && !!packageId,
  });

// ✅ GET currency from /settings
export const useCurrencySettings = (options?: QueryOptions) =>
  useQuery({
    queryKey: ["CurrencySettings"],
    queryFn: async () => {
      const res = await axios.get("/settings");
      // Filter currency from response
      const currencyItem = res.data.data.find(
        (item: any) => item.key === "currency"
      );
      return currencyItem?.value[0] ?? {};
    },
    enabled: options?.enabled ?? true,
  });
