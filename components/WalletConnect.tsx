import { chakra, useDisclosure, HStack, Image, Text } from "@chakra-ui/react";
import { useWallet, ConnectType } from "@terra-money/wallet-provider";
import { FC } from "react";

import Modal from "./Modal";
import TerraIcon from "./TerraIcon";

type WalletOptions = {
  type: string;
  identifier?: string;
  name: string;
  icon: string;
  isInstalled?: boolean;
  walletAction: () => void;
};

const WalletConnectButton: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { connect, availableInstallations, availableConnections } = useWallet();

  const wallets: WalletOptions[] = [
    ...availableConnections
      .filter(({ type }) => type !== ConnectType.READONLY)
      .map(({ type, icon, name, identifier }) => ({
        type,
        identifier: identifier ?? "",
        name,
        icon,
        isInstalled: true,
        walletAction: () => {
          connect(type, identifier);
        },
      })),
    ...availableInstallations
      .filter(({ type }) => type !== ConnectType.READONLY)
      .map(({ type, icon, name, url, identifier }) => ({
        type,
        identifier,
        name: "Install " + name,
        icon,
        isInstalled: false,
        walletAction: () => {
          window.open(url, "_blank");
        },
      })),
  ];

  const buttons = wallets.map((wallet, index) => (
    <chakra.button
      key={index}
      transition="0.2s all"
      p="6"
      borderRadius="xl"
      bg="brand.darkBrown"
      width="100%"
      mb="4"
      _hover={{
        bg: "brand.darkerBrown",
        color: "white",
      }}
      onClick={() => {
        onClose();
        wallet.walletAction();
      }}
    >
      <HStack justify="space-between">
        <Text>{wallet.name}</Text>
        <Image src={wallet.icon} htmlWidth="24" alt="" />
      </HStack>
    </chakra.button>
  ));

  return (
    <>
      <chakra.button
        type="button"
        color="white"
        onClick={onOpen}
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        _hover={{
          bg: "brand.darkerBrown",
        }}
        bg="brand.darkBrown"
        py="2"
        px="4"
        borderRadius="full"
      >
        <HStack spacing="3">
          <TerraIcon width="1.25rem" height="1.25rem" />
          <Text fontSize="md">Connect your wallet</Text>
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose} title="Connect to a wallet">
          {buttons}
        </Modal>
      </chakra.button>
    </>
  );
};

export default WalletConnectButton;
