import { twMerge } from "tailwind-merge";
import { useGetCurrency } from "@/app/hooks/useGetCurrency";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import useDestinationStore, { Destination } from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";

dayjs.extend(isSameOrBefore);
// Combine class names
export function cn(...inputs: string[]) {
  return twMerge(...inputs);
}

// Convert filters object to array
export const convertFiltersToArray = (filterObj: Record<string, any>) => {
  return Object.entries(filterObj).map(([key, valueArray]) => {
    const optionsList = valueArray?.[0]?.value || [];

    return {
      id: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      type: "checkbox",
      options: optionsList.map((opt: string) => opt),
    };
  });
};

// Format currency
export const formatCurrency = (amount: number | string): string => {
  const { symbol } = useGetCurrency();

  const numericAmount =
    typeof amount === "string" ? Number(amount.replace(/,/g, "")) : amount;

  return `${symbol} ${numericAmount.toLocaleString("en-PK", {
    minimumFractionDigits: 2,
  })}`;
};

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getDaysCount = (
  start: Dayjs,
  end: Dayjs,
  inclusive = false
): number => {
  if (!start || !end) return 0;

  const days = end.diff(start, "day");
  return inclusive ? days + 1 : days;
};

export function getDateRange(start?: Dayjs, end?: Dayjs) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const dates: string[] = [];

  let current = startDate;
  while (current.isSameOrBefore(endDate, "day")) {
    dates.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  return dates;
}

export const getDestinationDates = (
  destination: Destination
): { startDate: Dayjs; endDate: Dayjs } | any => {
  const { plan } = usePlanStore();
  const { destinations } = useDestinationStore();
  if (!plan || !plan.planDateRange[0]) return;

  const nights = destination?.nights || 0;

  let startDate = plan.planDateRange[0];

  // Pehle wale destinations ke nights add karo
  for (const d of destinations) {
    if (d.id === destination?.id) break;
    startDate = dayjs(startDate).add(d.nights || 0, "day");
  }

  const endDate = dayjs(startDate).add(nights - 1, "day");

  return {
    startDate,
    endDate,
  };
};
