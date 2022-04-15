const button = {
  variants: {
    disconnect: {
      outline: "none",
      borderRadius: "full",
      fontWeight: "500",
      bg: "brand.red",
      color: "white",
      px: "10",
      py: "2",
      _hover: {
        bg: "white",
        color: "brand.red",
        _disabled: {
          bg: "rgba(217, 71, 75, 0.75)",
          color: "white",
        },
      },
      _focus: {
        boxShadow: "none",
      },
    },
    simple: {
      outline: "none",
      borderRadius: "none",
      bg: "none",
      px: "none",
      _hover: {
        bg: "none",
      },
    },
  },
};

export default button;
