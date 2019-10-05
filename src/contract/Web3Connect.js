import Web3 from 'web3'

let cusWeb3

if(window.ethereum){
	let instance = new Web3(window.ethereum)
	try{
		window.ethereum.enable()
		cusWeb3 = instance
	} catch(error){
		alert('Could not log in.')
	}
} else if(window.web3) {
	alert('You are using an outdated version of Web3. Please update your dapp browser. 0xchan does not recommend using potential security risks.')
} else {
	alert('No Ethereum enabled browser detected. Please install something like Trustwallet, Metamask or similar and try again.')
}

export default cusWeb3