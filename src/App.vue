<template>
	<div class="d-flex m-0 container-fluid">
		<mobile-board-list class="w-100 d-block d-sm-none position-fixed" style="z-index:99999;" />
		<div style="position: fixed; bottom: 2rem; right: 2rem; z-index:9999999" class="d-sm-none">
			<radial-menu class="bg-chan-light font-chan-red" :size="60" :item-size="40" :radius="120" :angle-restriction="100">
				<radial-menu-item class="bg-chan-light" v-for="(item, index) in mobileItems()" :key="item+index" @click="() => handleClick(item)">
					<span :class="item.icon">&nbsp;</span>
				</radial-menu-item>
			</radial-menu>
		</div>
		<div class="row vh-100">
			<div class="col-2 d-sm-inline d-none px-0 position-fixed w-100 overflow-auto">
				<nav-bar/>
			</div>
		</div>
		<div class="row w-100 ml-4 justify-content-end">
			<div class="col col-sm-10 px-0">
				<top-links class="d-none d-sm-block"/>
				<keep-alive>
					<router-view/>
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
	import {RadialMenu, RadialMenuItem} from 'vue-radial-menu'
	import {mapGetters} from 'vuex'
	import TopLinks from './components/TopLinks.vue'
	import NavBar from './views/NavBar.vue'
	import MobileBoardList from './components/navbar/MobileBoardList.vue'

	export default {
		data(){
			return{
				lastClicked: null,
				items: [{name: 'account', icon: 'fal fa-user-circle', login: 'yes'}, {name: 'votes', icon: 'fal fa-box-ballot', login: 'yes'}, {name: 'settings', icon: 'fal fa-tools', login: 'no'}, {name: 'help', icon: 'fal fa-question-circle', login: 'no'}, {name: 'index', icon: 'fal fa-home-alt', login: 'no'}]
			}
		},
		components: {
			NavBar,
			TopLinks,
			RadialMenu,
			RadialMenuItem,
			MobileBoardList
		},
		computed: {
			...mapGetters([
				'getTheme',
				'getCustomCss',
				'getGrab',
				'getLogin'
			])
		},
		methods: {
			handleClick(item){
				this.$router.push({name: item.name})
			},
			mobileItems(){
				if(!this.getLogin){
					return this.items.filter(a => a.login == 'no')
				} else {
					return this.items
				}
			}
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
			},
			meta(){
				if(this.getGrab){
					return [
						{
							name: 'theme-color',
							content: '#880000'
						}
					]
				} else {
					return [
						{
							name: 'theme-color',
							content: '#34345c'
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