export default {
  getters: {
    getQuotes(state) {
      return state;
    },
  },

  mutations: {
    SET_QUOTES(state, payload) {
      state.quotes = payload;
    },
  },

  actions: {},
};
