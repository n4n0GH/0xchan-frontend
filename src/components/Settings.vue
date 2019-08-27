<template>
	<div class="w-100 text-right text-mono">
		[<a href="javascript:void()" @click="openSettings = !openSettings">settings</a>]			
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