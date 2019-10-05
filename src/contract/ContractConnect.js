import web3 from './Web3Connect.js'

const address = "add contract address here"
const abi = "add contract abi here"

export default new web3.eth.Contract(abi, address)