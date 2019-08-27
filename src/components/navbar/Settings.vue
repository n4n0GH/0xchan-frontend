<template>
	<div class="col px-0 fixed-bottom">
		<button class="btn btn-block btn-outline-chan-red text-mono p-0 px-1" @click="openSettings = !openSettings">
			Settings
		</button>			
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		data(){
			return{
				openSettings: false
			}
		},
		methods: {
			...mapActions([
				'setBool'
			])
		},
		computed: {
			...mapGetters([
				'getGrab'
			])
		}
	}
</script>