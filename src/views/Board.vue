<template>
	<div>
		<div class="row">
			<div class="col-12 text-center">
				<banner :key="componentKey"/>
				<p v-for="line in tag" class="lead font-weight-bold text-chan mb-2" :key="line.punchline">/{{line.ticker}}/ - {{line.punchline}}</p>
			</div>
		</div>
		<div class="row">
			<div class="col-auto pl-4" v-if="openNew">
				<button style="line-height: 1rem;" class="mt-2 p-0 px-1 btn btn-outline-chan-red text-mono" @click="openNew = !openNew">&times;</button>
			</div>
			<div class="col mr-4 text-center">
				<new-template v-if="openNew" :isReply="thread" /> <!-- supply slots in case of reply instead of new thread -->
				<button class="btn btn-outline-chan" v-if="!openNew && getLogin" @click="openNew = !openNew"><i class="far fa-plus"></i> {{!thread?'New Thread':'New Reply'}}</button>
			</div>
		</div>
		<keep-alive>
		<router-view />
		</keep-alive>
	</div>
</template>

<script>
	import Banner from '../components/board/Banner.vue'
	import Boards from '../components/navbar/boards.json'
	import NewTemplate from '../components/board/NewTemplate.vue'

	import {mapGetters} from 'vuex'

	export default{
		data(){
			return{
				componentKey: null,
				openNew: false
			}
		},
		components: {
			Banner,
			NewTemplate
		},
		computed: {
			...mapGetters([
				'getLogin'
			]),
			board(){
				return this.$route.params.ticker
			},
			thread() {
				return this.$route.params.number
			},
			tag(){
				return Boards.filter(a => a.ticker == this.board)
			}
		},
		updated(){
			this.componentKey = Math.floor(Math.random()*10)
				
		}
	}
</script>