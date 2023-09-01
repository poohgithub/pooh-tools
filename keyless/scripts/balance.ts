import { ethers } from "hardhat";
import { BigNumber, Wallet } from "ethers";

async function main() {
  const provider = ethers.provider;

  const admin = new Wallet(process.env.ADMIN_KEY || "");
  const adminSigner = provider.getSigner(admin.address);
  const amount = await provider.getBalance(admin.address);
  // const amount = await provider.getBalance(process.env.DEPOSIT_CONTRACT ?? "");
  console.log("POOH: ", amount.toString());
  // console.log("POOH");
}

  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
