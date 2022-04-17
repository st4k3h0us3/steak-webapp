import {
  chakra,
  useDisclosure,
  Flex,
  Box,
  Button,
  HStack,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import React, { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import BurgerIcon from "./BurgerIcon";
import CloseIcon from "./CloseIcon";
import SteakIcon from "./SteakIcon";
import NavbarLink from "./NavbarLink";
import NavbarReturn from "./NavbarReturn"
import WalletInfo from "./WalletInfo";
import WalletConnect from "./WalletConnect";

type Props = {
  isBack: boolean;
  onClick?: React.MouseEventHandler;
};

const NavbarLinks: FC<Props> = ({ isBack = false }) => {
  return (
    <HStack display={["none", null, null, "block"]} flex="1" px="16" spacing="12">
      {isBack ? <NavbarReturn /> : null}
      {isBack ? null : <NavbarLink text="My Steak" href="/" />}
      {isBack ? null : <NavbarLink text="Protocol Stats" href="/stats" />}
    </HStack>
  );
};

const SidebarLinks: FC<Props> = ({ isBack = false, onClick }) => {
  return (
    <VStack align="flex-start" mt="20">
      {isBack ? <NavbarReturn onClick={onClick} /> : null}
      {isBack ? null : <NavbarLink onClick={onClick} text="My Steak" href="/" />}
      {isBack ? null : <NavbarLink onClick={onClick} text="Protocol Stats" href="/stats" />}
    </VStack>
  );
};

const Navbar: FC = () => {
  const { status } = useWallet();
  const { asPath } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const isBack = ["/bond", "/unbond", "/withdraw-unbonded"].includes(asPath);

  return (
    <Box w="100%" py="6">
      <Flex w="100%" justify="space-between" align="center">
        <NextLink href="/" passHref>
          <chakra.a>
            <SteakIcon w={["3rem", "4rem"]} h={["3rem", "4rem"]} />
          </chakra.a>
        </NextLink>
        <NavbarLinks isBack={isBack} />
        <HStack justify="flex-end">
          {status === WalletStatus.WALLET_CONNECTED ? <WalletInfo /> : <WalletConnect />}
          <Button
            display={[null, null, null, "none"]}
            variant="simple"
            minW="1.5rem"
            pl="1"
            ref={btnRef}
            onClick={onOpen}
          >
            <BurgerIcon color="brand.black" width="1.5rem" height="1.5rem" />
          </Button>
        </HStack>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" size="sm" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <Flex
            height="100%"
            bg="brand.lightBrown"
            zIndex="100"
            px={["6", null, "12"]}
            py="8"
            direction="column"
          >
            <Flex justify="space-between" width="100%" align="center">
              <Box flexShrink={0}>
                <SteakIcon w={["3rem", "4rem"]} h={["3rem", "4rem"]} />
              </Box>
              <Button variant="simple" mr="-2" onClick={onClose}>
                <CloseIcon color="white" width="1.5rem" height="1.5rem" />
              </Button>
            </Flex>
            <SidebarLinks isBack={isBack} onClick={onClose} />
          </Flex>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
