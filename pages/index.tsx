import { Container } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import MySteak from "components/MySteak";
import Overview from "components/Overview";
import UnbondQueue from "components/UnbondQueue";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Steak</title>
      </Head>
      <Container maxWidth="container.lg" px="6">
        <MySteak />
        <Overview />
        <UnbondQueue />
      </Container>
    </>
  );
};

export default IndexPage;
