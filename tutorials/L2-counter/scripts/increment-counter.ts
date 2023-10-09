import { BigNumber, Contract, ethers, Wallet } from "ethers";
import { Provider, utils } from "zksync-web3";
const GOVERNANCE_ABI = require("./governance.json");
const GOVERNANCE_ADDRESS = "0xAe9Bc22B80D98aD3350a35118F723d36d8E4e141";
const COUNTER_ABI = require("./counter.json");
const COUNTER_ADDRESS = "0xD87ecB909261e1a4ef15E4D9F68DcC3F0C25ec50";

async function main() {
  // Enter your Ethereum L1 provider RPC URL.
  const l1Provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  // Set up the Governor wallet to be the same as the one that deployed the Governance contract.
  const wallet = new ethers.Wallet("0xd7912c64125d466be55d2ac220834571a39ff9abeb9ad6dfb6afe9a3a433ba7d", l1Provider);
  // Set a constannt that accesses the Layer  contract.
  const govcontract = new Contract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, wallet);

  // Initialize the L2 provider
  const l2Provider = await new Provider("http://localhost:3050");
  // Get the current address of the zkSync L1 bridge
  const zkSyncAddress = await l2Provider.getMainContractAddress();
  // Get the `Contract` object of the zkSync bridge
  const zkSyncContract = new Contract(zkSyncAddress, utils.ZKSYNC_MAIN_ABI, wallet);

  // Encoding the L2 transaction id done in the same way as it is done on Ethereum.
  // Use an Interface which gives access to the contract functions.
  const couterInterface = new ethers.utils.Interface(COUNTER_ABI);
  const data = couterInterface.encodeFunctionData("increment", []);

  // The price of an L2 transaction depends on the gas price used.
  // You should explicitly fetch the gas price before making the call.
  const gasPrice = await l1Provider.getGasPrice();

  // Defind a constant for gas limit wich estimates the limit for the L2 to L2 transaction.
  const gasLimit = await l2Provider.estimateL1ToL2Execute({
    contractAddress: COUNTER_ADDRESS,
    calldata: data,
    caller: utils.applyL1ToL2Alias(GOVERNANCE_ADDRESS),
  });
  // baseCost takes the price and limit and formats the total in wei.
  // For more information on `REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT`,
  // se the [fee model document](../../refrence/fee-model.md).
  const baseCost = await zkSyncContract.l2TransactionBaseCost(gasPrice, 
    gasLimit, utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT);

  // !! If you don't include the gasPrice and baseCost in the transaction, a re-estimation of fee may generate errors.
  const tx = await govcontract.callZkSync(zkSyncAddress, COUNTER_ADDRESS, data, gasLimit, utils.REQUIRED_L1_TO_L2_GAS_PER_PUBDATA_LIMIT, {
    // Pass the necessary ETH `value` to cover the fee for the operation 
    value: baseCost,
    gasPrice,
  });

  // Wait until the L1 tx is complete.
  await tx.wait();

  // Get the TransactionResponse object for the L2 transaction corresponding to the execution call.
  const l2Response = await l2Provider.getL2TransactionFromPriorityOp(tx);

  // Output the receipt of the L2 transaction corresponding to the call to the counter contract.
  const l2Receipt = await l2Response.wait();
  console.log(l2Receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
