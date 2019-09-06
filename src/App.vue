<template>
	<div class="d-flex m-0 container-fluid">
		<div class="row vh-100">
			<div class="col-2 px-0 position-fixed w-100 overflow-auto">
				<nav-bar/>
			</div>
		</div>
		<div class="row w-100 ml-4 justify-content-end">
			<div class="col-10">
				<top-links />
				<keep-alive>
					<router-view/>
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import TopLinks from './components/TopLinks.vue'
	import NavBar from './views/NavBar.vue'

	export default {
		components: {
			NavBar,
			TopLinks
		},
		computed: {
			...mapGetters([
				'getTheme',
				'getCustomCss'
			])
		},
		methods: {
		},
		head: {
			link(){
				if(this.getTheme != 'Custom'){
					return [
						{
							rel: 'stylesheet', 
							href: require(`@/assets/css/${this.getTheme}.css`)
						}
					]
				}
			},
			style(){
				if(this.getTheme == 'Custom'){
					return [
						{
							type: 'text/css',
							inner: `${this.getCustomCss}`
						}
					]
				}
			}
		},
		mounted(){
			var style = [
				'background: linear-gradient(#009245, #006837)',
				'color: white',
				'display: block',
				'line-height: 40px',
				'text-align: center',
				'font-weight: bold'
			].join(';');
		/* eslint-disable-next-line */
		console.log('%c fuck de popo lmao ', style);
		}
	};
</script>

<style>
	/* a[href*="//"]:not([href*="localhost"]):after {
		content: '\2197';
	} */
</style>