<template>
	<div>
		<div class="row w-100 text-mono">
			<div class="col-auto" v-if="getComfy">
				<router-link :to="{path: '/board/'+board.ticker}" tag="span" class="mr-0" :key="board.ticker+index" v-for="(board, index) in boardList">{{index==0?"[":""}}<a>{{board.ticker}}</a>{{index==boardList.length-1?"]":"/"}}</router-link>
			</div>
			<div class="col pr-0 text-right">
				<span class="mr-0" v-if="path=='/settings'">
					[<a href="javascript:history.back();">return</a>]
				</span>
				<span class="mr-0" v-else>
					[<router-link :to="{name: 'settings'}">settings</router-link>]
				</span>
				<span v-if="path=='/help'">
					[<a href="javascript:history.back();">return</a>]
				</span>
				<span v-else>
					[<router-link :to="{name: 'help'}">help</router-link>]
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Boards from '../components/navbar/boards.json'

	export default{
		computed: {
			...mapGetters([
				'getUserBoards',
				'getComfy'
			]),
			path(){
				return this.$route.path
			},
			boardList() {
				return Boards.sort((a, b) => a.ticker.localeCompare(b.ticker))
			}
		}
	}
</script>