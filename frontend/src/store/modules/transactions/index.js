import transactions from "./transactions";

const state = {
  transactions: [],
  isEvaluating: false,
};

export default {
  namespaced: true,
  state,
  actions: transactions.actions,
  getters: transactions.getters,
  mutations: transactions.mutations,
};
