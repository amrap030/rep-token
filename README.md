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

- **PredictionsDB**: 0x5144bD1d5519E9F3a6EDac19db7681E4E7d99C42
- **StockAPI**: 0x8322d43Ea3Fb6D6CB30Cd2bf014661E40F60fD43
- **RepToken**: 0x8BB90E8ED1B2dec353CC0c80c49C6857a2EE1d94

You can view these contracts on [https://rinkeby.etherscan.io/address/{address of contract}](https://rinkeby.etherscan.io/address/)
