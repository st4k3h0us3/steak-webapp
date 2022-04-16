import { Container } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import MySteak from "components/MySteak";
import UnbondQueue from "components/UnbondQueue";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Steak</title>
      </Head>
      <Container maxWidth="container.lg" px="6">
        <MySteak />
        <UnbondQueue />
      </Container>
    </>
  );
};

export default IndexPage;
