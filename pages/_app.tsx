import { ChakraProvider } from "@chakra-ui/react";
import {
  WalletControllerChainOptions,
  WalletProvider,
  StaticWalletProvider,
  getChainOptions,
} from "@terra-money/wallet-provider";
import App, { AppProps, AppContext } from "next/app";

import Layout from "../components/Layout";
import theme from "../theme";

const SteakApp = ({
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

SteakApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const chainOptions = await getChainOptions();
  return { ...appProps, ...chainOptions };
};

export default SteakApp;
