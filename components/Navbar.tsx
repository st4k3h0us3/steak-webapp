import { Flex, Box, HStack } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { FC } from "react";
import NextLink from "next/link";

import SteakIcon from "./SteakIcon";
import NavbarLink from "./NavbarLink";
import WalletInfo from "./WalletInfo";
import WalletConnect from "./WalletConnect";

const Navbar: FC = () => {
  const { status } = useWallet();
  return (
    <Box w="100%" pt="4">
      <Flex w="100%" justify="space-between" align="center">
        <Box flexShrink={0}>
          <NextLink href="/" passHref>
            <a>
              <SteakIcon w="4rem" h="4rem" />
            </a>
          </NextLink>
        </Box>
        <Box flex="1">
          <HStack flex="1" px="16" spacing="12">
            <NavbarLink text="My Steak" href="/" />
            <NavbarLink text="Protocol Stats" href="/stats" />
          </HStack>
        </Box>
        <HStack spacing="5" justify="flex-end">
          {status === WalletStatus.WALLET_CONNECTED ? <WalletInfo /> : <WalletConnect />}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
