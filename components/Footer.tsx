import { Container, Box, Link } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box w="100%" color="white" bg="brand.darkBrown">
      <Container maxW="container.lg" py="12" px="6">
        <Box>
          <p style={{ marginBottom: "1rem", fontWeight: 800 }}>About</p>
          <p style={{ marginBottom: "1rem" }}>
            <Link variant="footer" isExternal={true} href="https://https://github.com/st4k3h0us3">
              GitHub
            </Link>
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <Link variant="footer" isExternal={true} href="https://twitter.com/st4k3h0us3">
              Twitter
            </Link>
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <Link variant="footer" isExternal={true} href="https://twitter.com/st4k3h0us3">
              Telegram
            </Link>
          </p>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
