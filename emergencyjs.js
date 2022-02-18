const CardanocliJs = require("cardanocli-js");
const baseDir = "/Users/amareswarreddy/Downloads/Terminal_Folder/"
//Change to Mainet
const shelleyGenesisPath = baseDir + "configuration/cardano/mainnet-shelley-genesis.json";
const cliPath = baseDir + "cardano-cli"
const socketPath = "/Users/amareswarreddy/Library/Application Support/Daedalus Mainnet/cardano-node.socket"

const cardanocliJs = new CardanocliJs({ shelleyGenesisPath ,socketPath ,cliPath});


const sendTransaction = (sender, receiver, adaAmount) => {
    // create raw transaction
    let txInfo = {
      txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
      txOut: [
        {
          address: sender.paymentAddr,
          value: {
            lovelace: sender.balance().value.lovelace - cardanocliJs.toLovelace(adaAmount)
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
}


j = 100
while(true){
    try { 
        let  senderwallet = "wallet"+j
        let rj = j + 30
        let receiverwallet = "wallet"+rj
        let receiverAddress = cardanocliJs.wallet(receiverwallet).paymentAddr
        console.log(receiverAddress)
        sendTransaction(cardanocliJs.wallet(senderwallet), receiverAddress, 63)
        console.log(j)
        j = j + 1
    }
    catch(err){
    //console.log(err)
    }
}


