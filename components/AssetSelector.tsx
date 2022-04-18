import {
  useDisclosure,
  Box,
  Button,
  Flex,
  Spacer,
  VStack,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FC } from "react";

import AssetSelectorListItem from "./AssetSelectorListItem";
import ChevronDownIcon from "./ChevronDownIcon";
import PopoverWrapper from "./PopoverWrapper";
import { Asset } from "../types";

type Props = {
  assets: Asset[];
};

const mockPrice = "$123.45";

const AssetSelector: FC<Props> = ({ assets }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <PopoverWrapper
      title="Select token"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      triggerElement={() => (
        <Button
          w="100%"
          bg="brand.red"
          color="white"
          borderWidth="2px"
          borderColor="brand.red"
          display="flex"
          borderRadius="full"
          textAlign="left"
          px="4"
          h="16"
          lineHeight="1.2"
          _hover={{
            bg: "white",
            color: "brand.red",
          }}
        >
          <Box>
            <Image
              src={assets[0].logo}
              alt="Logo"
              width="10"
              height="10"
              bg="white"
              borderRadius="full"
            />
          </Box>
          <Box ml="3" flex="1">
            <Text fontSize="2xl">{assets[0].symbol}</Text>
            <Text fontSize="sm">Price: {mockPrice}</Text>
          </Box>
          <Box ml="auto" mr="3">
            <ChevronDownIcon />
          </Box>
        </Button>
      )}
    >
      <VStack w={["calc(100vw - 80px)", null, "96"]} spacing={0} align="stretch" mt="6">
        {assets.map((asset, index) => (
          <AssetSelectorListItem key={index} asset={asset} onClick={onClose} />
        ))}
      </VStack>
    </PopoverWrapper>
  );
};

export default AssetSelector;
