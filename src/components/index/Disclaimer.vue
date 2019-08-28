<template>
	<div class="col-12">
		<div class="row bg-chan" v-if="getDisclaimer">
			<div class="col text-center">
				<h4 class="text-chan">
					Disclaimer
				</h4>
			</div>
		</div>
		<div class="row" v-if="getDisclaimer">
			<div class="col">
				<p>0xchan is a decentralized network for exchanging thoughts and ideas on any topic using Ethereum without any central organization controlling the platform.</p>
				<p>0xchan users are not anonymous by default. Most communications are encrypted via SSL, but written records are stored on the blockchain and are tied to an address that stored the content in question. Malicious parties could use this information against you; protecting your IRL identity and privacy is your own responsibility.</p>
				<p>0xchan users must adhere to the laws in their own legal jurisdiction as well as their conscience. The 0xchan developers do not condone and are not responsible for any use of the platform to conduct illegal activities.</p>
				<p>The 0xchan developers have worked hard to deliver a free platform to discuss your favorite topics with anyone in the world. But as with any software, bugs may occur. The software is provided as is, using it is at the risk of the user.</p>
			</div>
			<button class="btn btn-outline-chan-red btn-block mb-4" @click="setBool('mutDisclaimer')">Hide Disclaimer</button>
		</div>
		<div class="row" v-if="!getDisclaimer">
			<p class="text-center text-mono w-100">[
				<a href="javascript:void();" @click="setBool('mutDisclaimer')">show disclaimer</a>
			]</p>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		computed: {
			...mapGetters([
				'getDisclaimer'
			])
		},
		methods: {
			...mapActions([
				'setBool'
			])
		}
	}
</script>