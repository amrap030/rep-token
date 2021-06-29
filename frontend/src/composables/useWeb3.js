import Web3 from "web3";
import { store } from "../main.js";
import PredictionsDB from "../../../src/abis/PredictionsDB.json";
import RepToken from "../../../src/abis/RepToken.json";

// const convertArray = (arr) => {
//   return arr.map(function (x) {
//     return {
//       price: x["price"],
//       date: x["date"],
//       symbol: x["symbol"],
//     };
//   });
// };

const loadData = async (web3) => {
  const [accounts, networkId, block] = await Promise.all([
    web3.eth.requestAccounts(),
    web3.eth.net.getId(),
    web3.eth.getBlockNumber(),
  ]);
  const ethBalance = await web3.eth.getBalance(accounts[0]);
  const predictionsDBdata = PredictionsDB.networks[networkId];
  const predictionsDB = new web3.eth.Contract(
    PredictionsDB.abi,
    predictionsDBdata.address
  );
  const repTokenDBdata = RepToken.networks[networkId];
  const repToken = new web3.eth.Contract(RepToken.abi, repTokenDBdata.address);
  store.dispatch("user/initUser", {
    address: accounts[0],
    network: networkId,
    ethBalance: ethBalance,
    repBalance: 0,
    web3,
    predictionsDB,
    repToken,
  });
  store.commit("eth/SET_ETH", {
    block,
  });
  const test = await predictionsDB.methods.getPredictions(accounts[0]).call();
  console.log(test);
  // console.log(predictionsDB);
  // predictionsDB.events
  //   .PredictionAdded(
  //     {
  //       filter: {},
  //     },
  //     function (error, event) {
  //       console.log(error);
  //       console.log(event);
  //     }
  //   )
  //   .on("data", function (event) {
  //     console.log(event.returnValues.symbol); // same results as the optional callback above
  //   })
  //   .on("error", console.error);
  // const test = await predictionsDB.methods.getPredictions(accounts[0]).call();
  // console.log(convertArray(test));
};

export function initWeb3() {
  let web3 = null;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    loadData(web3);
  } else if (window.web3) {
    web3 = new Web3(window.ethereum.currentProvider);
    loadData(web3);
  } else {
    // browser has no wallet, please install
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    web3 = new Web3(provider);
    loadData(web3);
  }
  // event handlers
  web3.currentProvider.on("accountsChanged", (address) => {
    if (address[0]) {
      loadData(web3);
    } else {
      store.commit("user/RESET_USER");
    }
  });
  web3.currentProvider.on("chainChanged", () => {
    loadData(web3);
  });
  web3.eth.subscribe("newBlockHeaders").on("data", async (block) => {
    store.commit("eth/SET_ETH", {
      block: block.number,
    });
  });
}

// web3.currentProvider.sendAsync(
//   {
//     method: "wallet_watchAsset",
//     params: {
//       type: "ERC20",
//       options: {
//         address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
//         symbol: "DAI",
//         decimals: 18,
//       },
//     },
//     id: Math.round(Math.random() * 100000),
//   },
//   (err, added) => {
//     if (added) {
//       console.log("DAI added!");
//     } else {
//       console.log(`User didn't add DAI!`);
//     }
//   }
// );
