import { NetworkInfo } from "@terra-money/wallet-provider";

import { GRPC_GATEWAY_URL, MULTIQUERY, TOKENS } from "../constants";

type Constants = {
  grpcGatewayUrl?: string;
  multiquery?: string;
  tokens?: {
    steak: string;
    bluna: string;
    stluna: string;
    lunax: string;
  };
};

export function useConstants(network?: NetworkInfo): Constants {
  if (network && (network.name === "mainnet" || network.name === "testnet")) {
    return {
      grpcGatewayUrl: GRPC_GATEWAY_URL[network.name],
      multiquery: MULTIQUERY[network.name],
      tokens: TOKENS[network.name],
    };
  }

  // Return an empty object instead of `undefined`, so that it can be destructured using a syntax
  // such as `const { token } = useConstants(network);`
  return {};
}
