import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { NextPage } from "next";

import Overview from "components/Overview";

const ProtocolStatsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Steak | Protocol Stats</title>
      </Head>
      <Overview />
      <Box textAlign="center" my="20">
        <Text fontSize="2xl" fontWeight="800" opacity={0.4}>
          Under construction... More stats coming soon!
        </Text>
      </Box>
    </>
  );
};

export default ProtocolStatsPage;
