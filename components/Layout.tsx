import { Flex, Container, Spacer } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { FC, useEffect } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { useBalances, useHub, usePrices } from "../hooks";
import { useStore } from "../store";

const Layout: FC = ({ children }) => {
  const store = useStore();
  const wallet = useConnectedWallet();
  const pricesResult = usePrices();
  const stateResult = useHub(wallet?.network, [{ state: {} }]);
  const balancesResult = useBalances(wallet);

  // Updatw wallet if it is changed
  useEffect(() => {
    store.setWallet(wallet);
  }, [wallet]);

  // Update prices if the query is completed (`isSuccess`: false --> true)
  useEffect(() => {
    store.setPrices(pricesResult);
  }, [pricesResult.isSuccess]);

  // Update others if:
  // - wallet is connected, and the corresponding query is completed (`isSuccess`: false --> true), or
  // - wallet is disconnected (`isSkipped`: true --> false)
  useEffect(() => {
    store.setState(stateResult);
  }, [stateResult.isSuccess, stateResult.isSkipped]);
  useEffect(() => {
    store.setBalances(balancesResult);
  }, [balancesResult.isSuccess, balancesResult.isSkipped]);

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
