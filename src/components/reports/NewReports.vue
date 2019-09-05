<template>
	<div class="row">
		<ul class="list-group w-100">
			<li class="bg-chan list-group-item text-truncate border-0" :class="{'bg-chan-light': index % 2 !== 0}" v-for="(report, index) in getReports" :key="report.id">
				<button class="btn btn-outline-chan-red small py-0 mr-2" @click="openDispute(report)"><i class="fal fa-eye"></i></button>
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
		methods: {
			openDispute(r){
				eBus.$emit('openDispute', r)
			}
		},
		computed: {
			...mapGetters([
				'getReports'
			])
		}
	}
</script>