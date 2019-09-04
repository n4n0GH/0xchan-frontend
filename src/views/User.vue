<template>
	<div class="row">
		<div class="pr-0 w-100">
			<div class="card card-chan mb-2">
				<div class="card-header bg-chan p-0 border-0">
					<div class="row">
						<div class="col pl-4 py-1">
							<p class="mb-0 font-chan-red">
								<span class="post-subject font-weight-bold text-mono">
									web3.eth.getAccount({{wallet}})
								</span>
							</p>
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
							<p class="text-center">
								<button class="btn btn-outline-chan-red text-mono">Buy ZCH</button>
							</p>
						</div>
						<div class="col-4">
							<p class="lead text-center">
								Stake Balance
							</p>
							<p class="text-center text-mono">
								2 <i class="fab fa-ethereum"></i>
							</p>
							<p class="text-center">
								<button class="btn btn-outline-chan-red text-mono">Manage</button>
							</p>
						</div>
						<div class="col-4">
							<p class="lead text-center">
								Open Rewards
							</p>
							<p class="text-center text-mono">
								1333.4156 <i class="fab fa-ethereum"></i>
							</p>
							<p class="text-center">
								<button class="btn btn-outline-chan text-mono">Withdraw</button>
							</p>
						</div>
					</div>
					<hr>
					<div class="row">
						<div class="col">
							<p class="display-4 text-center">Stake Overview</p>
							<p class="font-chan-normal small text-center">Staking ETH allows you to take part in the lively discussions on 0xchan and receive your share of the distributed rewards system.</p>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<p class="lead mb-0">Text Posting</p>
							<p class="small font-chan-normal">0.5 ETH required to post text content.</p>
						</div>
						<div class="col-3">
							<button class="btn btn-outline-chan-red btn-block text-mono">Activate</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<p class="lead mb-0">Media Posting</p>
							<p class="small font-chan-normal">1.5 ETH required to post media content. Requires Text Posting to be active as well.</p>
						</div>
						<div class="col-3">
							<button class="btn btn-outline-chan-red btn-block text-mono">Activate</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<p class="lead mb-0">Retrieve Stake</p>
							<p class="small font-chan-normal">Withdraw your stake to your wallet. Requires you to make no post in the past 24 hours and not have any open disputes.</p>
						</div>
						<div class="col-3">
							<button class="btn btn-outline-chan btn-block text-mono">Withdraw</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import Web3 from 'web3'

	let web3 = new Web3(Web3.givenProvider)

	export default {
		data(){
			return{
				ethereum: window.ethereum,
			}
		},
		computed: {
			wallet(){
				return this.ethereum.selectedAddress
			}
		}
	}
</script>