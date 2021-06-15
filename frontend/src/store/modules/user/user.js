import { networks } from "../../../config/networks/config.js";

export default {
  getters: {
    getUser(state) {
      return state;
    },
    getAddress(state) {
      return state.address;
    },
    getNetwork(state) {
      const network = networks.find((network) => network.id === state.network);
      return network;
    },
    getEthBalance(state) {
      return state.ethBalance;
    },
    getRepBalance(state) {
      return state.repBalance;
    },
    getWeb3(state) {
      return state.web3;
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
  },

  actions: {
    initUser({ commit }, data) {
      if (data) {
        commit("SET_USER", data);
      }
    },
  },
};
