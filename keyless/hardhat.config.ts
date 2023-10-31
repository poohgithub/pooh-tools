import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import type { HardhatNetworkAccountUserConfig } from "hardhat/types/config";
import "@nomiclabs/hardhat-waffle"

dotenv.config({ path: ".env" });

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 18000,
          },
        },
      },
    ],
    overrides: {
      "contracts/WETH.sol": {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
    },
  },
  networks: {
    localnet: {
      url: "http://localhost:8545",
      chainId: 12301,
      accounts: [
        process.env.ADMIN_KEY ?? "",
        process.env.USER_KEY ?? "",
        process.env.OWNER_KEY ?? "",
      ],
    },
  },
};

export default config;
