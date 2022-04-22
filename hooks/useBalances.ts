import { ConnectedWallet } from "@terra-money/wallet-provider";
import axios from "axios";
import { useQuery } from "react-query";

import { useConstants } from "./useConstants";
import { encodeBase64, decodeBase64 } from "../helpers";
import { ContractStoreResponse, MultiqueryResponse, NativeBalanceResponse } from "../types";

type Balances = {
  isSuccess: boolean;
  balances?: {
    [key: string]: number;
  };
};

export function useBalances(wallet?: ConnectedWallet): Balances {
  const { grpcGatewayUrl, multiquery } = useConstants(wallet?.network);

  const queryMsg = encodeBase64([
    {
      bank: {
        balance: {
          address: wallet?.terraAddress,
          denom: "uluna",
        },
      },
    },
    {
      bank: {
        balance: {
          address: wallet?.terraAddress,
          denom: "uusd",
        },
      },
    },
  ]);

  const query = () => {
    return axios.get<ContractStoreResponse<MultiqueryResponse>>(
      `${grpcGatewayUrl}/terra/wasm/v1beta1/contracts/${multiquery}/store?query_msg=${queryMsg}`
    );
  };

  // NOTE: Skip the query if `wallet` is undefined
  const { data, isSuccess } = useQuery("balances", query, { enabled: !!wallet });

  // If `wallet` is not specified, we return status as success and balances and undefined
  if (!wallet) {
    return { isSuccess: true };
  }

  // If `wallet` is specified, we wait for the query to succeeed, then parse the result and return
  if (isSuccess) {
    const items = data.data.query_result;

    const { amount: uluna } = decodeBase64<NativeBalanceResponse>(items[0]!.data);
    const { amount: uusd } = decodeBase64<NativeBalanceResponse>(items[1]!.data);

    return {
      isSuccess,
      balances: {
        uluna: Number(uluna.amount),
        uusd: Number(uusd.amount),
      },
    };
  }

  // If `wallet` is specified, but the query is not completed yet, we keep waiting
  return { isSuccess };
}
