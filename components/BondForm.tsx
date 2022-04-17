import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { FC } from "react";

import Header from "components/Header";
import AssetInput from "components/AssetInput";
import ArrowDownIcon from "components/ArrowDownIcon";

const mockAssets = {
  steak: {
    logo: "/steak.png",
    name: "Steak",
    symbol: "STEAK",
  },
  luna: {
    logo: "/luna.png",
    name: "Luna",
    symbol: "LUNA",
  },
  bluna: {
    logo: "/bluna.png",
    name: "bLuna",
    symbol: "bLUNA",
  },
  stluna: {
    logo: "/stluna.png",
    name: "Lido Staked Luna",
    symbol: "stLUNA",
  },
  lunax: {
    logo: "/lunax.png",
    name: "Stader LunaX",
    symbol: "LUNAX",
  },
};

const BondForm: FC = () => {
  return (
    <Box maxW="container.sm" mx="auto" mt={[null, null, null, "10"]}>
      <Header text="Stake LUNA" />
      <Box position="relative">
        <AssetInput defaultAsset={mockAssets["luna"]} additionalAssets={undefined} showMax={true} />
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
        <AssetInput defaultAsset={mockAssets["steak"]} additionalAssets={undefined} />
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
