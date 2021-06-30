import repToken from "./repToken";

const state = {
  repToken: {
    abi: "",
  },
};

export default {
  namespaced: true,
  state,
  actions: repToken.actions,
  getters: repToken.getters,
  mutations: repToken.mutations,
};
