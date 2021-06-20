pragma experimental ABIEncoderV2;
pragma solidity >=0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract RepToken is ChainlinkClient {
    using SafeMath for uint256;

    constructor() public {
        owner = payable(msg.sender);
        setPublicChainlinkToken();
        oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
        jobId = "187bb80e5ee74a139734cac7475f3c6e";
        fee = 0.01 * 10**18; // 0.01 LINK
    }

    address payable public owner;
    address private oracle;

    string public constant symbol = "REP";
    string public constant name = "REP Token";

    uint256 public totalSupply;
    uint256 public volume;
    uint256 private fee;

    bytes32 private jobId;
    bytes32[] public ids;

    struct Prediction {
        address predictor;
        string symbol;
        string date;
        uint256 unixDate;
        uint256 price;
        bool checked;
    }

    mapping(address => uint256) public balanceOf;
    mapping(address => Prediction[]) public predictions;
    mapping(bytes32 => Prediction) public requestMapping;

    event PredictionAdded(
        address predictor,
        string symbol,
        string date,
        uint256 price
    );
    event RepTokensMinted(address indexed to, uint256 totalSupply);
    event RepTokensBurned(address indexed from, uint256 totalSupply);

    function addPrediction(
        string calldata _symbol,
        string calldata _date,
        uint256 _unixDate,
        uint256 _price
    ) external {
        require(
            _unixDate.div(3600).mod(24) >= 7 &&
                _unixDate.div(3600).mod(24) <= 15,
            "Insufficient date!"
        );
        if (_unixDate.div(3600).mod(24) == 15) {
            require(_unixDate.div(60).mod(60) <= 30, "Insufficient date!");
        }
        predictions[msg.sender].push(
            Prediction(msg.sender, _symbol, _date, _unixDate, _price, false)
        );
        emit PredictionAdded(msg.sender, _symbol, _date, _price);
    }

    function getPredictions(address _predictor)
        external
        view
        returns (Prediction[] memory)
    {
        return predictions[_predictor];
    }

    function evaluatePredictions(address _predictor) external {
        require(
            _predictor == msg.sender && predictions[_predictor].length > 0,
            "Not the predictor or no predictions!"
        );
        for (uint256 i = predictions[_predictor].length; i > 0; i = i.sub(1)) {
            if (
                predictions[_predictor][i - 1].unixDate > block.timestamp ||
                predictions[_predictor][i - 1].checked == true
            ) {
                continue;
            } else {
                bytes32 requestId =
                    requestStockPrice(
                        predictions[_predictor][i - 1].symbol,
                        predictions[_predictor][i - 1].date
                    );
                predictions[_predictor][i - 1].checked = true;
                requestMapping[requestId] = predictions[_predictor][i - 1];
                ids.push(requestId);
            }
        }
    }

    function requestStockPrice(string memory _symbol, string memory _date)
        private
        returns (bytes32 requestId)
    {
        Chainlink.Request memory request =
            buildChainlinkRequest(
                jobId,
                address(this),
                this.fulfillEvaluation.selector
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

    function parseInt(string memory _a, uint256 _b)
        private
        pure
        returns (uint256)
    {
        bytes memory bresult = bytes(_a);
        uint256 mintt;
        bool decimals;
        for (uint256 i = 0; i < bresult.length; i = i.add(1)) {
            if ((uint8(bresult[i]) >= 48) && (uint8(bresult[i]) <= 57)) {
                if (decimals) {
                    if (_b == 0) break;
                    else _b = _b.sub(1);
                }
                mintt = mintt.mul(10);
                mintt = mintt.add(uint8(bresult[i]) - 48);
            } else if (uint8(bresult[i]) == 46) decimals = true;
        }
        if (_b > 0) mintt = mintt.mul(10**_b);
        return mintt;
    }

    function mint(address _predictor) private {
        totalSupply = totalSupply.add(1);
        balanceOf[_predictor] = balanceOf[_predictor].add(1);
        emit RepTokensMinted(msg.sender, totalSupply);
    }

    function burn(address _predictor) private {
        totalSupply = totalSupply.sub(1);
        balanceOf[_predictor] = balanceOf[_predictor].sub(1);
        emit RepTokensBurned(msg.sender, totalSupply);
    }

    function fulfillEvaluation(bytes32 _requestId, bytes32 _close)
        public
        recordChainlinkFulfillment(_requestId)
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
        volume = close;
        if (requestMapping[_requestId].price <= close) {
            mint(requestMapping[_requestId].predictor);
        } else {
            burn(requestMapping[_requestId].predictor);
        }
        delete requestMapping[_requestId];
    }

    function kill() public {
        require(msg.sender == owner, "Not the contract creator.");
        selfdestruct(owner);
    }

    function withdrawLink() external {
        LinkTokenInterface linkToken =
            LinkTokenInterface(chainlinkTokenAddress());
        require(
            linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))),
            "Unable to transfer."
        );
    }
}
