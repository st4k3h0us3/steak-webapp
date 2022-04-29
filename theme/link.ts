const link = {
  variants: {
    submit: {
      transition: "0.2s all",
      outline: "none",
      border: "solid 2px #d9474b",
      borderRadius: "md",
      color: "white",
      bg: "brand.red",
      px: "10",
      py: "2",
      _hover: {
        color: "brand.red",
        bg: "transparent",
        textDecoration: "none",
      },
    },
    footer: {
      color: "white",
      textUnderlineOffset: "0.3rem",
    },
    docs: {
      textUnderlineOffset: "0.3rem",
    },
  },
};

export default link;
