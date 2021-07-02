# REP Token

## Project setup

1. Install dependencies

```
npm install
```

2. Add .env file at the root of the repository, containing the following stuff (ask @amrap030)

```
MNEMONIC={mnemonic seed phrase of metamask}
RPC_URL=https://rinkeby.infura.io/v3/{apiKey}
ETHERSCAN_API_KEY={apiKey}
```

3. Deploy contracts on Rinkeby

```
truffle migrate --network live
```

or

```
truffle migrate --reset --network live
```

4. Verify contracts in Rinkeby

```
truffle run verify RepToken --network live
truffle run verify StockAPI --network live
truffle run verify PredictionsDB --network live
```

## Current addresses

- **PredictionsDB**: 0x2fb51803F55Df3628C6bc76d00f9a15c206ADf2F
- **StockAPI**: 0xEBe5f08154318a4D29d89f7183d1bE451ef557eC
- **RepToken**: 0x56a1c1095e76C667C3a845b3f03E3ed9E98ae2ef

You can view these contracts on [https://rinkeby.etherscan.io/address/{address of contract}](https://rinkeby.etherscan.io/address/)
