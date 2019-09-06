<template>
	<div class="row">
		<ul class="list-group w-100">
			<li class="list-group-item text-truncate border-0" :class="index % 2 !== 0?'bg-chan-light':'bg-chan'" v-for="(report, index) in getReports" :key="report.id">
				<button class="btn btn-outline-chan-red small py-0 mr-2" :class="openId == index?'router-link-active':''" @click="openDispute(report, index)"><i class="fal fa-eye"></i></button>
				<span class="mr-2">No. {{report.id}}</span>
				<span class="mr-2">/{{report.board}}/</span>
				<span>{{report.reason}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {eBus} from '../EventBus.js'
	
	export default {
		data(){
			return {
				openId: null
			}
		},
		methods: {
			openDispute(r, i){
				eBus.$emit('openDispute', r)
				this.openId = i
			}
		},
		computed: {
			...mapGetters([
				'getReports'
			])
		},
		mounted(){
			eBus.$on('closeDispute', () => {
				this.openId = null
			})
		}
	}
</script>