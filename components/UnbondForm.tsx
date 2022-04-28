import { useDisclosure, Box, Flex, Button, Text } from "@chakra-ui/react";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { FC, useEffect, useState } from "react";

import Header from "./Header";
import AssetInput from "./AssetInput";
import ArrowDownIcon from "./ArrowDownIcon";
import TxModal from "./TxModal";
import { useStore } from "../store";
import { encodeBase64, truncateDecimals } from "../helpers";
import { useConstants } from "../hooks";

const UnbondForm: FC = () => {
  const wallet = useConnectedWallet();
  const balances = useStore((state) => state.balances);
  const lunaPrice = useStore((state) => state.prices?.luna);
  const exchangeRate = useStore((state) => state.state?.exchangeRate);
  const [steakPrice, setSteakPrice] = useState<number>();
  const [offerAmount, setOfferAmount] = useState<number>(0);
  const [returnAmount, setReturnAmount] = useState<number>(0);
  const [msgs, setMsgs] = useState<MsgExecuteContract[]>([]);
  const { contracts } = useConstants(wallet?.network.name);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (lunaPrice && exchangeRate) {
      setSteakPrice(lunaPrice * exchangeRate);
    } else {
      setSteakPrice(undefined);
    }
  }, [lunaPrice, exchangeRate]);

  useEffect(() => {
    if (wallet && contracts) {
      setMsgs([
        new MsgExecuteContract(wallet.terraAddress, contracts["steak"], {
          send: {
            contract: contracts["hub"],
            amount: offerAmount,
            msg: encodeBase64({ queue_unbond: {} }),
          },
        }),
      ]);
    } else {
      setMsgs([]);
    }
  }, [wallet?.network.name, wallet?.terraAddress, offerAmount]);

  const handleOfferAmountChange = (newOfferAmount: number) => {
    setOfferAmount(newOfferAmount);
    setReturnAmount(exchangeRate ? truncateDecimals(newOfferAmount / exchangeRate) : 0);
  };

  const handleReturnAmountChange = (newReturnAmount: number) => {
    setReturnAmount(newReturnAmount);
    setOfferAmount(exchangeRate ? truncateDecimals(newReturnAmount * exchangeRate) : 0);
  };

  const mockTime = new Date();

  return (
    <Box maxW="container.sm" mx="auto">
      <Header text="Unstake STEAK" />
      <Box position="relative">
        <AssetInput
          assetSymbol="STEAK"
          assetLogo="/steak.png"
          amount={offerAmount}
          price={steakPrice}
          balance={balances ? balances.usteak / 1e6 : 0}
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
          assetSymbol="LUNA"
          assetLogo="/luna.png"
          amount={returnAmount}
          price={lunaPrice}
          balance={balances ? balances.uluna / 1e6 : 0}
          showMaxBtn={false}
          onAmountChange={handleReturnAmountChange}
        />
      </Box>
      <Box color="black" bg="white" p="6" mt="2" borderRadius="2xl" position="relative">
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="800">
            {mockTime.toLocaleString()}
          </Text>
          <Text opacity="0.4" mt="3">
            Next Batch Time
          </Text>
        </Box>
        <Text fontSize="sm" opacity="0.4" mt="6">
          Due to limitations imposed by the Terra chain, the protocol may not be able to serve all
          unstaking requests from users on-demand. Instead, unstaking requests are collected over a
          3-day period, and submitted together in a batch. The unstaking period lasts for 21 days
          after the batch is submitted. Use the Steak webapp to claim the unstaked Luna after the 21
          days.
        </Text>
      </Box>
      <Box textAlign="center">
        <Button
          type="button"
          variant="primary"
          mt="6"
          onClick={onOpen}
          isLoading={false}
          isDisabled={!wallet || offerAmount == 0}
        >
          Unstake
        </Button>
        <Text mt="3" textStyle="small" variant="dimmed" textAlign="center">
          {""}
        </Text>
        <TxModal isOpen={isOpen} onClose={onClose} title="Stake LUNA" msgs={msgs} />
      </Box>
    </Box>
  );
};

export default UnbondForm;
