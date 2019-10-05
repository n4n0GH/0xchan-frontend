import IPFS from 'ipfs-http-client'

/**
 * we're using Infura's IPFS node for
 * testnet so we don't have to care
 * about our own network infrastructure
 * being a total pile of shit lmfao <3
 */

const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
export default ipfs