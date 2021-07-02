export default {
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },

  mutations: {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state) {
      state.notifications.splice(0, 1);
    },
  },

  actions: {},
};
