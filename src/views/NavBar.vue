<template>
	<div class="container-fluid vh-100">
		<div class="row sticky-top bg-chan-regular pb-2">
			<div class="col-12 h-auto text-center pt-2">
				<router-link :to="{name: 'index'}">
					<img src="../assets/icon.png" style="width:3rem;" alt="">
				</router-link>
			</div>
		
			<div class="col-12 px-0">
				<login />
			</div>
		
			<div class="col-12 px-0">
				<votes />
			</div>
		</div>
		<div class="row h-75">
			<board-list />
		</div>
	</div>
</template>

<script>
	import BoardList from '../components/navbar/BoardList.vue'
	import Login from '../components/navbar/Login.vue'
	import Votes from '../components/navbar/Votes.vue'

	export default {
		components: {
			BoardList,
			Login,
			Votes,
		}
	}
</script>