import { ConnectedWallet } from "@terra-money/wallet-provider";
import axios from "axios";
import create from "zustand";

import { GRPC_GATEWAY_URL, CONTRACTS } from "../constants";
import { encodeBase64, decodeBase64 } from "../helpers";
import {
  ContractStoreResponse,
  Cw20BalanceResponse,
  ExchangeRateResponse,
  MultiqueryResponse,
  NativeBalanceResponse,
  Batch,
  PendingBatch,
  StateResponse,
  ConfigResponse,
  UnbondRequestsByUserResponse,
} from "../types";

export type UnbondRequestParsed = {
  status: "pending" | "unbonding" | "completed";
  amount: number; // means `usteak` amount if the batch has not been submitted, or `uluna` if already submitted
  startTime: Date;
  finishTime: Date;
};

export type State = {
  priceLunaUsd?: number;
  balances?: {
    uusd: number;
    uluna: number;
    usteak: number;
  };
  hubState?: {
    totalLunaLocked: number;
    exchangeRate: number;
  };
  pendingBatch?: {
    id: number;
    startTime: Date;
  };
  unbondRequests?: UnbondRequestParsed[];

  update: (wallet?: ConnectedWallet) => Promise<void>;
};

export const useStore = create<State>((set) => ({
  priceLunaUsd: undefined,
  balances: undefined,
  wallet: undefined,
  state: undefined,
  pendingBatch: undefined,
  unbondRequests: undefined,

  update: async (wallet?: ConnectedWallet) => {
    if (!wallet) {
      return set({});
    }

    if (wallet.network.name !== "mainnet" && wallet.network.name !== "testnet") {
      throw new Error(`Invalid network ${wallet.network.name}; must be mainnet|testnet`);
    }

    const network = wallet.network.name as "mainnet" | "testnet";

    const grpcGatewayUrl = GRPC_GATEWAY_URL[network];
    const { multiquery, steakHub, steakToken } = CONTRACTS[network];

    const accAddress = wallet.terraAddress;
    const queries1 = encodeBase64([
      {
        custom: {
          route: "oracle",
          query_data: {
            exchange_rates: {
              base_denom: "uluna",
              quote_denoms: ["uusd"],
            },
          },
        },
      },
      {
        bank: {
          balance: {
            address: accAddress,
            denom: "uusd",
          },
        },
      },
      {
        bank: {
          balance: {
            address: accAddress,
            denom: "uluna",
          },
        },
      },
      {
        wasm: {
          smart: {
            contract_addr: steakToken,
            msg: encodeBase64({
              balance: {
                address: accAddress,
              },
            }),
          },
        },
      },
      {
        wasm: {
          smart: {
            contract_addr: steakHub,
            msg: encodeBase64({
              state: {},
            }),
          },
        },
      },
      {
        wasm: {
          smart: {
            contract_addr: steakHub,
            msg: encodeBase64({
              config: {},
            }),
          },
        },
      },
      {
        wasm: {
          smart: {
            contract_addr: steakHub,
            msg: encodeBase64({
              pending_batch: {},
            }),
          },
        },
      },
      {
        wasm: {
          smart: {
            contract_addr: steakHub,
            msg: encodeBase64({
              unbond_requests_by_user: {
                user: accAddress,
                limit: 30, // we assume the user doesn't have more than 30 outstanding unbonding requests
              },
            }),
          },
        },
      },
    ]);

    const axiosResult1 = await axios.get<ContractStoreResponse<MultiqueryResponse>>(
      `${grpcGatewayUrl}/terra/wasm/v1beta1/contracts/${multiquery}/store?query_msg=${queries1}`
    );

    const [
      lunaPriceResult,
      uusdBalanceResult,
      ulunaBalanceResult,
      usteakBalanceResult,
      hubStateResult,
      hubConfigResult,
      pendingBatchResult,
      unbondRequestsByUserResult,
    ] = axiosResult1["data"]["query_result"];

    if (!lunaPriceResult || !lunaPriceResult.success) {
      throw new Error("Failed to query luna price");
    }
    if (!uusdBalanceResult || !uusdBalanceResult.success) {
      throw new Error("Failed to query uusd balance");
    }
    if (!ulunaBalanceResult || !ulunaBalanceResult.success) {
      throw new Error("Failed to query uluna balance");
    }
    if (!usteakBalanceResult || !usteakBalanceResult.success) {
      throw new Error("Failed to query usteak balance");
    }
    if (!hubStateResult || !hubStateResult.success) {
      throw new Error("Failed to query hub state");
    }
    if (!hubConfigResult || !hubConfigResult.success) {
      throw new Error("Failed to query hub config");
    }
    if (!pendingBatchResult || !pendingBatchResult.success) {
      throw new Error("Failed to query pending batch");
    }
    if (!unbondRequestsByUserResult || !unbondRequestsByUserResult.success) {
      throw new Error(`Failed to query unbonding requests by user ${wallet.terraAddress}`);
    }

    const lunaPriceResponse: ExchangeRateResponse = decodeBase64(lunaPriceResult.data);
    const uusdBalanceResponse: NativeBalanceResponse = decodeBase64(uusdBalanceResult.data);
    const ulunaBalanceResponse: NativeBalanceResponse = decodeBase64(ulunaBalanceResult.data);
    const usteakBalanceResponse: Cw20BalanceResponse = decodeBase64(usteakBalanceResult.data);
    const hubStateResponse: StateResponse = decodeBase64(hubStateResult.data);
    const config: ConfigResponse = decodeBase64(hubConfigResult.data);
    const pendingBatch: PendingBatch = decodeBase64(pendingBatchResult.data);

    const unbondRequests: UnbondRequestsByUserResponse = decodeBase64(unbondRequestsByUserResult.data);
    const ids: number[] = [];
    for (const unbondRequest of unbondRequests) {
      if (unbondRequest.id !== pendingBatch.id) {
        ids.push(unbondRequest.id);
      }
    }

    const batchesById: { [key: number]: Batch } = {};
    if (ids.length > 0) {
      const queries2 = encodeBase64(
        ids.map((id) => ({
          wasm: {
            smart: {
              contract_addr: steakHub,
              msg: encodeBase64({
                previous_batch: id,
              }),
            },
          },
        }))
      );

      const axiosResult2 = await axios.get<ContractStoreResponse<MultiqueryResponse>>(
        `${grpcGatewayUrl}/terra/wasm/v1beta1/contracts/${multiquery}/store?query_msg=${queries2}`
      );

      for (const result of axiosResult2["data"]["query_result"]) {
        if (result.success) {
          const batch: Batch = decodeBase64(result.data);
          batchesById[batch.id] = batch;
        } else {
          throw new Error("Fail to query one of the previous batches");
        }
      }
    }

    const currentTime = new Date();
    const unbondRequestsParsed: UnbondRequestParsed[] = [];
    for (const unbondRequest of unbondRequests) {
      if (unbondRequest.id === pendingBatch.id) {
        unbondRequestsParsed.push({
          status: "pending",
          amount: Number(unbondRequest.shares),
          startTime: new Date(pendingBatch["est_unbond_start_time"] * 1000),
          finishTime: new Date((pendingBatch["est_unbond_start_time"] + config["unbond_period"]) * 1000),
        });
      } else {
        const batch = batchesById[unbondRequest.id]!;
        const finishTime = new Date(batch["est_unbond_end_time"]);
        unbondRequestsParsed.push({
          status: currentTime < finishTime ? "unbonding" : "completed",
          amount: (Number(batch["uluna_unclaimed"]) * Number(unbondRequest.shares)) / Number(batch["total_shares"]),
          startTime: new Date((batch["est_unbond_end_time"] - config["unbond_period"]) * 1000),
          finishTime,
        });
      }
    }

    set({
      priceLunaUsd: Number(lunaPriceResponse["exchange_rates"][0]!["exchange_rate"]),
      balances: {
        uusd: Number(uusdBalanceResponse.amount.amount),
        uluna: Number(ulunaBalanceResponse.amount.amount),
        usteak: Number(usteakBalanceResponse.balance),
      },
      hubState: {
        totalLunaLocked: Number(hubStateResponse["total_uluna"]) / 1e6,
        exchangeRate: Number(hubStateResponse["exchange_rate"]),
      },
      pendingBatch: {
        id: pendingBatch.id,
        startTime: new Date(pendingBatch["est_unbond_start_time"] * 1000),
      },
      unbondRequests: unbondRequestsParsed,
    });
  },
}));
