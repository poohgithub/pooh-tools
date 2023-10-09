import { Contract, Provider } from "zksync-web3";

const COUNTER_ADDRESS = "0xD87ecB909261e1a4ef15E4D9F68DcC3F0C25ec50";
const COUNTER_ABI = require("./counter.json");

async function main() {
  // Initialize the provider
  const l2Provider = new Provider("http://localhost:3050");

  const counterContract = new Contract(COUNTER_ADDRESS, COUNTER_ABI, l2Provider);

  const value = (await counterContract.value()).toString();
  console.log(`Current counter value is ${value}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});