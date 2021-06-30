import Web3 from "web3";
import { store } from "../main.js";
import predictionsDBHelper from "../composables/usePredictionsDB.js";
import repTokenHelper from "../composables/useRepToken.js";

const initWeb3 = () => {
  const { setPredictionsDBAbi } = predictionsDBHelper();
  const { setRepTokenAbi } = repTokenHelper();

  const loadBlockchainData = async (web3) => {
    await store.dispatch("user/initUser", web3);
    setPredictionsDBAbi();
    setRepTokenAbi();
  };

  // event handlers
  const listen = (web3) => {
    web3.currentProvider.on("accountsChanged", (address) => {
      if (address[0]) {
        loadBlockchainData(web3);
      } else {
        store.commit("user/RESET_USER");
      }
    });
    web3.currentProvider.on("chainChanged", () => {
      loadBlockchainData(web3);
    });
    web3.eth.subscribe("newBlockHeaders").on("data", async (block) => {
      store.commit("eth/SET_ETH", {
        block: block.number,
      });
    });
  };

  const init = () => {
    let web3 = null;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.ethereum.currentProvider);
    } else {
      // browser has no wallet, please install
      console.log("Please install Metamask!");
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      web3 = new Web3(provider);
    }
    loadBlockchainData(web3);
    listen(web3);
  };

  return { init };
};

export default initWeb3;

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
