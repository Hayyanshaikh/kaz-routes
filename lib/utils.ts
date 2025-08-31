import { twMerge } from "tailwind-merge";
import { useGetCurrency } from "@/app/hooks/useGetCurrency";

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
