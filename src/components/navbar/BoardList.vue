<template>
	<div class="col px-0">
			<ul class="list-unstyled list-chan">
				<hr>
				<li v-for="(board, index) in boardList" :key="board.ticker+index" class="text-center">
					<router-link :to="{path: '/board/'+board.ticker}" class="p-1 pb-2" :class="getUserBoards.length>0?(!getUserBoards.includes(board.ticker)?'d-none':''):''">
						/{{board.ticker}}/<span class="d-none d-xl-inline"> - {{board.punchline}}</span>
					</router-link>
				</li>
				<li class="pl-1 pb-2 text-center">
					<hr>
					<span class="small text-muted">that's all :(</span>
					<router-link :to="{name: 'newBoard'}" v-if="getLogin" tag="button" class="btn btn-outline-chan btn-block mt-2" active-class="btn-chan">
						<i class="far fa-plus"></i> <span class="d-none d-xl-inline"> New</span> Board
					</router-link>
				</li>
			</ul>
	</div>
</template>

<script>
	//import Boards from './boards.json' // contract simulation of board list storage
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
				'getUserBoards',
				'getDemo'
			]),
			boards(){
				return this.getDemo.boards
			},
			boardList() {
				return this.boards.slice().sort((a, b) => a.ticker.localeCompare(b.ticker))
			}
		}
	}
</script>