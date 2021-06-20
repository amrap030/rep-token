//const StockPriceAPI = artifacts.require("StockPriceAPI");
const RepToken = artifacts.require("RepToken");

module.exports = async function (deployer) {
  //await deployer.deploy(StockPriceAPI);
  //const stockPriceAPI = await StockPriceAPI.deployed();

  await deployer.deploy(RepToken);
  const repToken = await RepToken.deployed();
};
