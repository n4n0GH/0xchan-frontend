<template>
	<div class="row fixed-bottom ml-2 pb-2">
		<div class="pl-1">
		<button class="btn btn-block btn-outline-chan-red text-mono p-0 px-1" @click="openSettings = !openSettings">
			Settings
		</button>
			
		</div>
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