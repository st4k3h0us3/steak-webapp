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
      _hover: {
        textDecoration: "none",
      },
    },
  },
};

export default link;
