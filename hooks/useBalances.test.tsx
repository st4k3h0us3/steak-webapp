import { ConnectedWallet } from "@terra-money/wallet-provider";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

import { useBalances } from "./useBalances";
import { NativeBalancesResponse } from "../types";

// https://react-query.tanstack.com/guides/testing
function wrapper({ children }) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

async function queryNativeBalances(address: string, denoms: string[]) {
  const { data } = await axios.get<NativeBalancesResponse>(
    `https://lcd.terra.dev/cosmos/bank/v1beta1/balances/${address}`
  );

  const balances: { [key: string]: number } = {};
  denoms.forEach((denom) => {
    const coin = data.balances.find((coin) => coin.denom === denom);
    balances[denom] = coin ? Number(coin.amount) : 0;
  });

  return balances;
}

test("should return correct balances for wallet", async () => {
  const mockAddress = "terra1z926ax906k0ycsuckele6x5hh66e2m4m5udwep";
  const mockWallet = {
    network: {
      name: "mainnet",
    },
    terraAddress: mockAddress,
  } as ConnectedWallet;

  const { result, waitFor } = renderHook(() => useBalances(mockWallet), { wrapper });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.balances).toStrictEqual({
    ...(await queryNativeBalances(mockAddress, ["uluna", "uusd"])),
  });
});

test("should return balances as undefined is wallet is unknown", async () => {
  const { result, waitFor } = renderHook(() => useBalances(undefined), { wrapper });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.balances).toBeUndefined();
});
