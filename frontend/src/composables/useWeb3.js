import Web3 from "web3";
import { store } from "../main.js";
import predictionsDBHelper from "../composables/usePredictionsDB.js";
import repTokenHelper from "../composables/useRepToken.js";

const initWeb3 = () => {
  const { setPredictionsDBAbi, listenPredictionAdded } = predictionsDBHelper();
  const {
    setRepTokenAbi,
    listenRepTokensMinted,
    listenRepTokensBurned,
    listenPredictionEvaluated,
    getMintBurnHistory,
  } = repTokenHelper();

  const loadBlockchainData = async (web3) => {
    await store.dispatch("user/initUser", web3);
    setPredictionsDBAbi();
    setRepTokenAbi();
    await store.dispatch("user/setPredictions");
    await store.dispatch("user/setRepBalance");
  };

  // event handlers
  const listen = (web3) => {
    web3.currentProvider.on("accountsChanged", (address) => {
      if (address[0]) {
        loadBlockchainData(web3);
      }
    });
    web3.currentProvider.on("chainChanged", () => {
      loadBlockchainData(web3);
    });
    web3.eth.subscribe("newBlockHeaders").on("data", async (block) => {
      store.commit("eth/SET_BLOCK", block.number);
    });
    getMintBurnHistory();
    listenPredictionAdded();
    listenRepTokensMinted();
    listenRepTokensBurned();
    listenPredictionEvaluated();
  };

  const init = async () => {
    let web3 = null;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.ethereum.currentProvider);
    } else {
      // browser has no wallet, please install metamask
      console.log("Please install Metamask!");
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      web3 = new Web3(provider);
    }
    await loadBlockchainData(web3);
    listen(web3);
  };

  return { init };
};

export default initWeb3;
