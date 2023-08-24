import { NonceManager, Wallet } from "ethers";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { DepositContract } from "../typechain-types";

async function main() {
  const DepositContractFactory = await ethers.getContractFactory("DepositContract");
  const depositContract = await DepositContractFactory.attach(process.env.DEPOSIT_CONTRACT ?? "") as DepositContract;

  const provider = ethers.provider;
  const depositor = new Wallet(process.env.ADMIN_KEY ?? "");
  const depositSigner = new NonceManager(await provider.getSigner(depositor.address));

  const result = await depositContract.connect(depositSigner).get_deposit_root();
  console.log("Deposit Root:", result.toString());
  const result2 = await depositContract.connect(depositSigner).get_deposit_count();
  console.log("Deposit Count:", result2.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
