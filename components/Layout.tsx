import { Box, Flex } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { FC } from "react";

import Navbar from "./Navbar";

const Layout: FC = ({ children }) => {
  return (
    <Flex height="100vh" direction="column">
      <Global
        styles={{
          "html,body": {
            width: "100%",
            overflowX: "hidden",
            position: "relative",
          },
          body: {
            backgroundColor: "#f5d9c0",
          },
        }}
      ></Global>
      <Box>
        <Navbar />
      </Box>
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default Layout;
