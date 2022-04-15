const styles = {
  baseStyle: {
    content: {
      border: "none",
      bg: "brand.lighterBrown",
      width: "full",
      py: [5, 6],
      px: 6,
      boxShadow: "xl",
      borderRadius: "2xl",
      _focus: {
        boxShadow: "none",
      },
    },
    header: {
      borderBottomWidth: 0,
      fontSize: "xl",
      p: 0,
    },
    body: {
      p: 0,
    },
    popper: {
      zIndex: 9999,
    },
  },
  sizes: {
    xs: {
      popper: {
        maxWidth: "xs",
      },
    },
  },
  defaultProps: {
    flip: true,
  },
};

export default styles;
