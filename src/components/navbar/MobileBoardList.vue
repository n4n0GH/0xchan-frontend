<template>
	<div class="row">
		<div class="col py-1 bg-chan-red">
			<select class="custom-select" name="boardSelector" v-model="currentBoard" @change="routeUser($event)">
				<option disabled selected>Select a board...</option>
				<option v-for="(board, index) in boardList" :value="board.ticker" :key="'board-'+index" :class="getUserBoards.length>0?(!getUserBoards.includes(board.ticker)?'d-none':''):''">/{{board.ticker}}/ - {{board.punchline}}</option>
			</select>
		</div>
	</div>
</template>

<script>
	// import Boards from './boards.json'
	import {mapGetters} from 'vuex'

	export default {
		data(){
			return{
				currentBoard: 'Select a board...'
			}
		},
		methods: {
			routeUser(event){
				this.$router.push({path: '/board/'+event.target.value})
				this.currentBoard = 'Select a board...'
			}
		},
		computed: {
			...mapGetters([
				'getUserBoards',
				'getDemo'
			]),
			boardList() {
				return this.getDemo.boards.slice().sort((a, b) => a.ticker.localeCompare(b.ticker))
			}
		}
	}
</script>