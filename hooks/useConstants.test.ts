import { renderHook } from "@testing-library/react-hooks";

import { GRPC_GATEWAY_URL, CONTRACTS } from "../constants";
import { useConstants } from "./useConstants";

test("should return correct constants for network", () => {
  const { result } = renderHook(() => useConstants({
    name: "mainnet",
    chainID: "columbus-5",
    lcd: "https://lcd.terra.dev",
  }));

  expect(result.current).toStrictEqual({
    grpcGatewayUrl: GRPC_GATEWAY_URL["mainnet"],
    contracts: CONTRACTS["mainnet"],
  });
});

test("should return constants as undefined if network is unknown", () => {
  const { result } = renderHook(() => useConstants(undefined));

  expect(result.current).toStrictEqual({});
});
