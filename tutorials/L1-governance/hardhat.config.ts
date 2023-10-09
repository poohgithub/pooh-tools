import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// import file with Goerli and local network params'
const localnet = require("./localnet.json");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
  },
  networks: {
    // Local network
    localnet: {
      url: localnet.nodeUrl,
      accounts: [localnet.deployerPrivateKey],
    },
  },
};

export default config;
