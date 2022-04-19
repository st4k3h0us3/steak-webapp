import {
  useDisclosure,
  Box,
  Button,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

import AssetSelectorItem from "./AssetSelectorItem";
import ChevronDownIcon from "./ChevronDownIcon";
import PopoverWrapper from "./PopoverWrapper";
import { Asset } from "../types";

type Props = {
  current: Asset,
  available: Asset[];
  onChange: any;
};

const mockPrice = "$123.45";

const AssetSelector: FC<Props> = ({ current, available, onChange }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleItemClick = (asset: Asset) => {
    onChange(asset);
    onClose();
  }

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
              src={current.logo}
              alt="Logo"
              width="10"
              height="10"
            />
          </Box>
          <Box ml="3" flex="1">
            <Text fontSize="2xl">{current.symbol}</Text>
            <Text fontSize="sm">Price: {mockPrice}</Text>
          </Box>
          <Box ml="auto" mr="3">
            <ChevronDownIcon />
          </Box>
        </Button>
      )}
    >
      <VStack w={["calc(100vw - 80px)", null, "96"]} spacing={0} align="stretch" mt="6">
        {available.map((asset, index) => (
          <AssetSelectorItem key={index} asset={asset} onClick={handleItemClick} />
        ))}
      </VStack>
    </PopoverWrapper>
  );
};

export default AssetSelector;
