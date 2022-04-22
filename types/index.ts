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
 * Response of GRPC Gateway API query `/cosmos/bank/v1beta1/balances/{address}`, with pagination paramters omitted
 */
export interface NativeBalancesResponse {
  balances: Coin[];
}

/**
 * Response of CosmWasm query `BankQuery::Balance`; corresponding to Rust struct `cosmwasm_std::BalanceResponse`
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
 * Response type of the `multiquery` contract; see [link](https://github.com/st4k3h0us3/multiquery)
 */
export type MultiqueryResponse = {
  success: boolean;
  data: string;
}[];

/**
 * Response type of the `/wasm/v1beta1/contracts/{contractAddress}/store` API
 */
export type ContractStoreResponse<T> = {
  query_result: T;
};
