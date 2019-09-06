<template>
	<div class="col px-0">
			<ul class="list-unstyled list-chan">
				<hr>
				<li v-for="(board, index) in boardList" :key="board.ticker+index" class="text-center">
					<router-link :to="{path: '/board/'+board.ticker}" class="p-1 pb-2" :class="getUserBoards.length>0?(!getUserBoards.includes(board.ticker)?'d-none':''):''">
						/{{board.ticker}}/<span class="d-none d-xl-inline"> - {{board.punchline}}</span>
					</router-link>
				</li>
				<li class="p-1 pb-2 text-center">
					<hr>
					<span class="small">that's all :(</span>
					<button class="mt-2 btn btn-outline-chan btn-block" v-if="getLogin"><i class="far fa-plus"></i> <span class="d-none d-xl-inline">New </span>Board</button>
				</li>
			</ul>
	</div>
</template>

<script>
	import Boards from './boards.json' // contract simulation of board list storage
	import {mapGetters} from 'vuex'

	export default {
		data(){
			return {
			}
		},
		methods: {

		},
		computed: {
			...mapGetters([
				'getLogin',
				'getUserBoards'
			]),
			boardList() {
				return Boards.sort((a, b) => a.ticker.localeCompare(b.ticker))
			}
		}
	}
</script>