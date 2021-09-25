# NFT Profile Auction

This dapp provides an interface for the [ProfileAuction ERC721 contract](https://rinkeby.etherscan.io/address/0x7d4dde9418f2c2d2d895c09e81155e1ab08ae236#writeProxyContract)

Users can place bids for untaken NFT.com profiles, e.g `johnny` for `NFT.com/johnny`

The bids are denominated using [NFT.com ERC20 token](https://rinkeby.etherscan.io/address/0x38E5F095e1a4Bb02c87cb56E2b204E00f3bE5f8d#readProxyContract)

Rinkeby testnet deploy: https://nft-profile-auction.vercel.app/

## The Graph

[The Graph](https://thegraph.com/docs/developer/quick-start) is used to index `ProfileAuction` contract `NewBid` events.

## Apollo

[Apollo] codegen provide static typing for the results of [Apollo Client](https://www.apollographql.com/docs/react) queries that hit The Graph.

## TypeChain

[Typechain](https://github.com/ethereum-ts/TypeChain) generates TypeScript bindings for `ProfileAuction` and `NftToken` contracts.

## Ethers.js

[Ethers](https://docs.ethers.io/) library is used to interact with the blockchain.

## Styling

[Tailwind](https://tailwindcss.com/) is used for layout, and [Ant Design](https://ant.design/) for UI components.

## TypeScript

All code is statically typed with TypeScript.

## Local dev

1. `yarn`
2. `yarn start`
