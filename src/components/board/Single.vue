<template>
	<div>
		<div class="row">
			<div class="col-12 text-center">
				<banner :key="componentKey"/>
				<p v-for="line in tag" class="lead font-weight-bold text-chan mb-2" :key="line.punchline">/{{line.ticker}}/ - {{line.punchline}}</p>
			</div>
		</div>
		<keep-alive>
		<router-view />
		</keep-alive>
	</div>
</template>

<script>
	import Banner from './Banner.vue'
	import Boards from '../navbar/boards.json'
	export default{
		data(){
			return{
				componentKey: null
			}
		},
		components: {
			Banner
		},
		computed: {
			board(){
				return this.$route.params.ticker
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