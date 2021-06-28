// "SPDX-License-Identifier: UNLICENSED"
pragma solidity >=0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

/**
 * Smart Contract to get off-chain data via Chainlink Oracle
 */
contract StockAPI is ChainlinkClient {
    constructor() public {
        owner = payable(msg.sender);
        setPublicChainlinkToken();
        oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
        jobId = "187bb80e5ee74a139734cac7475f3c6e";
        fee = 0.01 * 10**18; // 0.01 LINK
    }

    address payable public owner;
    address private oracle;
    address private cbContract;

    uint256 private fee;

    bytes32 private jobId;

    // modifier that requires the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // modifier that requires the contract owner
    modifier onlyRepTokenContract() {
        require(
            msg.sender == cbContract,
            "Caller is not the RepToken contract"
        );
        _;
    }

    /**
     * Function to call Twelvedata API via Chainlink oracle
     *
     * @param _cbContract - address of the calling contract for callback
     * @param _cbFunction - address of the callback function from the calling contract
     * @param _symbol - the symbol of the DAX stock (e.g. "DAI") for the url
     * @param _date - the date of the prediction, within Xetra opening hours (e.g. 2021-06-17 17:28)
     */
    function requestStockPrice(
        address _cbContract,
        bytes4 _cbFunction,
        string calldata _symbol,
        string calldata _date
    ) external onlyRepTokenContract returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            _cbContract,
            _cbFunction
        );
        request.add(
            "get",
            string(
                abi.encodePacked(
                    "https://api.twelvedata.com/time_series?symbol=",
                    _symbol,
                    "&exchange=XETR&start_date=",
                    _date,
                    "&end_date=",
                    _date,
                    "&interval=1min&apikey=d8f072b5b5314d29b71c1ff807cf4109"
                )
            )
        );
        request.add("path", "values.0.close");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Function to set the contract address that can call the StockAPI
     *
     * @param _cbContract - address of the calling contract for callback
     */
    function setCallerContract(address _cbContract) external onlyOwner {
        cbContract = _cbContract;
    }

    function kill() external onlyOwner {
        selfdestruct(owner);
    }

    function withdrawLink() external {
        LinkTokenInterface linkToken = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        require(
            linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))),
            "Unable to transfer."
        );
    }
}
