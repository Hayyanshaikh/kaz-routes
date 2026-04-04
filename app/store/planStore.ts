import dayjs, { Dayjs } from "dayjs";
import { getDaysCount } from "@/lib/utils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  hasHydrated: boolean;
  setPlan: (data: Plan) => void;
  resetPlan: () => void;
  addUsedDays: (days: number) => void;
  removeUsedDays: (days: number) => void;
  setHasHydrated: (state: boolean) => void;
}

const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      plan: null,
      dayCount: 0,
      usedDays: 0,
      hasHydrated: false,

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

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "plan-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      merge: (persistedState: any, currentState) => {
        if (!persistedState) return currentState;
        // Convert planDateRange strings back to Dayjs
        if (persistedState.plan && persistedState.plan.planDateRange) {
          persistedState.plan.planDateRange =
            persistedState.plan.planDateRange.map((d: string) => dayjs(d));
        }
        return {
          ...currentState,
          ...persistedState,
        };
      },
    },
  ),
);

export default usePlanStore;
