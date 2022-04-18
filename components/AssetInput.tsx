import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

import AssetAmount from "./AssetAmount";
import AssetSelector from "./AssetSelector";
import AssetSelectorSingle from "./AssetSelectorSingle";
import { Asset } from "../types";

type Props = {
  defaultAsset: Asset;
  additionalAssets?: Asset[];
  showMax?: boolean;
};

const AssetInput: FC<Props> = ({ defaultAsset, additionalAssets, showMax = false }) => {
  return (
    <Box bg="white" borderRadius="2xl" p="6" mb="2">
      <Flex direction={["column", null, "row"]}>
        <Box flex="1">
          {additionalAssets ? (
            <AssetSelector assets={[defaultAsset].concat(additionalAssets)} />
          ) : (
            <AssetSelectorSingle asset={defaultAsset} />
          )}
        </Box>
        <Box flex="1" ml={[null, null, "8"]} mt={["4", null, "0"]}>
          <AssetAmount showMax={showMax} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AssetInput;
