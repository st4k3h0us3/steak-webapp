import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useState, FC } from "react";

import Header from "./Header";
import AssetInput from "./AssetInput";
import ArrowDownIcon from "./ArrowDownIcon";
import { ASSETS } from "../constants";

const BondForm: FC = () => {
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  return (
    <Box maxW="container.sm" mx="auto" mt={[null, null, null, "10"]}>
      <Header text="Stake LUNA" />
      <Box position="relative">
        <AssetInput currentAsset={ASSETS["luna"]} currentAmount={currentAmount} onAmountChange={setCurrentAmount} />
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
