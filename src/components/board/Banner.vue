<template>
	<div class="row pt-2 mt-4 mb-4">
		<div class="col text-center">
			<img :src="banner" alt="">
		</div>
	</div>
</template>

<script>
	import Banner1 from '../../assets/banners/1.gif'

	export default {
		data(){
			return{
			
			}	
		},
		methods: {
			randomBanner() {
				return this.imageList[Math.floor(Math.random()*this.imageList.length)]
			}
		},
		computed: {
			banner(){
				return Banner1
			}
		}
	}
</script>