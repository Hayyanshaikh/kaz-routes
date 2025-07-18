import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

// 🔁 Shared options type for filtering & enabling
type QueryOptions = {
  enabled?: boolean;
  params?: Record<string, any>;
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
