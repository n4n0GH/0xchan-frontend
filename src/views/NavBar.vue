<template>
	<div class="container-fluid" style="height:100%;">
		<div class="row">
			<div class="col text-center pt-2">
				<router-link :to="{name: 'index'}" class="text-chan text-chan-brand">
					<img src="../assets/icon.png" style="width:3rem;" alt="">
					0xchan
				</router-link>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<login />
			</div>
		</div>
		<div class="row">
			<div class="col">
				<votes />
			</div>
		</div>
		<div class="row">
			<board-list />
		</div>
		<div class="row">
			<div class="col text-center">
				<p class="small">that's all :(</p>
			</div>
		</div>
		<settings />
	</div>
</template>

<script>
	import BoardList from '../components/navbar/BoardList.vue'
	import Login from '../components/navbar/Login.vue'
	import Votes from '../components/navbar/Votes.vue'
	import Settings from '../components/navbar/Settings.vue'

	export default {
		components: {
			BoardList,
			Login,
			Votes,
			Settings
		}
	}
</script>