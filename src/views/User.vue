<template>
	<div class="container-fluid">
		<div class="row">
			<div class="pr-0 w-100">
				<div class="card card-chan mb-2">
					<div class="card-header bg-chan p-0 border-0">
						<div class="row">
							<div class="col pl-4 py-1">
								<p class="mb-0 font-chan-red font-weight-bold text-mono">
									web3.eth.getAccount({{wallet}})
								</p>
							</div>
							<div class="col-auto pr-4 pt-1">
								<p class="text-right mb-0 small text-mono">[<a href="javascript:void(0);" @click="logout()">logout</a>]</p>
							</div>
						</div>
					</div>
					<div class="card-body bg-chan-light">
						<div class="row">
							<div class="col">
								<p class="display-4 text-center">Account Overview</p>
								<p class="font-chan-normal small text-center">Check your balance, manage your stake and retrieve your rewards.</p>
							</div>
						</div>
						<div class="row">
		
							<div class="col-4">
								<p class="lead text-center">
									ZCH Balance
								</p>
								<p class="text-center text-mono">
									1333.4156 <i class="fab fa-creative-commons-zero"></i>
								</p>
								<button class="btn btn-block btn-outline-chan-red text-mono border-0 rounded-0" :class="tabComponent=='manage-zch'?'router-link-active':''" @click="tabComponent='manage-zch'"><i class="fal fa-wallet"></i> Manage ZCH</button>
							</div>
							<div class="col-4">
								<p class="lead text-center">
									Stake Balance
								</p>
								<p class="text-center text-mono">
									2 <i class="fab fa-ethereum"></i>
								</p>
									<button class="btn btn-block btn-outline-chan-red text-mono border-0 rounded-0" :class="tabComponent=='manage-stake'?'router-link-active':''" @click="tabComponent='manage-stake'"><i class="fal fa-file-signature"></i> Manage Stake</button>
							</div>
							<div class="col-4">
								<p class="lead text-center">
									Open Rewards
								</p>
								<p class="text-center text-mono">
									1333.4156 <i class="fab fa-ethereum"></i>
								</p>
									<button class="btn btn-block btn-outline-chan text-mono border-0 rounded-0"><i class="fal fa-hand-holding-heart"></i> Withdraw</button>
							</div>
						</div>
						<keep-alive>
							<transition name="fade" mode="out-in">
							<component :is="tabComponent" />
							</transition>
						</keep-alive>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import ManageStake from '../components/account/ManageStake.vue'
	import ManageZch from '../components/account/ManageZCH.vue'
	import Web3 from 'web3'
	import {mapActions} from 'vuex'

	let web3 = new Web3(Web3.givenProvider)

	export default {
		data(){
			return{
				ethereum: window.ethereum,
				tabComponent: 'manage-zch'
			}
		},
		methods: {
			...mapActions([
				'setLogout'
			]),
			tab(n){
				this.tabComponent = n
			},
			logout(){
				this.setLogout()
				this.$router.push({name: 'index'})
			}
		},
		components:{
			ManageStake,
			ManageZch
		},
		computed: {
			wallet(){
				return this.ethereum.selectedAddress
			},
		}
	}
</script>