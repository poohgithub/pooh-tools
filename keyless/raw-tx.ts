const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;

async function sendRawTransaction() {
    const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY');

    // Replace with your values
    const myAddress = 'YOUR_ADDRESS';
    const privateKey = Buffer.from('YOUR_PRIVATE_KEY', 'hex');
    const toAddress = 'RECIPIENT_ADDRESS';
    const amountInWei = web3.utils.toWei('0.1', 'ether');

    // Fetch nonce
    const nonce = await web3.eth.getTransactionCount(myAddress, 'pending');

    const rawTransaction = {
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(21000), // Standard gas limit for ether transfer
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')), // 20 gwei
        to: toAddress,
        value: web3.utils.toHex(amountInWei),
        data: '0x', // No contract data
    };

    // Sign transaction
    const tx = new EthereumTx(rawTransaction, { 'chain': 'mainnet' });
    tx.sign(privateKey);

    const serializedTransaction = tx.serialize();

    // Broadcast transaction
    const txHash = await web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'));
    console.log(`Transaction hash: ${txHash.transactionHash}`);
}

sendRawTransaction().catch(console.error);
