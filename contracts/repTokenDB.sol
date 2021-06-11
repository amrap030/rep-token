pragma solidity >=0.5.0 <=0.6.0;  
  
contract repTokenDB{  
      
    struct stockPrediction{  
        address publisher;
        uint entryTime;
        string stockName;
        string futureStockValue;
        string dateForForecast;
    }
    mapping(uint => stockPrediction) public stockPredictions;  
    
    uint public newsCount;  
  
    function addEntry(string memory stockName, string memory futureStockValue, string memory dateForForecast) public {
        newsCount++;  
        stockPredictions[newsCount].entryTime = block.timestamp;
        stockPredictions[newsCount].publisher = msg.sender;  
        stockPredictions[newsCount].stockName = stockName;  
        stockPredictions[newsCount].futureStockValue = futureStockValue;  
        stockPredictions[newsCount].dateForForecast = dateForForecast;
    }
    
    function getEntry(uint index) public view returns (address, uint, string memory, string memory, string memory){
        return(stockPredictions[index].publisher, stockPredictions[index].entryTime, stockPredictions[index].stockName, stockPredictions[index].futureStockValue, stockPredictions[index].dateForForecast);
    }
}
