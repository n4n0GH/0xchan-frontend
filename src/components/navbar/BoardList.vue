<template>
	<div class="col mt-2">
		<ul class="list-unstyled list-chan">
			<li v-for="(board, index) in ticker" :key="index+1">
				<router-link :to="{name: 'board', params: {'ticker': ticker[index]}}" class="p-1 pb-2">
					/{{ticker[index]}}/ - {{punchline[index]}}
				</router-link>
			</li>
		</ul>
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
				return boards.boards.map((item) => {
					return item.ticker
				})
			},
			punchline() {
				return boards.boards.map((item) => {
					return item.punchline
				})
			}
		}
	}
</script>