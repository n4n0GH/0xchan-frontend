<template>
	<div class="row pt-2 mt-4 mb-4">
		<div class="col text-center">
			<img :src="require(`@/assets/banners/${randomBanner}.gif`)" alt="">
		</div>
	</div>
</template>

<script>

	export default {
		data(){
			return{
				imageList: 15 // @dev holy shit is this a retarded way of having random banners jesus christ what the fuck don't you dare forget to update this if you include more banners lmao
			}	
		},
		computed: {
			randomBanner() {
				return Math.floor(Math.random()*this.imageList)
			}

		}
	}
</script>