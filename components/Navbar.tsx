import { Container, Flex, Box, Image, HStack } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { FC } from "react";
import NextLink from "next/link";

import NavbarLink from "./NavbarLink";
import WalletInfo from "./WalletInfo";
import WalletConnect from "./WalletConnect";

const Navbar: FC = () => {
  const { status } = useWallet();
  return (
    <Container maxW="container.xl" px={["6", null, "12"]} pt="8" position="relative" centerContent>
      <Flex w="100%" justify="space-between" align="center">
        <Box flexShrink={0}>
          <NextLink href="/" passHref>
            <a>
              <Image src="/steak.svg" alt="Steak" />
            </a>
          </NextLink>
        </Box>
        <Box flex="1">
          <HStack flex="1" px="16" spacing="12">
            <NavbarLink text="My Steak" href="/" />
            <NavbarLink text="Protocol Stats" href="/stats" underConstruction={true} />
          </HStack>
        </Box>
        <HStack spacing="5" justify="flex-end">
          {status === WalletStatus.WALLET_CONNECTED ? <WalletInfo /> : <WalletConnect />}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
