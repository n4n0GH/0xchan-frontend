# 0xchan
0xchan is a decentralized and immutable message board system on the Ethereum blockchain where users can post messages and media files. Storage of those messages is handled via IPFS and a smart contract is used to store a ledger of all messages.

A proof of stake style mechanism ensures quality content and protects the system against spam, while also incentivising users to stake their Ether.

The immutable and decentralized nature of the system allows for free speech and gives way to create truly censorship resistant and self sustaining platforms.

## Local Setup
If you want to run this interface on your own machine and maybe tweak some code, here's how to:

```
git clone https://github.com/n4n0GH/0xchan-mainnet
cd 0xchan-mainnet
npm install
npm fuckn resolve all dependency errors
npm run serve
```
Afterwards use any browser you want (although a connected Ethereum wallet is needed for interaction) and visit the address given by the CLI (usually localhost:8080)

For daily use it is recommended to use a precompiled build:
```
npm run build
```

The interface is made with VueJS, so you should also check out their documentation as well if you want to change things in this codebase.

## Connect
[![Discord](https://img.shields.io/discord/528334545683218441?color=7389D8&label=&logo=discord&logoColor=ffffff&labelColor=6A7EC2&style=for-the-badge)](https://discord.gg/v8cnd4w)

[![Twitter Follow](https://img.shields.io/twitter/follow/0xchan?color=1da1f2&label=&logo=twitter&logoColor=ffffff&labelColor=aad6f2&style=for-the-badge)](https://twitter.com/0xchan)
