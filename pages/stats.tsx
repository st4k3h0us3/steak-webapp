import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { NextPage } from "next";

import About from "../components/About";
import Overview from "../components/Overview";
import Validators from "../components/Validators";

const StatsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Steak | Protocol Stats</title>
      </Head>
      <About />
      <Overview />
      <Validators />
      <Box textAlign="center" my="20">
        <Text fontSize="2xl" fontWeight="800" opacity={0.4}>
          Under construction... More stats coming soon!
        </Text>
        <Text fontSize="2xl" fontWeight="800" opacity={0.4}>
          This site is being maintained by PFC with @Larry0x&apos;s consent, and will be handed over when he chooses
        </Text>
      </Box>
    </>
  );
};

export default StatsPage;
