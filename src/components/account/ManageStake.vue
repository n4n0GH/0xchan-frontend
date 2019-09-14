<template>
	<div>
		<div class="row border-chan-red border-top pt-4">
			<div class="col-12">
				<router-link :to="{name: 'help'}" tag="p" class="text-mono text-center font-chan-normal">[<a>why is staking neccessary?</a>]</router-link>
			</div>
			<div class="col">
				<p class="lead mb-0">Text Posting</p>
				<p class="small font-chan-normal">0.5 ETH required to post text content.</p>
			</div>
			<div class="col-3">
				<button class="btn btn-outline-chan-red btn-block text-mono"><i class="fab fa-ethereum"></i> Activate</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p class="lead mb-0">Media Posting</p>
				<p class="small font-chan-normal">1.5 ETH required to post media content. Requires Text Posting to be active as well.</p>
			</div>
			<div class="col-3">
				<button class="btn btn-outline-chan-red btn-block text-mono"><i class="fab fa-ethereum"></i> Activate</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p class="lead mb-0">Retrieve Stake</p>
				<p class="small font-chan-normal">Withdraw your stake to your wallet. Requires you to make no post in the past 24 hours and not have any open disputes.</p>
			</div>
			<div class="col-3">
				<button class="btn btn-outline-chan btn-block text-mono"><i class="fal fa-hand-holding-heart"></i> Withdraw</button>
			</div>
		</div>
	</div>
</template>