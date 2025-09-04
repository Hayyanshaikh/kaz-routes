import dayjs, { Dayjs } from "dayjs";
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
  setPlan: (data: Plan) => void;
  resetPlan: () => void;
}

const usePlanStore = create<PlanState>((set) => ({
  plan: {
    id: "1",
    countries: ["1", "2"],
    planDateRange: [dayjs(), dayjs()],
    planName: "New trip plan",
    adults: 1,
    childrens: 2,
    infants: 0,
  },

  setPlan: (data) => set({ plan: data }),
  resetPlan: () => set({ plan: null }),
}));

export default usePlanStore;
