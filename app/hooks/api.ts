import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

// ✅ GET /packages → Find All Packages
export const useControllerGetFindAllPackages = (options?: {
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["ControllerGetFindAllPackages"],
    queryFn: async () => {
      const res = await axios.get("/packages");
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /packages/:id → Find One Package
export const useControllerGetFindOnePackage = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOnePackage", id],
    queryFn: async () => {
      const res = await axios.get(`/packages/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

// ✅ GET /countries → Find All Countries
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

// ✅ GET /countries/:id → Find One Country
export const useControllerGetFindOneCountry = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneCountry", id],
    queryFn: async () => {
      const res = await axios.get(`/countries/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

// ✅ GET /cars → Find All Cars
export const useControllerGetFindAllCars = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["ControllerGetFindAllCars"],
    queryFn: async () => {
      const res = await axios.get("/cars");
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /cars/:id → Find One Car
export const useControllerGetFindOneCar = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneCar", id],
    queryFn: async () => {
      const res = await axios.get(`/cars/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

// ✅ GET /restaurants → Find All Restaurants
export const useControllerGetFindAllRestaurants = (options?: {
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["ControllerGetFindAllRestaurants"],
    queryFn: async () => {
      const res = await axios.get("/restaurants");
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /restaurants/:id → Find One Restaurant
export const useControllerGetFindOneRestaurant = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneRestaurant", id],
    queryFn: async () => {
      const res = await axios.get(`/restaurants/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

// ✅ GET /hotels → Find All Hotels
export const useControllerGetFindAllHotels = (options?: {
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["ControllerGetFindAllHotels"],
    queryFn: async () => {
      const res = await axios.get("/hotels");
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /hotels/:id → Find One Hotel
export const useControllerGetFindOneHotel = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneHotel", id],
    queryFn: async () => {
      const res = await axios.get(`/hotels/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

// ✅ GET /sites → Find All Sites
export const useControllerGetFindAllSites = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["ControllerGetFindAllSites"],
    queryFn: async () => {
      const res = await axios.get("/sites");
      return res.data;
    },
    enabled: options?.enabled ?? true,
  });

// ✅ GET /sites/:id → Find One Site
export const useControllerGetFindOneSite = (id: string | number) =>
  useQuery({
    queryKey: ["ControllerGetFindOneSite", id],
    queryFn: async () => {
      const res = await axios.get(`/sites/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
