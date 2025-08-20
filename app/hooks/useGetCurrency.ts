// get currency from localstorage
import { useCurrencySettings } from "./api";

export const useGetCurrency = () => {
  const { data: currency, isLoading } = useCurrencySettings();

  return {
    currency: currency?.name,
    symbol: currency?.symbol,
    isLoading,
  };
};
