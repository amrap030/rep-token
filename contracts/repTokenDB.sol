pragma solidity ^0.8.5;

contract repTokenDB{

    struct stockPrediction{
        address publisher;
        uint entryTime;
        string stockName;
        string futureStockValue;
        string dateForForecast;
    }

    mapping(address => stockPrediction[]) stockPredictionsByAddress;

    function addEntry (string memory stockName, string memory futureStockValue, string memory dateForForecast) public {
        stockPrediction memory _stockPrediction = stockPrediction(msg.sender,block.timestamp,stockName,futureStockValue,dateForForecast);
        stockPredictionsByAddress[msg.sender].push(_stockPrediction);
    }

    function getAllEntries () view public returns (stockPrediction[] memory) {
        return(stockPredictionsByAddress[msg.sender]);
    }

    /******Testing part -- TODO Remove later******/
    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly { // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }

    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}
