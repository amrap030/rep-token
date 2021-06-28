// SPDX-License-Identifier: UNLICENSED
pragma experimental ABIEncoderV2;
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * Smart Contract to store predictions for DAX stocks
 */
contract PredictionsDB {
    using SafeMath for uint256;

    // Payable constructor can receive Ether
    constructor() public {
        owner = payable(msg.sender);
    }

    struct Prediction {
        address predictor;
        string symbol;
        string date;
        uint256 unixDate;
        uint256 price;
        bool checked;
    }

    // Payable address can receive Ether
    address payable public owner;
    mapping(address => Prediction[]) public predictions;

    // modifier that requires a date in unix format to be within Xetra opening hours
    modifier withinOpeningHours(uint256 _unixDate) {
        require(
            _unixDate.div(3600).mod(24) >= 7 &&
                _unixDate.div(3600).mod(24) <= 15 &&
                _unixDate.div(86400).add(4).mod(7) >= 1 &&
                _unixDate.div(86400).add(4).mod(7) <= 5,
            "Insufficient date!"
        );
        if (_unixDate.div(3600).mod(24) == 15) {
            require(_unixDate.div(60).mod(60) <= 30, "Insufficient date!");
        }
        _;
    }

    // modifier that requires that a predictor has at least one prediction
    modifier onlyPredictors(address _predictor) {
        require(
            predictions[_predictor].length > 0,
            "No predictions available!"
        );
        _;
    }

    // modifier that requires the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    event PredictionAdded(
        address predictor,
        string symbol,
        string date,
        uint256 price
    );

    /**
     * Function to add a prediction to the mapping predictions, only within Xetra opening hours
     *
     * @param _symbol - the symbol of the DAX stock (e.g. "DAI")
     * @param _date - the date in the future of the prediction, within Xetra opening hours (e.g. 2021-06-17 17:28)
     * @param _unixDate - same as _date but in unix format (e.g. 1623943680)
     * @param _price - real price multiplied by 100000 to get rid of comma (e.g. 79.41000 * 10000 => 7941000)
     */
    function addPrediction(
        string calldata _symbol,
        string calldata _date,
        uint256 _unixDate,
        uint256 _price
    ) external withinOpeningHours(_unixDate) {
        predictions[msg.sender].push(
            Prediction(msg.sender, _symbol, _date, _unixDate, _price, false)
        );
        emit PredictionAdded(msg.sender, _symbol, _date, _price);
    }

    /**
     * Function to get predictions from the mapping predictions
     *
     * @param _predictor - the address of the predictor
     */
    function getPredictions(address _predictor)
        external
        view
        returns (
            string[] memory,
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            bool[] memory
        )
    {
        string[] memory symbols = new string[](predictions[_predictor].length);
        string[] memory dates = new string[](predictions[_predictor].length);
        uint256[] memory unixDates = new uint256[](
            predictions[_predictor].length
        );
        uint256[] memory prices = new uint256[](predictions[_predictor].length);
        bool[] memory checks = new bool[](predictions[_predictor].length);

        for (uint256 i = 0; i < predictions[_predictor].length; i++) {
            symbols[i] = predictions[_predictor][i].symbol;
            dates[i] = predictions[_predictor][i].date;
            unixDates[i] = predictions[_predictor][i].unixDate;
            prices[i] = predictions[_predictor][i].price;
            checks[i] = predictions[_predictor][i].checked;
        }

        return (symbols, dates, unixDates, prices, checks);
    }

    function kill() external onlyOwner {
        selfdestruct(owner);
    }
}
