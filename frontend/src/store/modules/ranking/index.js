import ranking from "./ranking";

const state = {
  ranking: [],
  isLoading: true,
};

export default {
  namespaced: true,
  state,
  actions: ranking.actions,
  getters: ranking.getters,
  mutations: ranking.mutations,
};
