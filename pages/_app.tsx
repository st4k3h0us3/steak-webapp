import { ChakraProvider } from "@chakra-ui/react";
import {
  WalletControllerChainOptions,
  WalletProvider,
  StaticWalletProvider,
} from "@terra-money/wallet-provider";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "../components/Layout";
import theme from "../theme";

const CustomApp = ({
  Component,
  pageProps,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) => {
  const queryClient = new QueryClient({
    // TODO: add appropriate configs here
  });

  const main = (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
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
