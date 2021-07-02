import { store } from "../main.js";
import RepToken from "../../../src/abis/RepToken.json";

const getPastEvents = async (event, value) => {
  const events = await store.getters["repToken/getAbi"].getPastEvents(event, {
    fromBlock: 0,
    toBlock: "latest",
  });
  const addresses = events
    .map((item) => item.address)
    .filter((value, index, self) => self.indexOf(value) === index);
  return addresses.map((address) => ({
    address,
    balance: Number(
      events.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.returnValues[value],
        0
      )
    ),
  }));
};

const repTokenHelper = () => {
  const setRepTokenAbi = () => {
    const repTokendata = RepToken.networks[store.getters["user/getNetworkId"]];
    const repToken = new store.getters["user/getWeb3"].eth.Contract(
      RepToken.abi,
      repTokendata.address
    );
    store.commit("repToken/SET_ABI", repToken);
  };

  const getBalanceOf = async (address) => {
    const balance = await store.getters["repToken/getAbi"].methods
      .balanceOf(address)
      .call();
    return balance;
  };

  const getMintBurnHistory = async () => {
    await getPastEvents("RepTokensMinted", "amount");
    //const burned = await getPastEvents("RepTokensBurned", "balanceOf");
  };

  const listenRepTokensMinted = () => {
    store.getters["repToken/getAbi"].events
      .RepTokensMinted()
      .on("data", (event) => {
        if (event.returnValues.to === store.getters["user/getAddress"]) {
          store.commit("user/SET_REP_BALANCE", event.returnValues.balanceOf);
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
        }
      })
      .on("error", console.error);
  };

  const listenPredictionEvaluated = () => {
    store.getters["repToken/getAbi"].events
      .PredictionEvaluated()
      .on("data", (event) => {
        if (event.returnValues.predictor === store.getters["user/getAddress"]) {
          store.commit(
            "user/SET_PREDICTION_CHECKED",
            event.returnValues.unixDate
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
        console.log(hash);
      })
      .on("receipt", (receipt) => {
        if (receipt) {
          console.log("Predictions evaluated");
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
