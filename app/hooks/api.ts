import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

// GET /packages → find all
export const useControllerGetFindAllPackages = () => {
  return useQuery({
    queryKey: ["ControllerGetFindAllPackages"],
    queryFn: async () => {
      const res = await axios.get("/packages");
      return res.data;
    },
  });
};

export const useControllerGetFindOnePackage = (id: string | number) => {
  return useQuery({
    queryKey: ["ControllerGetFindOnePackage", id],
    queryFn: async () => {
      const res = await axios.get(`/packages/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useControllerGetFindAllCountries = () => {
  return useQuery({
    queryKey: ["ControllerGetFindAllCountries"],
    queryFn: async () => {
      const res = await axios.get("/countries");
      return res.data;
    },
  });
};

// GET /cars → find all
export const useControllerGetFindAllCars = () => {
  return useQuery({
    queryKey: ["ControllerGetFindAllCars"],
    queryFn: async () => {
      const res = await axios.get("/cars");
      return res.data;
    },
  });
};
