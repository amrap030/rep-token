export default {
  getters: {
    getRanking(state) {
      return state.ranking;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
  },

  mutations: {
    SET_RANKING(state, ranking) {
      state.ranking = ranking;
    },
    SET_IS_LOADING(state, value) {
      state.isLoading = value;
    },
    ADD_USER(state, user) {
      state.ranking.push(user);
    },
  },

  actions: {},
};
