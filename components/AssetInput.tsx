import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

import AssetAmount from "./AssetAmount";
import AssetSelector from "./AssetSelector";
import AssetSelectorSingle from "./AssetSelectorSingle";
import { Asset } from "../types";

type Props = {
  currentAsset: Asset;
  currentAmount: number;
  availableAssets?: Asset[];
  onAssetChange?: any;
  onAmountChange?: any;
  showMax?: boolean;
};

const AssetInput: FC<Props> = ({
  currentAsset,
  currentAmount,
  availableAssets,
  onAssetChange,
  onAmountChange,
  showMax = false,
}) => {
  return (
    <Box bg="white" borderRadius="2xl" p="6" mb="2">
      <Flex direction={["column", null, "row"]}>
        <Box flex="1">
          {availableAssets ? (
            <AssetSelector
              current={currentAsset}
              available={availableAssets}
              onChange={onAssetChange}
            />
          ) : (
            <AssetSelectorSingle asset={currentAsset} />
          )}
        </Box>
        <Box flex="1" ml={[null, null, "8"]} mt={["4", null, "0"]}>
          <AssetAmount amount={currentAmount} onChange={onAmountChange} showMax={showMax} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AssetInput;
