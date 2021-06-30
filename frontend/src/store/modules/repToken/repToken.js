export default {
  getters: {
    getAbi(state) {
      return state.abi;
    },
  },

  mutations: {
    SET_ABI(state, payload) {
      state.abi = payload;
    },
  },

  actions: {},
};
