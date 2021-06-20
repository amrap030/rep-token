const PredictionsDB = artifacts.require("PredictionsDB");

require("Chai").use(require("chai-as-promised")).should;

contract("PredictionsDB", (accounts) => {
  describe("Deyploment Test", async () => {
    it("has name", async () => {
      let predictionsDB = await PredictionsDB.new();
      const name = await predictionsDB.name();
      assert.equal(name, "PredictionsDB");
    });
  });
});
