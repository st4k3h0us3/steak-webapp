export type Asset = {
  logo: string;
  name: string;
  symbol: string;
};

/**
 * Corresponding to Go type `sdk.Coin` or Rust type `cosmwasm_std::Coin`
 */
export type Coin = {
  denom: string;
  amount: string;
};

/**
 * Response of GRPC Gateway `/cosmos/bank/v1beta1/balances/{address}` API, with pagination paramters omitted
 */
export interface NativeBalancesResponse {
  balances: Coin[];
}

/**
 * Response of GRPC Gateway `/wasm/v1beta1/contracts/{contractAddress}/store` API
 */
export type ContractStoreResponse<T> = {
  query_result: T;
};

/**
 * Response of `cosmwasm_std::BankQuery::Balance`; corresponding to Rust struct `cosmwasm_std::BalanceResponse`
 */
export type NativeBalanceResponse = {
  amount: Coin;
};

/**
 * Corresponding to Rust struct `cw20::BalanceResponse`
 */
export type Cw20BalanceResponse = {
  balance: string;
};

/**
 * Response type of the [`multiquery`](https://github.com/st4k3h0us3/multiquery) contract
 */
export type MultiqueryResponse = {
  success: boolean;
  data: string;
}[];

/**
 * Response type of [`steak::hub::StateResponse`](https://github.com/st4k3h0us3/steak-contracts/blob/v1.0.0-rc0/packages/steak/src/hub.rs#L118-L128)
 */
export type StateResponse = {
  total_usteak: string;
  total_uluna: string;
  exchange_rate: string;
  unlocked_coins: Coin[];
};

/**
 * Response type of Coingecko's [`/simple/price`](https://www.coingecko.com/en/api/documentation) API for Luna in USD
 */
export type CoingeckeLunaUsdResponse = {
  "terra-luna": {
    usd: number;
  };
};
