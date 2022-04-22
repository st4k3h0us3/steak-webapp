import { ConnectedWallet } from "@terra-money/wallet-provider";
import axios from "axios";
import { useQuery } from "react-query";

import { useConstants } from "./useConstants";
import { encodeBase64, decodeBase64 } from "../helpers";
import { ContractStoreResponse, MultiqueryResponse, NativeBalanceResponse, Cw20BalanceResponse } from "../types";

type Balances = {
  isSuccess: boolean;
  balances?: {
    [key: string]: number;
  };
};

export function useBalances(wallet?: ConnectedWallet): Balances {
  const { grpcGatewayUrl, contracts } = useConstants(wallet?.network);

  const queryMsg = encodeBase64([
    {
      bank: {
        balance: {
          address: wallet?.terraAddress,
          denom: "uusd",
        },
      },
    },
    {
      bank: {
        balance: {
          address: wallet?.terraAddress,
          denom: "uluna",
        },
      },
    },
    {
      wasm: {
        smart: {
          contract_addr: contracts?.steak,
          msg: encodeBase64({
            balance: {
              address: wallet?.terraAddress,
            },
          }),
        },
      },
    },
  ]);

  const query = () => {
    return axios.get<ContractStoreResponse<MultiqueryResponse>>(
      `${grpcGatewayUrl}/terra/wasm/v1beta1/contracts/${contracts?.multiquery}/store?query_msg=${queryMsg}`
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

    const { amount: uusd } = decodeBase64<NativeBalanceResponse>(items[0]!.data);
    const { amount: uluna } = decodeBase64<NativeBalanceResponse>(items[1]!.data);
    const { balance: usteak } = decodeBase64<Cw20BalanceResponse>(items[2]!.data);

    return {
      isSuccess,
      balances: {
        uluna: Number(uluna.amount),
        uusd: Number(uusd.amount),
        usteak: Number(usteak),
      },
    };
  }

  // If `wallet` is specified, but the query is not completed yet, we keep waiting
  return { isSuccess };
}
