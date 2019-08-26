<template>
	<div class="row pt-2 mt-4 mb-4">
		<div class="col text-center">
			<img src="../../assets/1.gif" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
			
			}	
		},
		methods: {
			randomBanner() {
				return this.imageList[Math.floor(Math.random()*this.imageList.length)]
			}
		}
	}
</script>