import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFiltersToArray = (filterObj: Record<string, any>) => {
  return Object.entries(filterObj).map(([key, valueArray]) => {
    const rawValue = valueArray?.[0]?.value;
    let parsedOptions: string[] = [];

    try {
      parsedOptions = JSON.parse(rawValue);
    } catch (error) {
      parsedOptions = [];
    }

    return {
      id: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      type: "checkbox",
      options: parsedOptions.map((opt) => ({
        label: opt,
        value: opt,
      })),
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
