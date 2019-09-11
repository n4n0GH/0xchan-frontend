<template>
	<div class="mt-4 pl-1">
		<hr>
		<transition name="fade" mode="out-in">
			<button class="btn btn-block btn-outline-chan" @click="login()" v-if="!getLogin"><i class="fab fa-ethereum"></i> Login</button>
			<router-link tag="button" class="btn btn-block btn-outline-chan-red" :to="{name: 'account'}" v-if="getLogin"><i class="fal fa-user-circle"></i> Account</router-link>
		</transition>
	</div>
</template>

<script>
	/* eslint-disable */
	import {mapGetters, mapActions} from 'vuex'
	import Web3 from 'web3'
	import {eBus} from '../EventBus.js'

	let web3 = null

	export default {
		data() {
			return {
			}
		},
		methods: {
			async login(){
				if(window.ethereum){
					web3 = new Web3(ethereum)
					try{
						await ethereum.enable();
						// returns nothing atm because web3.eth.accounts craps the bed for some reason
						this.setLogin('true')
					}
					catch(error){
						await console.log('Eth Auth failed')
						this.setLogin('false')
						web3 = null
					}
				}
				else if(window.web3){
					alert('You are using an outdated version of Web3. Please update your dapp browser. 0xchan does not recommend using potential security risks.')
				}
				else {
					alert('No Ethereum enabled browser detected. Please install something like Trustwallet, Metamask or similar and try again.')
				}
			},
			...mapActions([
				'setBool',
				'setLogin'
			])
		},
		computed: {
			...mapGetters([
				'getLogin'
			]),
			web3Address(){
				return window.ethereum.selectedAddress
			}
		},
		mounted(){
			eBus.$on('checkLogin', () => {
				if(this.getLogin){
					this.login()
				}
			})
		}
	}
</script>