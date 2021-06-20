import quotes from "./quotes";

const state = {
  quotes: [],
};

export default {
  namespaced: true,
  state,
  actions: quotes.actions,
  getters: quotes.getters,
  mutations: quotes.mutations,
};
