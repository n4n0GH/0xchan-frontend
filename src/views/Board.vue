<template>
	<div class="container-fluid">
		
		<router-view />
		
	</div>
</template>

<script>
	export default {
		beforeUpdate(){
			console.log(this.$route.params)
				if(this.$route.params.length == 1){
					console.log('yes')
				}
				if(this.$route.params.ticker && !this.$route.params.page && !this.$route.params.number && !this.$route.params.catalog){
					this.$router.push({
						path: this.$route.params.ticker+'/1'
					})
				}
		}
	}
</script>