export const CONTRACTS = {
  mainnet: {
    multiquery: "terra1m277jus3ahphsy6wml8kdwrz2ecf7wy4ggncz6d9xmhd2a29qyss3zakjl",
    steakHub: "terra12e4v50xl33fnwkzltz9vu565snlmx65vdrk8e2644km09myewr8q538psc",
    steakToken: "terra1xumzh893lfa7ak5qvpwmnle5m5xp47t3suwwa9s0ydqa8d8s5faqn6x7al",
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
    lcd: "https://phoenix-lcd.terra.dev",
    isClassic:false,
    walletconnectID:1,
    api:"https://phoenix-api.terra.dev"
  },
  testnet: {
    name: "testnet",
    chainID: "pisco-1",
    lcd: "https://pisco-lcd.terra.dev",
    isClassic:false,
    walletconnectID:0,
    api:"https://pisco-api.terra.dev"
  },
};

export const GAS_OPTIONS = {
  gas: undefined, // leave undefined so it is estimated when signing
  gasPrices: "0.15uluna",
  gasAdjustment: 1.2,
};
