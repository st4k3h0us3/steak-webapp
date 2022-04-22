import { ConnectedWallet } from "@terra-money/wallet-provider";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

import { CONTRACTS, DEV_ACCT } from "../constants";
import { useBalances } from "./useBalances";
import { encodeBase64 } from "../helpers";
import { ContractStoreResponse, NativeBalancesResponse, Cw20BalanceResponse } from "../types";

// https://react-query.tanstack.com/guides/testing
function wrapper({ children }) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

async function queryNativeBalances(address: string, denoms: string[]) {
  const { data } = await axios.get<NativeBalancesResponse>(
    `https://bombay-lcd.terra.dev/cosmos/bank/v1beta1/balances/${address}`
  );

  const balances: { [key: string]: number } = {};
  denoms.forEach((denom) => {
    const coin = data.balances.find((coin) => coin.denom === denom);
    balances[denom] = coin ? Number(coin.amount) : 0;
  });

  return balances;
}

async function queryCw20Balances(address: string, token: string) {
  const queryMsg = encodeBase64({
    balance: { address },
  });

  const { data } = await axios.get<ContractStoreResponse<Cw20BalanceResponse>>(
    `https://bombay-lcd.terra.dev/terra/wasm/v1beta1/contracts/${token}/store?query_msg=${queryMsg}`
  );

  return Number(data.query_result.balance);
}

test("should return correct balances for wallet", async () => {
  const mockWallet = {
    network: {
      name: "testnet",
    },
    terraAddress: DEV_ACCT,
  } as ConnectedWallet;

  const { result, waitFor } = renderHook(() => useBalances(mockWallet), { wrapper });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.balances).toStrictEqual({
    ...(await queryNativeBalances(DEV_ACCT, ["uusd", "uluna"])),
    usteak: await queryCw20Balances(DEV_ACCT, CONTRACTS["testnet"]["steak"]),
  });
});

test("should return balances as undefined is wallet is unknown", async () => {
  const { result, waitFor } = renderHook(() => useBalances(undefined), { wrapper });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.balances).toBeUndefined();
});
