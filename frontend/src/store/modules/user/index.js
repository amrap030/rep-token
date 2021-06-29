import user from "./user";

const state = {
  user: {
    address: "",
    network: "",
    ethBalance: "",
    repBalance: "",
    web3: "",
    predictionsDB: "",
    repToken: "",
  },
};

export default {
  namespaced: true,
  state,
  actions: user.actions,
  getters: user.getters,
  mutations: user.mutations,
};
