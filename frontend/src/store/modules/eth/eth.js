export default {
  getters: {
    getBlock(state) {
      return state.block;
    },
    getGasPrice(state) {
      return state.gasPrice;
    },
  },

  mutations: {
    SET_ETH(state, payload) {
      state.block = payload.block;
      state.gasPrice = payload.gasPrice;
    },
  },

  actions: {},
};
