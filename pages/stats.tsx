import { Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import Head from "next/head";
import { NextPage } from "next";

import Header from "../components/Header";
import Overview from "../components/Overview";

const StatsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Steak | Protocol Stats</title>
      </Head>
      <Header text="About" />
      <Box bg="white" p="6" borderRadius="2xl">
        <Text mb="3">
          <b>Steak</b> is a liquid staking protocol for 🌎 Terra.
        </Text>
        <Text mb="3">
          Users stake 🌔 LUNA through the <b>Steak Hub</b> smart contract, which in return mints 🥩
          STEAK tokens to the users representing their staked amount. Every 24–48 hours, the staking
          rewards are claimed and reinvested. As yield accrues, the exchange ratio between STEAK and
          LUNA tokens changes, with each unit of STEAK becoming worth more LUNA over time.
        </Text>
        <Text>
          Compared to similar protocols such as Lido and Stader, Steak:
          <UnorderedList>
            <ListItem>
              Zero fee or commission; no useless governance token to siphon value from users
            </ListItem>
            <ListItem>
              Zero money raised from VCs; developers worked completely voluntarily, paying for
              expenses out of their own pockets
            </ListItem>
            <ListItem>
              Committed to support non-institution, community-based validators, especially those who
              contribute to open source projects, run bare metal servers (instead of cloud-based
              ones), and provide crucial infrastructure service for the Cosmos ecosystem (e.g. IBC
              message relaying)
            </ListItem>
          </UnorderedList>
        </Text>
      </Box>
      <Overview />
      <Box textAlign="center" my="20">
        <Text fontSize="2xl" fontWeight="800" opacity={0.4}>
          Under construction... More stats coming soon!
        </Text>
      </Box>
    </>
  );
};

export default StatsPage;
