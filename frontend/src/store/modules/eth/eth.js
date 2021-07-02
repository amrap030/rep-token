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
    SET_BLOCK(state, block) {
      state.block = block;
    },
    SET_GAS_PRICE(state, prices) {
      state.gasPrice = prices;
    },
  },

  actions: {},
};
