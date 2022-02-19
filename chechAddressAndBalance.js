const CardanocliJs = require("cardanocli-js");
const baseDir = "/Users/amareswarreddy/Downloads/Terminal_Folder/"
//Change to Mainet
const shelleyGenesisPath = baseDir + "configuration/cardano/mainnet-shelley-genesis.json";
const cliPath = baseDir + "cardano-cli"
const socketPath = "/Users/amareswarreddy/Library/Application Support/Daedalus Mainnet/cardano-node.socket"

const cardanocliJs = new CardanocliJs({ shelleyGenesisPath ,socketPath ,cliPath});


//wallets = ["Amar", "Srinu", "Chandh", "Usha","wallet5","wallet6","wallet7","wallet8","wallet9","wallet10","wallet11","wallet12","wallet13","wallet14","wallet15","wallet16","wallet17","wallet18","wallet19","wallet20","wallet21"]
//wallets = ["wallet9", "wallet18", "wallet186", "wallet249", "wallet121"]


// wallets = ["wallet100", "wallet114"]

// for(i in wallets){
//     let  wallet = wallets[i]
//     console.log(wallet)
// console.log(cardanocliJs.wallet(wallet).paymentAddr)
// //console.log(cardanocliJs.wallet(wallet).balance())
// console.log(cardanocliJs.toAda(cardanocliJs.wallet(wallet).balance().value.lovelace))
// }


for(let i =100; i<180; i++){
let  wallet = "wallet"+i
console.log(wallet)
console.log(cardanocliJs.wallet(wallet).paymentAddr)
//console.log(cardanocliJs.wallet(wallet).balance())
console.log(cardanocliJs.toAda(cardanocliJs.wallet(wallet).balance().value.lovelace))
}
