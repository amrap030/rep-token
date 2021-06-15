import Web3 from "web3";
import { store } from "../main.js";

const loadData = async (web3) => {
  const [accounts, networkId, block] = await Promise.all([
    web3.eth.requestAccounts(),
    web3.eth.net.getId(),
    web3.eth.getBlockNumber(),
  ]);
  const ethBalance = await web3.eth.getBalance(accounts[0]);
  store.dispatch("user/initUser", {
    address: accounts[0],
    network: networkId,
    ethBalance: ethBalance,
    repBalance: 0,
    web3: web3,
  });
  store.commit("eth/SET_ETH", {
    block,
  });
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
  window.ethereum.on("accountsChanged", () => {
    loadData(web3);
  });
  window.ethereum.on("chainChanged", () => {
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
