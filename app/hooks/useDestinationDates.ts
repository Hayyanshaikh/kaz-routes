import { useMemo } from "react";
import usePlanStore from "../store/planStore";
import useDestinationStore, { Destination } from "../store/destinationStore";
import { getDestinationDates } from "@/lib/utils";

export const useDestinationDates = (
  destination: Destination | null | undefined,
) => {
  const { plan } = usePlanStore();
  const { destinations } = useDestinationStore();

  return useMemo(() => {
    if (!destination || !plan || !destinations) {
      return { startDate: null, endDate: null };
    }
    return getDestinationDates(destination, plan, destinations);
  }, [destination, plan, destinations]);
};
