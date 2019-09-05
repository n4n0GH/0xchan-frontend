<template>
	<div class="row">
		<ul class="list-group w-100">
			<li class="bg-chan list-group-item text-truncate border-0" v-for="vote in getReports" :key="vote.id">
				<button class="btn btn-outline-chan-red small py-0 mr-2" @click="openDispute(vote.id)"><i class="fal fa-eye"></i></button>
				<span class="mr-2">#<slot name="id" /></span>
				<span class="mr-2"><slot name="board" /></span>
				<span><slot name="reason" /></span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {eBus} from '../EventBus.js'
	
	export default {
		methods: {
			openDispute(id){
				eBus.$emit('openDispute', id)
			}
		},
		computed: {
			...mapGetters([
				'getReports'
			])
		}
	}
</script>