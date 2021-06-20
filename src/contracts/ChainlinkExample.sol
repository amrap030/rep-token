//Kovan: 0xD3C25167C618ae0aEc46df65e2420F3d686847bD
pragma solidity ^0.6.0;

import "github.com/smartcontractkit/chainlink/evm-contracts/src/v0.6/ChainlinkClient.sol";

// MyContract inherits the ChainlinkClient contract to gain the
// functionality of creating Chainlink requests
contract ChainlinkExample is ChainlinkClient {
  // Stores the answer from the Chainlink oracle
  uint256 public currentPrice;
  address public owner;
  
    // The address of an oracle - you can find node addresses on https://market.link/search/nodes
  address ORACLE_ADDRESS = 0xB36d3709e22F7c708348E225b20b13eA546E6D9c;
  // The address of the http get job that returns a uint256 
  // you can find job IDs on https://market.link/search/jobs
  string constant JOBID = "f9528decb5c64044b6b4de54ca7ea63e";
  // 1 LINK / 10 = 0.1 LINK
  uint256 constant private ORACLE_PAYMENT = 1 * LINK / 10;

  constructor() public {
    setPublicChainlinkToken();
    owner = msg.sender;
  }

  // Creates a Chainlink request with the uint256 multiplier job
  // Ideally, you'd want to pass the oracle payment, address, and jobID as parameters as well
  // This will return the one day lagged price of whatever ticker you give it
  function requestStockPrice(string memory ticker) 
    public
    onlyOwner
  {
    // newRequest takes a JobID, a callback address, and callback function as input
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(JOBID), address(this), this.fulfill.selector);
    // you'll notice you just have to add the parameters from the query of an alpha vantage call
    // we are hard coding "GLOBAL_QUOTE"
    req.add("function", "GLOBAL_QUOTE");
    req.add("symbol", ticker);
    // Uses input param (dot-delimited string) as the "path" in the request parameters
    // you'll notice this is the same as the other 
    string[] memory copyPath = new string[](2);
    copyPath[0] = "Global Quote";
    copyPath[1] = "05. price";
    req.addStringArray("copyPath", copyPath);
    // Adds an integer with the key "times" to the request parameters
    req.addInt("times", 100000000);
    // Sends the request with the amount of payment specified to the oracle
    sendChainlinkRequestTo(ORACLE_ADDRESS, req, ORACLE_PAYMENT);
  }

  // fulfill receives a uint256 data type
  function fulfill(bytes32 _requestId, uint256 _price)
    public
    // Use recordChainlinkFulfillment to ensure only the requesting oracle can fulfill
    recordChainlinkFulfillment(_requestId)
  {
    currentPrice = _price;
  }
  
  // withdrawLink allows the owner to withdraw any extra LINK on the contract
  function withdrawLink()
    public
    onlyOwner
  {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }
  
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  
   // A helper funciton to make the string a bytes32
  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }
    assembly { // solhint-disable-line no-inline-assembly
      result := mload(add(source, 32))
    }
  }
}
