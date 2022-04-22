export const CHAIN_TO_FINDER_INFO = {
  "columbus-5": "mainnet",
  "bombay-12": "testnet",
  localterra: "localterra",
};

export const GRPC_GATEWAY_URL = {
  mainnet: "https://lcd.terra.dev",
  testnet: "https://bombay-lcd.terra.dev",
};

export const CONTRACTS = {
  mainnet: {
    multiquery: "terra1swrywzkphty20e2uzpy582xu836luw0e5yp25m",
    hub: "terra15qr8ev2c0a0jswjtfrhfaj5ucgkhjd7la2shlg",
    steak: "terra1rl4zyexjphwgx6v3ytyljkkc4mrje2pyznaclv",
  },
  testnet: {
    multiquery: "terra1t5twwglq9vlmf0pz8yadmd6gr6es2gfc4fkjww",
    hub: "terra1xshrfs3lp7nwkdfh3067vfsf3kmweygfsc3hzy",
    steak: "terra1awhvtkm553rszxtvnuda4fe2r6rjjj7hjwzv0w",
  },
};

export const ASSETS = {
  steak: {
    logo: "/steak.png",
    name: "Steak",
    symbol: "STEAK",
  },
  luna: {
    logo: "/luna.png",
    name: "Luna",
    symbol: "LUNA",
  },
  bluna: {
    logo: "/bluna.png",
    name: "Anchor Bonded Luna",
    symbol: "bLUNA",
  },
  stluna: {
    logo: "/stluna.png",
    name: "Lido Staked Luna",
    symbol: "stLUNA",
  },
  lunax: {
    logo: "/lunax.png",
    name: "Stader LunaX",
    symbol: "LUNAX",
  },
};

// Larry's dev account. Used in testing
export const DEV_ACCT = "terra1z926ax906k0ycsuckele6x5hh66e2m4m5udwep";
