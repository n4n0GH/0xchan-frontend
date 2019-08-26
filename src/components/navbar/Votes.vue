<template>
	<transition name="fade" mode="out-in">
		<div v-if="getLogin">
			votes
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		methods: {
		},
		computed: {
			...mapGetters([
				'getLogin'
			])
		}
	}
</script>