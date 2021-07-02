import web3 from "./web3";

const state = {
  web3: "",
};

export default {
  namespaced: true,
  state,
  actions: web3.actions,
  getters: web3.getters,
  mutations: web3.mutations,
};
