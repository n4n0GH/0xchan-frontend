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
	import {mapGetters} from 'vuex'
	import {eBus} from '../EventBus.js'

	export default {
		data() {
			return {
			}
		},
		methods: {
			login(){
				eBus.$emit('login')
			}
		},
		computed: {
			...mapGetters([
				'getLogin'
			])
		}
	}
</script>