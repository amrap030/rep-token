import { createStore } from "vuex";
import user from "../store/modules/user/index";
import eth from "../store/modules/eth/index";
import quotes from "../store/modules/quotes/index";

const store = createStore({
  modules: {
    user,
    eth,
    quotes,
  },
});

export default store;
