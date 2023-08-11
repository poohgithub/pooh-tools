import { NonceManager, Wallet } from "ethers";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { deposit_contract } from "../typechain";

async function main() {
  const DepositContractFactory = await ethers.getContractFactory("deposit_contract");
  const depositContract = await DepositContractFactory.attach(process.env.DEPOSIT_CONTRACT ?? "") as deposit_contract;

  const provider = ethers.provider;
  const depositor = new Wallet(process.env.ADMIN_KEY ?? "");
  const depositSigner = new NonceManager(provider.getSigner(depositor.address));

  depositContract.connect(depositSigner).deposit({ value: ethers.parseEther("32") });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
