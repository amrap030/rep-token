import eth from "./eth";

const state = {
  eth: {
    gasPrice: "",
    block: "",
  },
};

export default {
  namespaced: true,
  state,
  actions: eth.actions,
  getters: eth.getters,
  mutations: eth.mutations,
};
