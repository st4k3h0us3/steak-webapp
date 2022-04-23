import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useState, FC } from "react";

import Header from "./Header";
import AssetInput from "./AssetInput";
import ArrowDownIcon from "./ArrowDownIcon";
import { useStore } from "../store";
import { truncateDecimals } from "../helpers";

const BondForm: FC = () => {
  const balances = useStore((state) => state.balances);
  const exchangeRate = useStore((state) => state.state?.exchangeRate);
  const lunaPrice = useStore((state) => state.prices?.luna);
  const [offerAmount, setOfferAmount] = useState<number>(0);
  const [returnAmount, setReturnAmount] = useState<number>(0);

  const steakPrice = exchangeRate && lunaPrice ? exchangeRate * lunaPrice : undefined;

  const handleOfferAmountChange = (newOfferAmount: number) => {
    setOfferAmount(newOfferAmount);
    setReturnAmount(exchangeRate ? truncateDecimals(newOfferAmount / exchangeRate) : 0);
  };

  const handleReturnAmountChange = (newReturnAmount: number) => {
    setReturnAmount(newReturnAmount);
    setOfferAmount(exchangeRate ? truncateDecimals(newReturnAmount * exchangeRate) : 0);
  };

  const handleSubmitBtnClick = () => {
    // TODO
  };

  return (
    <Box maxW="container.sm" mx="auto" mt={[null, null, null, "10"]}>
      <Header text="Stake LUNA" />
      <Box position="relative">
        <AssetInput
          assetSymbol="LUNA"
          assetLogo="/luna.png"
          amount={offerAmount}
          price={lunaPrice}
          balance={balances ? balances.uluna / 1e6 : 0}
          showMaxBtn={true}
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
        <AssetInput
          assetSymbol="STEAK"
          assetLogo="/steak.png"
          amount={returnAmount}
          price={steakPrice}
          balance={balances ? balances.usteak / 1e6 : 0}
          showMaxBtn={false}
          onAmountChange={handleReturnAmountChange}
        />
      </Box>
      <Box textAlign="center">
        <Button
          type="button"
          variant="primary"
          mt="6"
          onClick={handleSubmitBtnClick}
          isLoading={false}
          isDisabled={false}
        >
          <Text>Stake</Text>
        </Button>
        <Text mt="3" textStyle="small" variant="dimmed" textAlign="center">
          TX Fee: ?
        </Text>
      </Box>
    </Box>
  );
};

export default BondForm;
