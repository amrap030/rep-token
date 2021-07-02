import { store } from "../main.js";
import RepToken from "../../../src/abis/RepToken.json";

const getPastEvents = async (event, value) => {
  const events = await store.getters["repToken/getAbi"].getPastEvents(event, {
    fromBlock: 0,
    toBlock: "latest",
  });
  const addresses = events
    .map((item) => item.returnValues["to"] || item.returnValues["from"])
    .filter((value, index, self) => self.indexOf(value) === index);
  return addresses.map((address) => ({
    address,
    balance: Number(
      events.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.returnValues[value]),
        0
      )
    ),
  }));
};

const repTokenHelper = () => {
  const setRepTokenAbi = (web3) => {
    const repTokendata = RepToken.networks[4];
    const repToken = new web3.eth.Contract(RepToken.abi, repTokendata.address);
    store.commit("repToken/SET_ABI", repToken);
  };

  const getBalanceOf = async (address) => {
    const balance = await store.getters["repToken/getAbi"].methods
      .balanceOf(address)
      .call();
    return balance;
  };

  const getMintBurnHistory = async () => {
    const minted = await getPastEvents("RepTokensMinted", "amount");
    const burned = await getPastEvents("RepTokensBurned", "balanceOf");
    let ranking = [];
    minted.forEach((mintedItem) => {
      const amountBurned = burned.find(
        (burnedItem) => burnedItem.address === mintedItem.address
      ).balance;
      ranking.push({
        address: mintedItem.address,
        balance: mintedItem.balance - amountBurned,
      });
    });
    store.commit("ranking/SET_RANKING", ranking);
    store.commit("ranking/SET_IS_LOADING", false);
  };

  const listenRepTokensMinted = () => {
    store.getters["repToken/getAbi"].events
      .RepTokensMinted()
      .on("data", (event) => {
        if (event.returnValues.to === store.getters["user/getAddress"]) {
          store.commit("user/SET_REP_BALANCE", event.returnValues.balanceOf);
          store.commit("notifications/ADD_NOTIFICATION", {
            status: "Success",
            message: `You earned ${
              event.returnValues.balanceOf - store.getters["user/getRepBalance"]
            } REP Tokens!`,
          });
          setTimeout(() => {
            store.commit("notifications/REMOVE_NOTIFICATION");
          }, 1000 * 5);
          store.commit("transactions/SET_IS_EVALUATING", false);
        }
        const index = store.getters["ranking/getRanking"].findIndex(
          (rank) => rank.address === event.returnValues.from
        );
        if (index >= -1) {
          store.getters["ranking/getRanking"][index].balance =
            event.returnValues.balanceOf;
        } else {
          store.commit("ranking/ADD_USER", {
            address: event.returnValues.from,
            balance: event.returnValues.balanceOf,
          });
        }
      })
      .on("error", console.error);
  };

  const listenRepTokensBurned = () => {
    store.getters["repToken/getAbi"].events
      .RepTokensBurned()
      .on("data", (event) => {
        if (event.returnValues.from === store.getters["user/getAddress"]) {
          store.commit("user/SET_REP_BALANCE", event.returnValues.balanceOf);
          store.commit("notifications/ADD_NOTIFICATION", {
            status: "Failure",
            message: `You burned ${
              store.getters["user/getRepBalance"] - event.returnValues.balanceOf
            } REP Tokens!`,
          });
          setTimeout(() => {
            store.commit("notifications/REMOVE_NOTIFICATION");
          }, 1000 * 5);
          store.commit("transactions/SET_IS_EVALUATING", false);
        }
        const index = store.getters["ranking/getRanking"].findIndex(
          (rank) => rank.address === event.returnValues.from
        );
        if (index >= -1) {
          store.getters["ranking/getRanking"][index].balance =
            event.returnValues.balanceOf;
        } else {
          store.commit("ranking/ADD_USER", {
            address: event.returnValues.from,
            balance: event.returnValues.balanceOf,
          });
        }
      })
      .on("error", console.error);
  };

  const listenPredictionEvaluated = () => {
    store.getters["repToken/getAbi"].events
      .PredictionEvaluated()
      .on("data", (event) => {
        console.log(event);
        if (event.returnValues.predictor === store.getters["user/getAddress"]) {
          store.commit(
            "user/SET_PREDICTION_CHECKED",
            event.returnValues.unixDate,
            event.returnValues.symbol,
            event.returnValues.price
          );
        }
      })
      .on("error", console.error);
  };

  const evaluatePredictions = () => {
    store.getters["repToken/getAbi"].methods
      .evaluatePredictions()
      .send({ from: store.getters["user/getAddress"] })
      .on("transactionHash", (hash) => {
        store.commit("transactions/ADD_TRANSACTION", hash);
        store.commit("transactions/SET_IS_EVALUATING", true);
      })
      .on("receipt", (receipt) => {
        if (receipt) {
          store.commit(
            "transactions/REMOVE_TRANSACTION",
            receipt.transactionHash
          );
          store.dispatch("user/setEthBalance", store.getters["web3/getWeb3"]);
        }
      })
      .on("error", (err) => {
        console.log(err);
      });
  };

  return {
    setRepTokenAbi,
    getBalanceOf,
    listenRepTokensMinted,
    listenRepTokensBurned,
    listenPredictionEvaluated,
    evaluatePredictions,
    getMintBurnHistory,
  };
};

export default repTokenHelper;
