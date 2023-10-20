import { ethers } from "hardhat";
import Web3 from "web3";

async function main() {
  const web3 = new Web3('http://localhost:8545');

const senderAddress = '0x1234567890abcdef1234567890abcdef12345678';
const recipientAddress = '0x9876543210abcdef9876543210abcdef98765432';
const amount = web3.utils.toWei('1', 'ether');
const gasPrice = web3.utils.toWei('10', 'gwei');
const gasLimit = 21000;
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

if (!senderAddress || !recipientAddress || !amount || !gasPrice || !gasLimit) {
  throw new Error('One or more required parameters are undefined');
}

const transactionData = {
  from: senderAddress,
  to: recipientAddress,
  value: amount,
  gasPrice: gasPrice,
  gasLimit: gasLimit,
};

if (!privateKey) {
  throw new Error('Private key is undefined');
}

const signedTransactionData = await web3.eth.accounts.signTransaction(transactionData, privateKey as string);

const transactionHash = await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction as string);

console.log(transactionHash);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});