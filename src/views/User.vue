<template>
	<div class="row">
		<div class="pr-0 w-100">
			<div class="card card-chan mb-2">
				<div class="card-header bg-chan p-0 border-0">
					<div class="row">
						<div class="col pl-4 py-1">
							<p class="mb-0 font-chan-red">
								<span class="post-subject font-weight-bold">
									Account {{wallet}}
								</span>
							</p>
						</div>
					</div>
				</div>
				<div class="card-body bg-chan-light">
					<div class="row">
						<div class="col">
							<p class="display-4 text-center">Stake</p>
							<p class="font-chan-normal">Staking ETH allows you to take part in the lively discussions on 0xchan and receive your share of the distributed rewards system.</p>
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