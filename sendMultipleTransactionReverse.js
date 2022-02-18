
const CardanocliJs = require("cardanocli-js");
const baseDir = "/home/ubuntu/cardano-node/"
//Change to Mainet
const shelleyGenesisPath = baseDir + "mainnet-config/mainnet-shelley-genesis.json";
const cliPath = baseDir + "cardano-cli";
const cardanocliJs = new CardanocliJs({ shelleyGenesisPath, cliPath});

const sendTransaction = (sender, receiver, adaAmount) => {
     // create raw transaction
 try
  { 
   let txInfo = {
      txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
      txOut: [
        {
          address: sender.paymentAddr,
          value: {
            lovelace: sender.balance().value.lovelace - cardanocliJs.toLovelace(adaAmount),
          },
        }, //value going back to sender
        { address: receiver, value: { lovelace: cardanocliJs.toLovelace(adaAmount) } }, //value going to receiver
      ],
      //metadata: { 1: { cardanocliJs: "First Metadata from cardanocli-js" } },
    };
    let raw = cardanocliJs.transactionBuildRaw(txInfo);

    //calculate fee
    let fee = cardanocliJs.transactionCalculateMinFee({
      ...txInfo,
      txBody: raw,
      witnessCount: 1,
    });

    //pay the fee by subtracting it from the sender utxo
    txInfo.txOut[0].value.lovelace -= fee;

    //create final transaction
    let tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee });

    //sign the transaction
    let txSigned = cardanocliJs.transactionSign({
      txBody: tx,
      signingKeys: [sender.payment.skey],
    });
    //broadcast transaction
    let txHash = cardanocliJs.transactionSubmit(txSigned);
    console.log("TxHash: " + txHash);
 }catch(err){
console.log(err)
}
}



let receiverAddress =  process.argv[2]
console.log(receiverAddress)
let adaAmount = process.argv[3]
try {
wallets = ["wallet10", "wallet9", "wallet8", "wallet7", "wallet6", "wallet5", "Srinu", "Amar", "Usha", "Chandh"]
for (let i in wallets) {
let wallet = wallets[i]
sendTransaction(cardanocliJs.wallet(wallet), receiverAddress, adaAmount)
}
}
catch(err){
console.log(err)
}
