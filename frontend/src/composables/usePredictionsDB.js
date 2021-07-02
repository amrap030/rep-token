import { store } from "../main.js";
import PredictionsDB from "../../../src/abis/PredictionsDB.json";

let BLOCKNUMBER = 0;

const convertPredictions = (predictions) => {
  let convertedPredictions = [];
  for (let i = 0; i < predictions[0].length; i++) {
    const prediction = {
      symbol: predictions[0][i],
      date: predictions[1][i],
      unixDate: predictions[2][i],
      price: predictions[3][i],
      checked: predictions[4][i],
    };
    convertedPredictions.push(prediction);
  }
  return convertedPredictions;
};

const predictionsDBHelper = () => {
  const setPredictionsDBAbi = () => {
    const predictionsDBdata =
      PredictionsDB.networks[store.getters["user/getNetworkId"]];
    const predictionsDB = new store.getters["user/getWeb3"].eth.Contract(
      PredictionsDB.abi,
      predictionsDBdata.address
    );
    store.commit("predictionsDB/SET_ABI", predictionsDB);
  };

  const getPredictions = async () => {
    const predictions = await store.getters["predictionsDB/getAbi"].methods
      .getPredictions(store.getters["user/getAddress"])
      .call();

    return convertPredictions(predictions);
  };

  const addPrediction = async (symbol, date, unixDate, price) => {
    if (symbol && date && unixDate && price && new Date(date) > Date.now()) {
      await store.getters["predictionsDB/getAbi"].methods
        .addPrediction(symbol, date, unixDate, price)
        .send({ from: store.getters["user/getAddress"] })
        .on("transactionHash", (hash) => {
          console.log(hash);
        })
        .on("receipt", (receipt) => {
          if (receipt) {
            console.log("Prediction added");
          }
        })
        .on("error", (err) => {
          console.log(err);
        });
    }
  };

  const listenPredictionAdded = () => {
    store.getters["predictionsDB/getAbi"].events
      .PredictionAdded({
        fromBlock: "latest",
      })
      .on("data", (event) => {
        if (
          event.returnValues.predictor === store.getters["user/getAddress"] &&
          event.blockNumber !== BLOCKNUMBER
        ) {
          let prediction = {
            symbol: event.returnValues[1],
            date: event.returnValues[2],
            unixDate: Math.floor(
              new Date(event.returnValues[2]).getTime() / 1000
            ),
            price: event.returnValues[3],
            checked: false,
          };
          store.commit("user/ADD_PREDICTION", prediction);
          BLOCKNUMBER = event.blockNumber;
        }
      })
      .on("error", console.error);
  };

  return {
    addPrediction,
    setPredictionsDBAbi,
    getPredictions,
    listenPredictionAdded,
  };
};

export default predictionsDBHelper;
