import { ConnectedWallet } from "@terra-money/wallet-provider";
import create from "zustand";

import { BalancesResult, HubQueryResult, PricesResult } from "../hooks";
import { StateResponse } from "../types";

export type State = {
  wallet?: {
    network: string;
    accAddress: string;
  };
  balances?: {
    uusd: number;
    uluna: number;
    usteak: number;
  };
  state?: {
    totalUluna: number;
    totalUsteak: number;
    exchangeRate: number;
  };
  prices?: {
    luna: number;
  };
  setWallet: (wallet?: ConnectedWallet) => void;
  setPrices: (result: PricesResult) => void;
  setState: (result: HubQueryResult) => void;
  setBalances: (result: BalancesResult) => void;
};

export const useStore = create<State>((set) => ({
  wallet: undefined,
  balances: undefined,
  state: undefined,
  prices: undefined,
  setWallet(wallet?: ConnectedWallet) {
    set({
      wallet: parseWallet(wallet),
    });
  },
  setPrices(result: PricesResult) {
    if (result.isSuccess) {
      set({
        prices: result.prices,
      });
    }
  },
  setState(result: HubQueryResult) {
    if (result.isSuccess) {
      set({
        state: parseState(result.responses),
      });
    }
  },
  setBalances(result: BalancesResult) {
    if (result.isSuccess) {
      set({
        balances: result.balances,
      });
    }
  },
}));

function parseWallet(wallet?: ConnectedWallet) {
  if (wallet) {
    return {
      network: wallet.network.name,
      accAddress: wallet.terraAddress,
    };
  }
  return undefined;
}

function parseState(responses?: object[]) {
  if (responses) {
    const response = responses[0] as StateResponse;
    return {
      totalUluna: Number(response["total_uluna"]),
      totalUsteak: Number(response["total_usteak"]),
      exchangeRate: Number(response["exchange_rate"]),
    };
  }
  return undefined;
}
