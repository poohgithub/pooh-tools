import * as dotenv from "dotenv";
import { Wallet, parseEther } from "ethers";
import { HardhatUserConfig } from "hardhat/config";
import type { HardhatNetworkAccountUserConfig } from "hardhat/types/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config({ path: "env/.env" });

function getAccounts() {
  const accounts: HardhatNetworkAccountUserConfig[] = [];
  const defaultBalance = parseEther("2000000").toString();

  const n = 10;
  for (let i = 0; i < n; ++i) {
    accounts.push({
      privateKey: Wallet.createRandom().privateKey,
      balance: defaultBalance,
    });
  }
  accounts[0].privateKey = process.env.ADMIN_KEY ?? "";
  accounts[1].privateKey = process.env.ORDER_NFT_BUYER_KEY ?? "";
  accounts[2].privateKey = process.env.ORDER_NFT_SELLER_KEY ?? "";

  return accounts;
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      accounts: getAccounts(),
    },
    testnet: {
      url: process.env.TESTNET_URL ?? "",
      chainId: 12301,
      accounts: [
        process.env.ADMIN_KEY ?? "",
        process.env.USER_KEY ?? "",
        process.env.OWNER_KEY ?? "",
        process.env.ZONE_KEY ?? "",
        process.env.BUYER_KEY ?? "",
        process.env.ORDER_NFT_BUYER_KEY ?? "",
        process.env.ORDER_NFT_SELLER_KEY ?? "",
        process.env.SPIDER_VERSE_NFT_CREATOR_KEY ?? "",
        process.env.FEE_COLLECTOR_OWNER_KEY ?? "",
        process.env.FEE_TEST_TRANSFER_KEY ?? "",
        process.env.WBOA_DEPOSITER ?? "",
      ],
    },
  },
};

export default config;
