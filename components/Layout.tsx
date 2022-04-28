import { Flex, Container, Spacer } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { FC, useEffect } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStore } from "../store";

const Layout: FC = ({ children }) => {
  const wallet = useConnectedWallet();
  const store = useStore();

  // Update store if wallet is changed
  useEffect(() => {
    store.update(wallet);
  }, [wallet?.network.name, wallet?.terraAddress]);

  return (
    <Flex minHeight="100vh" direction="column">
      <Global
        styles={{
          "html,body": {
            width: "100%",
            overflowX: "hidden",
            position: "relative",
          },
          body: {
            color: "#312b26",
            backgroundColor: "#f5d9c0",
          },
        }}
      ></Global>
      <Container maxW="900px" mx="auto" mb="20">
        <Navbar />
        {children}
      </Container>
      <Spacer />
      <Footer />
    </Flex>
  );
};

export default Layout;
