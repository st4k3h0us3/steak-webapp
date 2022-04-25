import { GRPC_GATEWAY_URL, GAS_CONFIGS, CONTRACTS } from "../constants";

type Constants = {
  grpcGatewayUrl?: string;
  gasConfigs?: {
    gas?: string;
    gasPrices: string;
    gasAdjustment: number;
  };
  contracts?: {
    multiquery: string;
    hub: string;
    steak: string;
  };
};

export function useConstants(network?: string): Constants {
  if (network === "mainnet" || network === "testnet") {
    return {
      grpcGatewayUrl: GRPC_GATEWAY_URL[network],
      gasConfigs: GAS_CONFIGS,
      contracts: CONTRACTS[network],
    };
  }

  // Return an empty object instead of `undefined`, so that it can be destructured using a syntax
  // such as `const { token } = useConstants(network);`
  return {};
}
