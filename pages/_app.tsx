import { ChakraProvider } from "@chakra-ui/react";
import {
  WalletControllerChainOptions,
  WalletProvider,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { AppProps } from "next/app";

import Layout from "../components/Layout";
import theme from "../theme";

const CustomApp = ({
  Component,
  pageProps,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) => {
  const main = (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );

  return typeof window !== "undefined" ? (
    <WalletProvider defaultNetwork={defaultNetwork} walletConnectChainIds={walletConnectChainIds}>
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
};

export default CustomApp;
