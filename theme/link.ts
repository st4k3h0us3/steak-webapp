const link = {
  variants: {
    bondOrUnbond: {
      outline: "none",
      borderRadius: "md",
      color: "brand.red",
      bg: "white",
      px: "10",
      py: "2",
      _hover: {
        color: "brand.black",
        bg: "brand.lightBrown",
        textDecoration: "none",
      },
    },
    trade: {
      outline: "none",
      borderRadius: "md",
      color: "white",
      bg: "brand.red",
      px: "10",
      py: "2",
      _hover: {
        color: "brand.red",
        bg: "white",
        textDecoration: "none",
      },
    },
    submit: {
      outline: "none",
      borderRadius: "md",
      color: "white",
      bg: "brand.red",
      px: "10",
      py: "2",
      _hover: {
        color: "brand.black",
        bg: "brand.lightBrown",
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
