import { useGetCurrency } from "./useGetCurrency";

export const useFormatCurrency = () => {
  const { symbol } = useGetCurrency();

  const format = (amount: number | string) => {
    const numericAmount =
      typeof amount === "string" ? Number(amount.replace(/,/g, "")) : amount;

    return `${symbol} ${numericAmount.toLocaleString("en-PK", {
      minimumFractionDigits: 2,
    })}`;
  };

  return { format };
};
