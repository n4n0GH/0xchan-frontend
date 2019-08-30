<template>
	<div>
		<div class="row">
			<div class="col-12 text-center">
				<banner :key="componentKey"/>
				<p v-for="line in tag" class="lead font-weight-bold text-chan mb-2" :key="line.punchline">/{{line.ticker}}/ - {{line.punchline}}</p>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
	import Banner from './Banner.vue'
	export default{
		data(){
			return{
				componentKey: null
			}
		},
		components: {
			Banner
		},
		updated(){
			this.componentKey = Math.floor(Math.random()*10)
		}
	}
</script>