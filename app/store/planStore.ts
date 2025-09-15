import dayjs, { Dayjs } from "dayjs";
import { getDaysCount } from "@/lib/utils";
import { create } from "zustand";

interface Plan {
  id: string;
  planName: string;
  countries: string[];
  planDateRange: Dayjs[];
  adults: number;
  childrens: number;
  infants: number;
}

interface PlanState {
  plan: Plan | null;
  dayCount: number; // total days from date range
  usedDays: number; // days already booked
  setPlan: (data: Plan) => void;
  resetPlan: () => void;
  addUsedDays: (days: number) => void;
  removeUsedDays: (days: number) => void;
}

const usePlanStore = create<PlanState>((set, get) => ({
  plan: null,
  dayCount: 0,
  usedDays: 0,

  setPlan: (data) =>
    set({
      plan: data,
      dayCount: getDaysCount(data.planDateRange[0], data.planDateRange[1]),
      usedDays: 0,
    }),

  resetPlan: () => set({ plan: null, dayCount: 0, usedDays: 0 }),

  addUsedDays: (days) => {
    const { usedDays, dayCount } = get();
    if (usedDays + days <= dayCount) {
      set({ usedDays: usedDays + days });
    }
  },

  removeUsedDays: (days) => {
    const { usedDays } = get();
    set({ usedDays: Math.max(0, usedDays - days) });
  },
}));

export default usePlanStore;
