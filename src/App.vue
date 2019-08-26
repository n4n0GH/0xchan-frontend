<template>
	<div class="row m-0">
		<transition name="fade" mode="out-in">
			<modal v-if="getModal"/>
		</transition>
		<div class="col-2 pl-0" style="position:fixed; height:100%;">
			<nav-bar/>
		</div>
		<div class="col-10 ml-auto">
			<router-view/>
		</div>
	</div>
</template>

<script>
	
	import NavBar from './views/NavBar.vue'
	import Modal from './components/modals/Modal.vue'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		components: {
			NavBar,
			Modal
		},
		methods: {
			...mapActions([

			])
		},
		computed: {
			...mapGetters([
				'getModal'
			])
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
		console.log('%c fuck censorship lmfao ', style);
		}
	}
</script>