# Indeeded

A decentralized real estate marketplace using ZoKrates (zero knowledge proofs) and OpenSea (non-fungible token marketplace).

## Rinkeby Deployment

Contracts: [SolnSquareVerifier](https://rinkeby.etherscan.io/address/0xE1E49F3E07EB440F8245031E37ed40058831F289), [SquareVerifier](https://rinkeby.etherscan.io/address/0xdF7C835BfdD0874599281DFc9f320f3f52bB35c9)

ABI: [/abi.json](abi.json)

[OpenSea Storefront link](https://rinkeby.opensea.io/accounts/0x0e8c9f0913b7edb81f404994391a5b7d98a3b552)

## Getting Started Locally

1. Run `npm install` in the root directory
2. Run `ganache-cli -m "apple elevator enjoy audit little market slam siren rookie slide alone great"` to start a local blockchain server.
3. Open a new terminal and run `truffle migrate` to compile and deploy locally.
4. The contract ABIs can now be seen in `eth-contracts/build/contracts`.

## Testing

To run truffle tests:

`cd eth-contracts && truffle test`

## Deployment

1. Create a `.env` file within `/eth-contracts` and add the following:

```
MNENOMIC=
INFURA_KEY=
```

2. Ensure that `eth-contracts/truffle-config.js` matches the desired deployment network and network configurations.

3. Run `truffle migrate` with the --network flag on the desired network.

# Project Resources

- [Truffle Framework](https://truffleframework.com/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
- [Open Zeppelin ](https://openzeppelin.org/)
- [Docker](https://docs.docker.com/install/)
- [ZoKrates](https://github.com/Zokrates/ZoKrates)
