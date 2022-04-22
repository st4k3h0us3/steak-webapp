export const CHAIN_TO_FINDER_INFO = {
  "columbus-5": "mainnet",
  "bombay-12": "testnet",
  localterra: "localterra",
};

export const GRPC_GATEWAY_URL = {
  mainnet: "https://lcd.terra.dev",
  testnet: "https://bombay-lcd.terra.dev",
};

export const MULTIQUERY = {
  mainnet: "terra1swrywzkphty20e2uzpy582xu836luw0e5yp25m",
  testnet: "terra1t5twwglq9vlmf0pz8yadmd6gr6es2gfc4fkjww",
};

export const TOKENS = {
  mainnet: {
    steak: "terra1rl4zyexjphwgx6v3ytyljkkc4mrje2pyznaclv",
    bluna: "",
    stluna: "",
    lunax: "",
  },
  testnet: {
    steak: "terra1awhvtkm553rszxtvnuda4fe2r6rjjj7hjwzv0w",
    bluna: "",
    stluna: "",
    lunax: "",
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
