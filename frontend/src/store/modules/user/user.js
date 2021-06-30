import { networks } from "../../../config/networks/config.js";

const DECIMALS = 10 ** 18;

export default {
  getters: {
    getUser(state) {
      return state;
    },
    getAddress(state) {
      return state.address;
    },
    getNetworkId(state) {
      return state.network;
    },
    getNetwork(state) {
      const network = networks.find((network) => network.id === state.network);
      return network;
    },
    getEthBalance(state) {
      return Number(state.ethBalance / DECIMALS).toFixed(4);
    },
    getRepBalance(state) {
      return state.repBalance;
    },
    getWeb3(state) {
      return state.web3;
    },
    getPredictionsDB(state) {
      return state.predictionsDB;
    },
    getRepToken(state) {
      return state.repToken;
    },
  },

  mutations: {
    SET_USER(state, payload) {
      state.address = payload.address;
      state.network = payload.network;
      state.ethBalance = payload.ethBalance;
      state.repBalance = payload.repBalance;
      state.web3 = payload.web3;
    },
    RESET_USER(state) {
      state.address = "";
      state.network = "";
      state.ethBalance = "";
      state.repBalance = "";
      state.web3 = "";
      state.predictionsDB = "";
      state.repToken = "";
    },
  },

  actions: {
    async initUser({ commit }, web3) {
      const [accounts, networkId] = await Promise.all([
        web3.eth.requestAccounts(),
        web3.eth.net.getId(),
      ]);
      const ethBalance = await web3.eth.getBalance(accounts[0]);
      commit("SET_USER", {
        address: accounts[0],
        network: networkId,
        ethBalance: ethBalance,
        repBalance: 0,
        web3,
      });
    },
  },
};
