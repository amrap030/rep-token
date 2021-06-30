import predictionsDB from "./predictionsDB";

const state = {
  predictionsDB: {
    abi: "",
  },
};

export default {
  namespaced: true,
  state,
  actions: predictionsDB.actions,
  getters: predictionsDB.getters,
  mutations: predictionsDB.mutations,
};
