import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useState, FC } from "react";

import Header from "components/Header";
import AssetInput from "components/AssetInput";
import ArrowDownIcon from "components/ArrowDownIcon";
import { ASSETS } from "../constants";
import { Asset } from "../types";

const mockCurrentAsset = ASSETS["luna"];
const mockAvailableAssets = [ASSETS["luna"], ASSETS["bluna"], ASSETS["stluna"], ASSETS["lunax"]];

const BondForm: FC = () => {
  const [currentAsset, setCurrentAsset] = useState<Asset>(mockCurrentAsset);
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  const handleCurrentAssetChange = (asset: Asset) => {
    setCurrentAsset(asset);
    setCurrentAmount(0);
  }

  return (
    <Box maxW="container.sm" mx="auto" mt={[null, null, null, "10"]}>
      <Header text="Stake LUNA" />
      <Box position="relative">
        <AssetInput
          currentAsset={currentAsset}
          currentAmount={currentAmount}
          availableAssets={mockAvailableAssets}
          onAssetChange={handleCurrentAssetChange}
          onAmountChange={setCurrentAmount}
        />
        <Flex
          justify="center"
          align="center"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <ArrowDownIcon
            w="3rem"
            h="3rem"
            fill="brand.red"
            bg="white"
            border="solid 6px white"
            borderRadius="full"
          />
        </Flex>
        <AssetInput currentAsset={ASSETS["steak"]} currentAmount={0} />
      </Box>
      <Box textAlign="center">
        <Button
          type="button"
          variant="primary"
          mt="6"
          onClick={() => {}}
          isLoading={false}
          isDisabled={false}
        >
          <Text>Stake</Text>
        </Button>
        <Text mt="3" textStyle="small" variant="dimmed" textAlign="center">
          TX Fee: 69.420 UST
        </Text>
      </Box>
    </Box>
  );
};

export default BondForm;
