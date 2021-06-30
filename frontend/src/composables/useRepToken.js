import { store } from "../main.js";
import RepToken from "../../../src/abis/RepToken.json";

const repTokenHelper = () => {
  const setRepTokenAbi = () => {
    const repTokendata = RepToken.networks[store.getters["user/getNetworkId"]];
    const repToken = new store.getters["user/getWeb3"].eth.Contract(
      RepToken.abi,
      repTokendata.address
    );
    store.commit("repToken/SET_ABI", repToken);
  };

  return { setRepTokenAbi };
};

export default repTokenHelper;
