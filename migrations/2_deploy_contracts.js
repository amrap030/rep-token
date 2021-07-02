const StockAPI = artifacts.require("StockAPI");
const PredictionsDB = artifacts.require("PredictionsDB");
const RepToken = artifacts.require("RepToken");

module.exports = async function (deployer) {
  await deployer.deploy(PredictionsDB);
  const predictionsDB = await PredictionsDB.deployed();

  await deployer.deploy(StockAPI);
  const stockAPI = await StockAPI.deployed();

  await deployer.deploy(RepToken, predictionsDB.address, stockAPI.address);
  const repToken = await RepToken.deployed();

  await stockAPI.setCallerContract(repToken.address);
  await predictionsDB.setCallerContract(repToken.address);
};
