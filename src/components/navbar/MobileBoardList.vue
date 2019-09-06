<template>
	<div class="row">
		<div class="col py-1 bg-chan-red">
			<select class="custom-select" name="boardSelector" @change="routeUser($event)">
				<option disabled selected>Select a board...</option>
				<option v-for="board in boardList" :value="board.ticker">/{{board.ticker}}/ - {{board.punchline}}</option>
			</select>
		</div>
	</div>
</template>

<script>
	import Boards from './boards.json'
	import {mapGetters} from 'vuex'

	export default {
		methods: {
			routeUser(event){
				this.$router.push({path: '/board/'+event.target.value})
			}
		},
		computed: {
			...mapGetters([
				'getUserBoards'
			]),
			boardList() {
				return Boards.sort((a, b) => a.ticker.localeCompare(b.ticker))
			}
		}
	}
</script>