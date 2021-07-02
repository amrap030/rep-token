import { networks } from "../../../config/networks/config.js";
import predictionsDBHelper from "../../../composables/usePredictionsDB.js";
import repTokenHelper from "../../../composables/useRepToken.js";

const DECIMALS = 10 ** 18;
const { getPredictions } = predictionsDBHelper();
const { getBalanceOf } = repTokenHelper();

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
    getPredictions(state) {
      return state.predictions;
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.address = user.address;
      state.network = user.network;
      state.ethBalance = user.ethBalance;
      state.web3 = user.web3;
      state.repBalance = user.repBalance;
      state.predictions = user.predictions;
    },
    SET_PREDICTIONS(state, predictions) {
      state.predictions = predictions;
    },
    SET_PREDICTION_CHECKED(state, unixDate) {
      const index = state.predictions.findIndex(
        (prediction) => prediction.unixDate === unixDate
      );
      state.predictions[index].checked = true;
    },
    SET_REP_BALANCE(state, balance) {
      state.repBalance = balance;
    },
    RESET_USER(state) {
      state.address = "";
      state.network = "";
      state.ethBalance = "";
      state.repBalance = "";
      state.web3 = "";
      state.predictions = "";
    },
    ADD_PREDICTION(state, prediction) {
      state.predictions.push(prediction);
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
        web3,
        repBalance: "",
        prediction: "",
      });
    },
    async setPredictions({ commit }) {
      try {
        const predictions = await getPredictions();
        commit("SET_PREDICTIONS", predictions);
      } catch (err) {
        commit("SET_PREDICTIONS", []);
      }
    },
    async setRepBalance({ state, commit }) {
      const repBalance = await getBalanceOf(state.address);
      if (repBalance >= 0) {
        commit("SET_REP_BALANCE", repBalance);
      }
    },
  },
};
