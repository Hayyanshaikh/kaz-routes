import { useGetCurrency } from "@/app/hooks/useGetCurrency";
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

export const formatCurrency = (amount: number | string): string => {
  const { symbol } = useGetCurrency();

  // string ho aur commas ho to remove kar do
  const numericAmount =
    typeof amount === "string" ? Number(amount.replace(/,/g, "")) : amount;

  return `${symbol}${numericAmount.toLocaleString("en-PK", {
    minimumFractionDigits: 2,
  })}`;
};
