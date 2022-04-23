import axios from "axios";
import { useQuery } from "react-query";

import { CoingeckeLunaUsdResponse } from "../types";

// It's called "prices" (plural) but we only have Luna for now
export type PricesResult = {
  isSuccess: boolean;
  prices?: {
    luna: number;
  };
};

export function usePrices(): PricesResult {
  const query = () => {
    return axios.get<CoingeckeLunaUsdResponse>(
      "https://api.coingecko.com/api/v3/simple/price?ids=terra-luna&vs_currencies=usd"
    );
  };

  const { data, isSuccess } = useQuery("lunaprice", query);

  if (isSuccess) {
    return {
      isSuccess,
      prices: {
        luna: data.data["terra-luna"]["usd"],
      },
    };
  }

  return { isSuccess };
}
