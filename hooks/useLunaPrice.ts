import axios from "axios";
import { useQuery } from "react-query";

import { CoingeckeLunaUsdResponse } from "../types";

type LunaPriceResult = {
  isSuccess: boolean;
  lunaPriceUsd?: number;
};

export function useLunaPrice(): LunaPriceResult {
  const query = () => {
    return axios.get<CoingeckeLunaUsdResponse>(
      "https://api.coingecko.com/api/v3/simple/price?ids=terra-luna&vs_currencies=usd"
    );
  };

  const { data, isSuccess } = useQuery("lunaprice", query);

  if (isSuccess) {
    return {
      isSuccess,
      lunaPriceUsd: data.data["terra-luna"]["usd"],
    };
  }

  return { isSuccess };
}
