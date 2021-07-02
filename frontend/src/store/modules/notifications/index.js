import notifications from "./notifications";

const state = {
  notifications: [],
};

export default {
  namespaced: true,
  state,
  actions: notifications.actions,
  getters: notifications.getters,
  mutations: notifications.mutations,
};
