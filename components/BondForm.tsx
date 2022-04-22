import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useState, FC } from "react";

import Header from "./Header";
import AssetInput from "./AssetInput";
import ArrowDownIcon from "./ArrowDownIcon";
import { ASSETS } from "../constants";
import { useHub } from "../hooks";
import { StateResponse } from "../types";
import { truncateDecimals } from "../helpers";

const BondForm: FC = () => {
  const [offerAmount, setOfferAmount] = useState<number>(0);
  const [returnAmount, setReturnAmount] = useState<number>(0);

  const wallet = useConnectedWallet();

  const { responses } = useHub(wallet?.network, [{ state: {} }]);
  const stateResponse = responses ? (responses[0] as StateResponse) : undefined;
  const exchangeRate = stateResponse?.exchange_rate ? Number(stateResponse["exchange_rate"]) : undefined; // Luna per Steak

  const handleOfferAmountChange = (newOfferAmount: number) => {
    setOfferAmount(newOfferAmount);
    setReturnAmount(exchangeRate ? truncateDecimals(newOfferAmount / exchangeRate) : 0);
  }

  return (
    <Box maxW="container.sm" mx="auto" mt={[null, null, null, "10"]}>
      <Header text="Stake LUNA" />
      <Box position="relative">
        <AssetInput
          currentAsset={ASSETS["luna"]}
          currentAmount={offerAmount}
          onAmountChange={handleOfferAmountChange}
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
        <AssetInput currentAsset={ASSETS["steak"]} currentAmount={returnAmount} />
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
