import { extendTheme } from "@chakra-ui/react";

const defaultSansSerif = "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif";
const defaultEmoji = "Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";

export default extendTheme({
  fonts: {
    heading: `Urbanist,${defaultSansSerif},${defaultEmoji}`,
    body: `Urbanist,${defaultSansSerif},${defaultEmoji}`,
    mono: "Menlo, monospace",
  },
  colors: {
    brand: {
      darkerBrown: "#a08b77",
      darkBrown: "#d2bba6",
      lightBrown: "#f5d9c0",
      lighterBrown: "#e4d5c8",
      red: "#d9474b",
    },
  },
});
