import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";
import { getDaysCount } from "@/lib/utils";

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
  plan: {
    id: "1",
    countries: ["1"],
    planDateRange: [
      dayjs("2025-09-05", "YYYY-MM-DD"),
      dayjs("2025-09-20", "YYYY-MM-DD"),
    ],
    planName: "New trip plan",
    adults: 1,
    childrens: 2,
    infants: 0,
  },
  dayCount: getDaysCount(dayjs("2025-09-5"), dayjs("2025-09-20")),
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
