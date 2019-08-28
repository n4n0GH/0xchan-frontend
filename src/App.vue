<template>
	<div class="d-flex m-0 container-fluid">
		<div class="row vh-100">
			<div class="col-2 px-0 position-fixed w-100 overflow-auto">
				<nav-bar/>
			</div>
		</div>
		<div class="row w-100 ml-4 justify-content-end">
			<div class="col-10">
				<settings />
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
	import Settings from './components/Settings.vue'
	import NavBar from './views/NavBar.vue'

	export default {
		components: {
			NavBar,
			Settings
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