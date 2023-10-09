import { utils, Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// Insert the address of the governance contract
const GOVERNANCE_ADDRESS = "0xAe9Bc22B80D98aD3350a35118F723d36d8E4e141";
const COUNTER_ADDRESS = "0xD87ecB909261e1a4ef15E4D9F68DcC3F0C25ec50";

// An example of a deploy script that will deploy and call a simple contract
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log('Running deploy script for the Counter contract');

  // Initialize the wallet
  const wallet = new Wallet("0xd7912c64125d466be55d2ac220834571a39ff9abeb9ad6dfb6afe9a3a433ba7d");

  // Create deployer object and load the artifact of the contract your want to deploy
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Counter");

  // Deposit some funcs to L2 to be able to perform deposits.
  const deploymentFee = await deployer.estimateDeployFee(artifact, [utils.applyL1ToL2Alias(wallet.address)]);
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: deploymentFee.mul(2),
  });

  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();
  
  // Deploy this contract. The returned object will be of a `Contract` type, similar to the ones in `ethers`.
  // The address of the governance is an argument of contract constructor.
  const counterContract = await deployer.deploy(artifact, [utils.applyL1ToL2Alias(GOVERNANCE_ADDRESS)]);
  console.log(`Counter contract was successfully deployed at ${counterContract.address}`);
}