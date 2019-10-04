<template>
	<div class="container-fluid">
		<div class="row justify-content-end pt-2 mt-4">
			<div class="col-12 text-center">
				<img src="../assets/icon.png" style="width: 8rem;" alt="">
				<p class="display-3 font-weight-bold text-chan">
					0xchan
				</p>
			</div>
		</div>
		<div class="row justify-content-end">
			<alert v-if="getDisclaimer" class="mt-2">
				<template #content>
					<p class="small">0xchan is a decentralized network for exchanging thoughts and ideas on any topic using Ethereum without any central organization controlling the platform.</p>
					<p class="small">0xchan users are not anonymous by default. Most communications are encrypted via SSL, but written records are stored on the blockchain and are tied to an address that stored the content in question. Malicious parties could use this information against you; protecting your IRL identity and privacy is your own responsibility.</p>
					<p class="small">0xchan users must adhere to the laws in their own legal jurisdiction as well as their conscience. The 0xchan developers do not condone and are not responsible for any use of the platform to conduct illegal activities.</p>
					<p class="small">The 0xchan developers have worked hard to deliver a free platform to discuss your favorite topics with anyone in the world. But as with any software, bugs may occur. The software is provided as is, using it is at the risk of the user.</p>
				</template>
				<template #button>
					<button class="mt-2 btn btn-block btn-outline-warning" @click="setBool('mutDisclaimer')"><i class="fal fa-eye-slash"></i> I understand and accept</button>
				</template>
			</alert>
		</div>
		<div class="row justify-content-end">
			<div class="col">
				<new-posts />
			</div>
			<div class="col-12 col-sm-4">
				<anns />
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import Alert from '../components/helpers/Alert.vue'
	import NewPosts from '../components/index/NewPosts.vue'
	import Anns from '../components/index/Anns.vue'

	export default {
		components: {
			Alert,
			NewPosts,
			Anns
		},
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