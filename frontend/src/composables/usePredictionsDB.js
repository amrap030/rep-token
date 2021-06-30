import { store } from "../main.js";
import PredictionsDB from "../../../src/abis/PredictionsDB.json";

// const convertArray = (arr) => {
//   return arr.map(function (x) {
//     return {
//       price: x["price"],
//       date: x["date"],
//       symbol: x["symbol"],
//     };
//   });
// };

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
    return predictions;
  };

  const addPrediction = async (symbol, date, unixDate, price) => {
    if (symbol && date && unixDate && price) {
      await store.getters["predictionsDB/getAbi"].methods
        .addPrediction(symbol, date, unixDate, price)
        .send({ from: store.getters["user/getAddress"] })
        .on("transactionHash", (hash) => {
          console.log(hash);
        })
        .on("receipt", (receipt) => {
          console.log(receipt);
        })
        .on("error", (err) => {
          console.log(err);
        });
    }
  };

  return { addPrediction, setPredictionsDBAbi, getPredictions };
};

export default predictionsDBHelper;
