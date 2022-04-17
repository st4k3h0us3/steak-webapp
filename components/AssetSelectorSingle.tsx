import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

import { Asset } from "../types";

type Props = {
  asset: Asset;
};

const mockPrice = "$123.45";

const AssetSelectorSingle: FC<Props> = ({ asset }) => {
  return (
    <Box
      bg="brand.red"
      color="white"
      display="flex"
      borderRadius="full"
      textAlign="left"
      px="4"
      h="16"
      lineHeight="1.2"
    >
      <Flex align="center">
        <Box>
          <Image
            src={asset.logo}
            alt="Logo"
            width="10"
            height="10"
            bg="white"
            borderRadius="full"
          />
        </Box>
        <Box ml="3" flex="1">
          <Text fontSize="2xl">
            {asset.symbol}
          </Text>
          <Text fontSize="sm">
            Price: {mockPrice}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AssetSelectorSingle;
