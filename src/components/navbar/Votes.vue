<template>
	<transition name="fade" mode="out-in">
		<div v-if="getLogin" class="mt-2">
			<router-link tag="button" class="btn btn-block btn-outline-chan-red" :to="{name: 'votes'}" v-if="getLogin"><i class="fal fa-box-ballot"></i> Votes <span class="badge badge-danger" v-if="getReports.length">{{getReports.length}}</span></router-link>
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		methods: {
		},
		computed: {
			...mapGetters([
				'getLogin',
				'getReports'
			])
		}
	}
</script>