<template>
	<div class="container-fluid">
		<div class="row pt-2 mt-4">
			<div class="col text-center">
				<img src="../assets/icon.png" style="width: 8rem;" alt="">
				<p class="display-3 font-weight-bold text-chan">
					0xchan
				</p>
			</div>
		</div>
		<div class="row">
			<disclaimer />
		</div>
		<div class="row">
			<div class="col">
				<new-posts />
			</div>
			<div class="col-4">
				<anns />
			</div>
		</div>
	</div>
</template>

<script>
	import Disclaimer from '../components/index/Disclaimer.vue'
	import NewPosts from '../components/index/NewPosts.vue'
	import Anns from '../components/index/Anns.vue'

	export default {
		components: {
			Disclaimer,
			NewPosts,
			Anns
		}
	}
</script>