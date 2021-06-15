import { createStore } from "vuex";
import user from "../store/modules/user/index";
import eth from "../store/modules/eth/index";

const store = createStore({
  modules: {
    user,
    eth,
  },
});

export default store;
