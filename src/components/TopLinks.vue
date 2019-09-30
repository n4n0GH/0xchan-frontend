<template>
	<div>
		<div class="row w-100 text-mono">
			<div class="col" v-if="getComfy">
				<span class="mr-0">
					[<router-link :to="{name: 'index'}" tag="a">home</router-link>/<a href="javascript:void(0);" @click="login()" v-if="!getLogin">login</a><router-link :to="{name: 'account'}" tag="a" v-if="getLogin">account</router-link>{{getLogin?"/":""}}<router-link :to="{name: 'votes'}" tag="a" v-if="getLogin">votes</router-link>]
				</span>
				<router-link :to="{path: '/board/'+board.ticker}" tag="span" class="mr-0" :key="board.ticker+index" v-for="(board, index) in boardList">{{index==0?"[":""}}<a>{{board.ticker}}</a>{{index==boardList.length-1?"]":"/"}}</router-link>
				<router-link :to="{name: 'newBoard'}" v-if="getLogin" tag="span">
					[<a href="javascript:void(0);">new board</a>]
				</router-link>
			</div>
			<div class="pr-0 text-right" :class="getComfy?'col-auto':'col'">
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
	// import Boards from '../components/navbar/boards.json'
	import {eBus} from '../components/EventBus.js'

	export default{
		methods: {
			login(){
				eBus.$emit('login')
			}
		},
		computed: {
			...mapGetters([
				'getUserBoards',
				'getComfy',
				'getLogin',
				'getDemo'
			]),
			path(){
				return this.$route.path
			},
			boardList() {
				return this.getDemo.boards.slice().sort((a, b) => a.ticker.localeCompare(b.ticker))
			}
		}
	}
</script>