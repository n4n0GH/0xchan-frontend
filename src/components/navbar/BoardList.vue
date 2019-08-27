<template>
	<div class="col mt-2">
			<ul class="list-unstyled list-chan d-none d-xl-block">
				<hr>
				<li v-for="(board, index) in boardList" :key="board.ticker+index">
					<router-link :to="{name: 'board', params: {'ticker': board.ticker}}" class="p-1 pb-2">
						/{{board.ticker}}/ - {{board.punchline}}
					</router-link>
				</li>
				<li class="p-1 pb-2 text-center">
					<hr>
					<span class="small">that's all :(</span>
					<button class="mt-2 btn btn-outline-chan btn-block">create new board</button>
				</li>
			</ul>
			<ul class="list-unstyled list-chan d-block d-xl-none">
				<hr>
				<li v-for="(board, index) in boardList" :key="board.ticker+index" class="text-center">
					<router-link :to="{name: 'board', params: {'ticker': board.ticker}}" class="p-1 pb-2">
						/{{board.ticker}}/
					</router-link>
				</li>
				<li class="p-1 pb-2 text-center">
					<hr>
					<span class="small">that's all :(</span>
					<button class="mt-2 btn btn-outline-chan btn-block">new</button>
				</li>
			</ul>
	</div>
</template>

<script>
	import Boards from './boards.json' // contract simulation of board list storage

	export default {
		data(){
			return {
			}
		},
		computed: {
			boardList() {
				return Boards.sort((a, b) => a.ticker.localeCompare(b.ticker))
			}
		}
	}
</script>