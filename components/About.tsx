import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";

import Header from "./Header";

function ExternalLinkIconWrapper() {
  return <ExternalLinkIcon ml="1" mr="6" transform="translateY(-2px)" />;
}

const About: FC = () => {
  return (
    <>
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
        <Text mb="3">
          Compared to similar protocols such as Lido and Stader, Steak&rsquo;s unique feaures
          include:
          <UnorderedList>
            <ListItem>
              <b>Zero fee or commission;</b> no useless governance token to siphon value from users
            </ListItem>
            <ListItem>
              <b>Zero money raised from VCs;</b> developers worked completely voluntarily, paying
              for expenses out of their own pockets
            </ListItem>
            <ListItem>
              <b>Committed to support non-institution, community-based validators,</b> especially
              those who contribute to open source projects, run bare metal servers (instead of
              cloud-based ones), and provide crucial infrastructure services for the Cosmos
              ecosystem (e.g. IBC message relaying)
            </ListItem>
          </UnorderedList>
        </Text>
        <Text mb="3">
          <b>Useful links</b>
        </Text>
        <Flex direction={["column", null, "row", null]}>
          <Link
            variant="docs"
            isExternal={true}
            href="https://github.com/st4k3h0us3/steak-contracts"
          >
            Smart contract source code <ExternalLinkIconWrapper />
          </Link>
          <Link variant="docs" isExternal={true} href="https://github.com/st4k3h0us3/steak-webapp">
            Webapp source code <ExternalLinkIconWrapper />
          </Link>
          <Link
            variant="docs"
            isExternal={true}
            href="https://github.com/SCV-Security/PublicReports/blob/main/CW/St4k3h0us3/St4k3h0us3%20-%20Steak%20Contracts%20Audit%20Review%20-%20%20v1.0.pdf"
          >
            Audit report by SCV <ExternalLinkIconWrapper />
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default About;
