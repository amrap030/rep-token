import { createStore } from "vuex";
import user from "../store/modules/user/index";
import eth from "../store/modules/eth/index";
import quotes from "../store/modules/quotes/index";
import repToken from "../store/modules/repToken/index";
import predictionsDB from "../store/modules/predictionsDB/index";

const store = createStore({
  modules: {
    user,
    eth,
    quotes,
    repToken,
    predictionsDB,
  },
});

export default store;
