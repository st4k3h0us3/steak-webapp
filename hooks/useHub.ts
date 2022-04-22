import { NetworkInfo } from "@terra-money/wallet-provider";
import axios from "axios";
import { useQuery } from "react-query";

import { useConstants } from "./useConstants";
import { encodeBase64, decodeBase64 } from "../helpers";
import { ContractStoreResponse, MultiqueryResponse } from "../types";

type HubQueryResult = {
  isSuccess: boolean;
  responses?: object[];
};

export function useHub(network: NetworkInfo | undefined, queries: object[]): HubQueryResult {
  const { grpcGatewayUrl, contracts } = useConstants(network);

  const queryMsg = encodeBase64(
    queries.map((query) => {
      return {
        wasm: {
          smart: {
            contract_addr: contracts?.hub,
            msg: encodeBase64(query),
          },
        },
      };
    })
  );

  const query = () => {
    return axios.get<ContractStoreResponse<MultiqueryResponse>>(
      `${grpcGatewayUrl}/terra/wasm/v1beta1/contracts/${contracts?.multiquery}/store?query_msg=${queryMsg}`
    );
  };

  // NOTE: Skip the query if `network` is undefined
  const { data, isSuccess } = useQuery("hub", query, { enabled: !!network });

  // If `network` is not specified, we return status as success and balances and undefined
  if (!network) {
    return { isSuccess: true };
  }

  // If `network` is specified, we wait for the query to succeeed, then parse the result and return
  if (isSuccess) {
    const items = data.data.query_result;

    return {
      isSuccess,
      responses: items.map((item) => decodeBase64(item.data)),
    };
  }

  // If `network` is specified, but the query is not completed yet, we keep waiting
  return { isSuccess };
}
