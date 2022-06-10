import { Container, Box, Link } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box w="100%" color="white" bg="brand.darkBrown">
      <Container maxW="900px" py="12" px="6">
        <Box>
          <p style={{ marginBottom: "1rem", fontWeight: 800 }}>About</p>
          <p style={{ marginBottom: "1rem" }}>
            <Link variant="footer" isExternal={true} href="https://github.com/PFC-developer/steak-webapp">
              GitHub
            </Link>
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <Link variant="footer" isExternal={true} href="https://twitter.com/LiquidSteaking">
              Twitter
            </Link>
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <Link variant="footer" isExternal={true} href="https://t.me/+PadO-WwMDxNjMGEx">
              Telegram
            </Link>
          </p>
          <p>This site is being maintained by <Link variant="footer" isExternal={true} href="https://twitter.com/PFC_Validator">PFC</Link>. There is no relationship with <Link
          variant="footer" isExternal={true} href="https://twitter.com/Larry0x">@Larry0x</Link></p>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
