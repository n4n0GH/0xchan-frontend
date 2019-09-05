<template>
	<div class="row">
		<ul class="list-group w-100">
			<li class="bg-chan list-group-item text-truncate border-0">
				<button class="btn btn-outline-chan-red small py-0 mr-2" @click="openDispute('123')"><i class="fal fa-eye"></i></button>
				<span class="mr-2">#123415</span>
				<span class="mr-2">/a/ - animu and mango</span>
				<span>called my waifu a shit ban this homo prancing lala man wtf this bitch I swear</span>
			</li>
			<li class="bg-chan-light list-group-item text-truncate border-0">
				<button class="btn btn-outline-chan-red small py-0 mr-2"><i class="fal fa-eye"></i></button>
				<span class="mr-2">#114565</span>
				<span class="mr-2">/v/ - vidya gaems</span>
				<span>dantefag shitting up comfy souls thread</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {eBus} from '../EventBus.js'
	
	export default {
		methods: {
			openDispute(id){
				eBus.$emit('openDispute', id)
			}
		}
	}
</script>