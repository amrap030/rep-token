# REP Token

## Project setup

1. Install dependencies

```
npm install
```

2. Add .env file containing the following stuff (ask @amrap030)

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

- **PredictionsDB**: 0xC2c0568aEe85DbE7cf60BCe4E054f9D298429170
- **StockAPI**: 0x136181F10E45099a0efE156D782A1DC04Bc6dF97
- **RepToken**: 0x8aCC78DE48C6158289A91Ee47f8F57eB5A520bF1

You can view these contracts on [https://rinkeby.etherscan.io/address/{address of contract}]https://rinkeby.etherscan.io/address/
