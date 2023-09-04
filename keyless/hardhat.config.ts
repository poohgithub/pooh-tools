import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import type { HardhatNetworkAccountUserConfig } from "hardhat/types/config";
import "@nomiclabs/hardhat-waffle"

dotenv.config({ path: ".env" });

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    devnet: {
      url: "http://13.209.149.243:8545",
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
