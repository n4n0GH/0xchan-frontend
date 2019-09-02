<template>
	<div class="mt-4">
		<transition name="fade" mode="out-in">
			<button class="btn btn-block btn-outline-chan" @click="login()" v-if="!getLogin"><i class="fab fa-ethereum"></i> Login</button>
			<div class="card card-chan bg-chan" v-if="getLogin">
				<div class="row">
					<div class="col-3 pr-0 d-none d-xl-block">
						<img src="../../assets/identicon.png" style="max-width:100%; height:100%; object-fit: cover;" class="avatar" alt="" @click="login()">
					</div>
					<div class="col-xl-9 col-12">
						<div class="card-body p-0">
							<p class="mb-1 mt-1 text-mono text-overflow">0x7ac7bdeadcafeebeeffeed</p>
							<p class="small font-chan-imply text-mono mb-0">13.337 ZCH</p>
						</div>
						
					</div>
					
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	/* eslint-disable */
	import {mapGetters, mapActions} from 'vuex'
	import Web3 from 'web3'

	let web3
	let ethereum

	export default {
		methods: {
			async login(){
				if(window.ethereum){
					ethereum = window.ethereum
					web3 = new Web3(ethereum)
					try{
						await ethereum.enable();
						
						this.setBool('mutLogin')
					}
					catch(error){
						await console.log('Eth Auth failed')
						web3 = null
					}
				}
			},
			...mapActions([
				'setBool'
			])
		},
		computed: {
			...mapGetters([
				'getLogin'
			])
		}
	}
</script>