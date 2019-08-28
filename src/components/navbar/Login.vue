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
	import {mapGetters, mapActions} from 'vuex'
	export default {
		methods: {
			login(){
				this.setBool('mutLogin')
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