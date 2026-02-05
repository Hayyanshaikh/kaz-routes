import { twMerge } from "tailwind-merge";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Destination } from "@/app/store/destinationStore";

dayjs.extend(isSameOrBefore);

// Combine class names
export function cn(...inputs: string[]) {
  return twMerge(...inputs);
}

// Convert filters object to array
export const convertFiltersToArray = (filterObj: Record<string, any>) => {
  if (!filterObj) return [];
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

// Format currency (Utility version - MUST NOT call hooks)
export const formatCurrency = (
  amount: number | string,
  symbol: string = "PKR",
): string => {
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

export function getDaysCount(
  start: Dayjs,
  end: Dayjs,
  inclusive = true,
): number {
  if (!start || !end) return 0;
  const days = end.diff(start, "day");
  // Typically inclusive of both ends means +1, kaz-routes seems to use +2 for some logic?
  // Let's keep existing logic if it was working.
  return inclusive ? days + 1 : days;
}

export function getDateRange(start?: Dayjs | null, end?: Dayjs | null) {
  if (!start || !end) return [];
  if (!start || !end) return [];
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

// Pure function for destination dates calculation
export const getDestinationDates = (
  destination: Destination,
  plan: any,
  destinations: Destination[],
): { startDate: Dayjs; endDate: Dayjs } => {
  if (!plan || !plan.planDateRange || !plan.planDateRange[0]) {
    const d = dayjs();
    return { startDate: d, endDate: d };
  }

  const nights = destination?.nights || 0;
  let startDate = plan.planDateRange[0];

  // Cumulative nights from previous destinations
  for (const d of destinations) {
    if (d.id === destination?.id) break;
    startDate = dayjs(startDate).add(d.nights || 0, "day");
  }

  const endDate = dayjs(startDate).add(nights > 0 ? nights - 1 : 0, "day");

  return {
    startDate,
    endDate,
  };
};
