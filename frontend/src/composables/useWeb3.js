import Web3 from "web3";

export async function initWeb3() {
  if (typeof window.ethereum !== undefined) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    //const networkId = await web3.eth.net.getId();
    const balance = await web3.eth.getBalance(accounts[0]);
    //console.log(networkId);
    console.log(accounts);
    console.log(balance);
  } else if (window.web3) {
    console.log("test");
    window.web3 = new Web3(window.ethereum.currentProvider);
  } else {
    // DO NOTHING...
  }
  //   window.ethereum.on("accountsChanged", function () {
  //     initWeb3();
  //   });
  //   window.ethereum.on("chainChanged", function (networkId) {
  //     console.log("chainChanged", networkId);
  //   });
}
