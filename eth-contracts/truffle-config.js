const HDWalletProvider = require("truffle-hdwallet-provider");

require("dotenv").config();

const DEV_mnemonic =
  "apple elevator enjoy audit little market slam siren rookie slide alone great";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      provider: function () {
        return new HDWalletProvider(
          DEV_mnemonic,
          "http://127.0.0.1:8545/",
          0,
          10
        );
      },
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
        ),
      network_id: 4,
      gas: 5500000, // Rinkeby has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "^0.6.4",
    },
  },
};
