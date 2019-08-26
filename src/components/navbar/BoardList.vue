<template>
	<div class="col mt-2">
		<hr>
		<ul class="list-unstyled list-chan d-none d-xl-block">
			<li v-for="(board, index) in ticker" :key="index+1" class="text-center">
				<router-link :to="{name: 'board', params: {'ticker': ticker[index]}}" class="p-1 pb-2">
					/{{ticker[index]}}/ - {{punchline[index]}}
				</router-link>
			</li>
		</ul>
		<ul class="list-unstyled list-chan d-block d-xl-none">
			<li v-for="(board, index) in ticker" :key="index+1" class="text-center">
				<router-link :to="{name: 'board', params: {'ticker': ticker[index]}}" class="p-1 pb-2">
					/{{ticker[index]}}/
				</router-link>
			</li>
		</ul>
		<hr>
	</div>
</template>

<script>
	import boards from './boards.json' // contract simulation of board list storage

	export default {
		data(){
			return {
			}
		},
		computed: {
			ticker() {
				return boards.map((item) => {
					return item.ticker
				})
			},
			punchline() {
				return boards.map((item) => {
					return item.punchline
				})
			}
		}
	}
</script>