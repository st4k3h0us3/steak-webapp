export const CONTRACTS = {
  mainnet: {
    multiquery: "terra1swrywzkphty20e2uzpy582xu836luw0e5yp25m",
    steakHub: "terra15qr8ev2c0a0jswjtfrhfaj5ucgkhjd7la2shlg",
    steakToken: "terra1rl4zyexjphwgx6v3ytyljkkc4mrje2pyznaclv",
  },
  testnet: {
    multiquery: "terra1mgrye4409qt9yen33rrwnj06eau56kh96ajjr2fcxvcc4etawp9qhsgf8f",
    steakHub: "terra1lm7d4zr97rzp3a22szdv6ucpeyckyl2l2wh6jc9qrga78eyrvamsjgs5q6",
    steakToken: "terra1q02glqy2gcl9kavshhh9tzr3l7cjwjwk7mhatd9h9nc243gq73esdat6wj",
  },
};

export const NETWORKS = {
  mainnet: {
    name: "mainnet",
    chainID: "phoenix-1",
    lcd: "https://lcd.terra.dev",
    isClassic:false,
    walletconnectID:1
  },
  testnet: {
    name: "testnet",
    chainID: "pisco-1",
    lcd: "https://pisco-lcd.terra.dev",
    isClassic:false,
    walletconnectID:0
  },
};

export const GAS_OPTIONS = {
  gas: undefined, // leave undefined so it is estimated when signing
  gasPrices: "0.15uluna",
  gasAdjustment: 1.2,
};
