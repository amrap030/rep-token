export default {
  getters: {
    getWeb3(state) {
      return state.web3;
    },
  },

  mutations: {
    SET_WEB3(state, web3) {
      state.web3 = web3;
    },
  },

  actions: {},
};
