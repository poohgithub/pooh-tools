import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { DepositContract } from "../typechain-types";

async function main() {
  const provider = ethers.provider;
  const amount = await provider.getBalance(process.env.DEPOSIT_CONTRACT ?? "");
  console.log("POOH: ", amount.toString());
}

  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });