require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");

// Load environment variables.
const DEFAULT_PRIVATE_KEY =
  "990b68b61853f6418233b1f502a220a8770bb38849d9bd8fc552ed55f5899365";

const sharedNetworkConfig = {
  accounts: [DEFAULT_PRIVATE_KEY],
};

module.exports = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      ...sharedNetworkConfig,
      url: `https://mainnet.infura.io/v3/b76cba91dc954ceebff27244923224b1`,
    },
    rinkeby: {
      ...sharedNetworkConfig,
      url: `https://rinkeby.infura.io/v3/b76cba91dc954ceebff27244923224b1`,
    },
    ropsten: {
      ...sharedNetworkConfig,
      url: `https://ropsten.infura.io/v3/b76cba91dc954ceebff27244923224b1`,
    },
    xdai: {
      ...sharedNetworkConfig,
      url: "https://xdai.poanetwork.dev",
    },
    matic: {
      ...sharedNetworkConfig,
      url: "https://rpc-mainnet.maticvigil.com",
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: "8XPMGNBBKMSMTWS1JD21XA5E52Y8NEN11Y",
  },
};
