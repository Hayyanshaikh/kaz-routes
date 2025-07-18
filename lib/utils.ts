import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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

export const formatCurrencyPKR = (
  amount: number,
  options: Intl.NumberFormatOptions = {}
): string => {
  return Number(amount).toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 2,
    ...options,
  });
};
