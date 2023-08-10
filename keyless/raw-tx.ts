const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;

async function sendRawTransaction() {
    const rawTransaction = {
        nonce: "0x00",
        gasPrice: "0x09184e72a000",
        gasLimit: "0x27100",
        value: "0x00",
        data: "0x60003681823780368234f58015156014578182fd5b80825250506014600cf3",
        v: "0x1b",
        r: "0x0000000001000000000000000000000001000000000000000000000000100000",
        s: "0x1212121212121212121212121212121212121212121212121212121212121212",
      }

    //   bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _message));
    //   return ecrecover(prefixedHash, _v, _r, _s);
}

sendRawTransaction().catch(console.error);
