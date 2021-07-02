// "SPDX-License-Identifier: UNLICENSED"
pragma experimental ABIEncoderV2;
pragma solidity >=0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./StockAPI.sol";
import "./PredictionsDB.sol";

/**
 * Smart Contract to evaluate predictions on DAX stock prices and to mint/burn REP Tokens on success/failure
 */
contract RepToken is ChainlinkClient {
    using SafeMath for uint256;

    PredictionsDB private predictionsDB;
    StockAPI private stockAPI;

    constructor(PredictionsDB _predictionsDB, StockAPI _stockAPI) public {
        owner = payable(msg.sender);
        predictionsDB = _predictionsDB;
        stockAPI = _stockAPI;
        oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
    }

    address payable public owner;
    address private oracle;

    string public constant symbol = "REP";
    string public constant name = "REP Token";

    uint256 public totalSupply;
    uint8 public decimals = 18;

    struct Temp {
        address predictor;
        uint256 price;
        uint256 index;
        uint256 unixDate;
    }

    mapping(address => uint256) public balanceOf;
    mapping(bytes32 => Temp) private requestMapping;

    // modifier that requires the caller of the callback function to be the Chainlink oracle
    modifier recordClinkFulfillment(bytes32 _requestId) {
        require(
            msg.sender == oracle,
            "Source must be the oracle of the request"
        );
        emit ChainlinkFulfilled(_requestId);
        _;
    }

    // modifier that requires the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // modifier that requires that a predictor has at least one prediction
    modifier predictionsAvailable(address _predictor) {
        (
            string[] memory symbols,
            string[] memory dates,
            uint256[] memory unixDates,
            uint256[] memory prices,
            bool[] memory checks
        ) = predictionsDB.getPredictions(_predictor);
        uint256 observations;
        for (uint256 i = 0; i < prices.length; i = i.add(1)) {
            if (checks[i] == false && unixDates[i] < now) {
                observations = observations.add(1);
            }
        }
        require(observations > 0, "No predictions available!");
        _;
    }

    event RepTokensMinted(
        address indexed to,
        uint256 balanceOf,
        uint256 amount
    );
    event RepTokensBurned(
        address indexed from,
        uint256 balanceOf,
        uint256 amount
    );
    event PredictionEvaluated(address predictor, uint256 unixDate);

    /**
     * Function to evaluate predictions in the past to mint/burn REP Tokens from address
     */
    function evaluatePredictions() external predictionsAvailable(msg.sender) {
        (
            string[] memory symbols,
            string[] memory dates,
            uint256[] memory unixDates,
            uint256[] memory prices,
            bool[] memory checks
        ) = predictionsDB.getPredictions(msg.sender);
        for (uint256 i = 0; i < prices.length; i = i.add(1)) {
            if (unixDates[i] > now || checks[i] == true) {
                continue;
            } else {
                bytes32 requestId = stockAPI.requestStockPrice(
                    address(this),
                    this.fulfillEvaluation.selector,
                    symbols[i],
                    dates[i]
                );
                requestMapping[requestId] = Temp(
                    msg.sender,
                    prices[i],
                    i,
                    unixDates[i]
                );
            }
        }
    }

    /**
     * Function to transform a string with comma into a number without comma (e.g. 79.44000 => 7944000)
     *
     * @param _string - the string to be transformed
     * @param _decimals - the number of decimals after comma
     */
    function parseInt(string memory _string, uint256 _decimals)
        private
        pure
        returns (uint256)
    {
        bytes memory bresult = bytes(_string);
        uint256 mintt;
        bool decimalsExist;
        for (uint256 i = 0; i < bresult.length; i = i.add(1)) {
            if ((uint8(bresult[i]) >= 48) && (uint8(bresult[i]) <= 57)) {
                if (decimalsExist) {
                    if (_decimals == 0) break;
                    else _decimals = _decimals.sub(1);
                }
                mintt = mintt.mul(10);
                mintt = mintt.add(uint8(bresult[i]) - 48);
            } else if (uint8(bresult[i]) == 46) decimalsExist = true;
        }
        if (_decimals > 0) mintt = mintt.mul(10**_decimals);
        return mintt;
    }

    /**
     * Function to mint REP Tokens on successful evaluation to an address
     *
     * @param _predictor - the address of the predictor
     */
    function mint(address _predictor) private {
        uint256 amount = 1;
        totalSupply = totalSupply.add(amount);
        balanceOf[_predictor] = balanceOf[_predictor].add(amount);
        emit RepTokensMinted(_predictor, balanceOf[_predictor], amount);
    }

    /**
     * Function to burn REP Tokens on failed evaluation from an address
     *
     * @param _predictor - the address of the predictor
     */
    function burn(address _predictor) private {
        uint256 amount = 1;
        if (balanceOf[_predictor].sub(amount) < 0) {
            amount = balanceOf[_predictor];
            balanceOf[_predictor] = 0;
        } else {
            balanceOf[_predictor] = balanceOf[_predictor].sub(amount);
        }
        totalSupply = totalSupply.sub(amount);
        emit RepTokensBurned(_predictor, balanceOf[_predictor], amount);
    }

    /**
     * Callback function to fulfill Chainlink request (receives a DAX stock price for a symbol as a string)
     *
     * @param _requestId - the id of the request, generated by StockAPI contract
     * @param _close - the close price of the requested DAX stock
     */
    function fulfillEvaluation(bytes32 _requestId, bytes32 _close)
        public
        recordClinkFulfillment(_requestId)
    {
        uint256 i;
        while (i < 32 && _close[i] != 0) {
            i = i.add(1);
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _close[i] != 0; i = i.add(1)) {
            bytesArray[i] = _close[i];
        }
        uint256 close = parseInt(string(bytesArray), 5);
        if (requestMapping[_requestId].price <= close) {
            mint(requestMapping[_requestId].predictor);
        } else {
            burn(requestMapping[_requestId].predictor);
        }
        predictionsDB.setPredictionChecked(
            requestMapping[_requestId].predictor,
            requestMapping[_requestId].index
        );
        emit PredictionEvaluated(
            requestMapping[_requestId].predictor,
            requestMapping[_requestId].unixDate
        );
        delete requestMapping[_requestId];
    }

    function kill() external onlyOwner {
        selfdestruct(owner);
    }
}
