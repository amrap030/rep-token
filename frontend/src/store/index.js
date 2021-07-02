import { createStore } from "vuex";
import user from "../store/modules/user/index";
import eth from "../store/modules/eth/index";
import quotes from "../store/modules/quotes/index";
import repToken from "../store/modules/repToken/index";
import predictionsDB from "../store/modules/predictionsDB/index";
import ranking from "../store/modules/ranking/index";
import transactions from "../store/modules/transactions/index";
import notifications from "../store/modules/notifications/index";
import web3 from "../store/modules/web3/index";

const store = createStore({
  modules: {
    user,
    eth,
    quotes,
    repToken,
    predictionsDB,
    ranking,
    transactions,
    notifications,
    web3,
  },
});

export default store;
