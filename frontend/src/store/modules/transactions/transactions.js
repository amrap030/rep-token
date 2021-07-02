export default {
  getters: {
    getTransactions(state) {
      return state.transactions;
    },
    getIsEvaluating(state) {
      return state.isEvaluating;
    },
  },

  mutations: {
    ADD_TRANSACTION(state, hash) {
      state.transactions.push(hash);
    },
    SET_IS_EVALUATING(state, value) {
      state.isEvaluating = value;
    },
    REMOVE_TRANSACTION(state, hash) {
      const index = state.transactions.findIndex(
        (transaction) => transaction === hash
      );
      state.transactions.splice(index, 1);
    },
  },

  actions: {},
};
