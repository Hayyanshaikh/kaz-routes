import { create } from "zustand";
import { Package } from "../types/CommonType";

// 👇 Store ke liye interface
interface PackageStore {
  packageData: Package | null;
  packageItemData: any | null;

  setPackageData: (data: Package) => void;
  setPackageItemData: (data: any) => void;
}

// 👇 Zustand Store create
const usePackageData = create<PackageStore>((set) => ({
  packageData: null,
  packageItemData: null,

  setPackageData: (data) => set({ packageData: data }),
  setPackageItemData: (data) => set({ packageItemData: data }),
}));

export default usePackageData;
