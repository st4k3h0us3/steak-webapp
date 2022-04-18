import { Button, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

import { Asset } from "../types";

type Props = {
  asset: Asset;
  onClick: (Asset) => void;
};

const AssetSelectorListItem: FC<Props> = ({ asset, onClick }) => {
  return (
    <Button
      type="button"
      transition="0.2s all"
      bg="transparent"
      outline="none"
      textAlign="left"
      display="flex"
      px="2"
      py="8"
      _hover={{
        bg: "brand.darkBrown",
      }}
      onClick={() => onClick(asset)}
    >
      <Flex align="center" justify="space-between" w="full">
        <Box flexShrink={0} mr="3">
          <Image src={asset.logo} alt={asset.symbol} boxSize="8" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {asset.symbol}
          </Text>
          <Text display={["none", null, null, "block"]} fontSize="sm" opacity="0.4">
            {asset.name}
          </Text>
        </Box>
        <Box>
          <HStack>
            <Box>
              <Text mt="1" fontSize="sm" opacity="0.4">
                In wallet:
              </Text>
              <Text mt="1" fontSize="sm" opacity="0.4">
                Price:
              </Text>
            </Box>
            <Box minW="20">
              <Text mt="1" fontSize="sm" textAlign="right">
                12,345.678
              </Text>
              <Text mt="1" fontSize="sm" textAlign="right" opacity={0.4}>
                $123.45
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Button>
  );
};

export default AssetSelectorListItem;
