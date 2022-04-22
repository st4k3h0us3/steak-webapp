import { NetworkInfo } from "@terra-money/wallet-provider";

import { GRPC_GATEWAY_URL, CONTRACTS } from "../constants";

type Constants = {
  grpcGatewayUrl?: string;
  contracts?: {
    multiquery: string;
    hub: string;
    steak: string;
  };
};

export function useConstants(network?: NetworkInfo): Constants {
  if (network && (network.name === "mainnet" || network.name === "testnet")) {
    return {
      grpcGatewayUrl: GRPC_GATEWAY_URL[network.name],
      contracts: CONTRACTS[network.name],
    };
  }

  // Return an empty object instead of `undefined`, so that it can be destructured using a syntax
  // such as `const { token } = useConstants(network);`
  return {};
}
