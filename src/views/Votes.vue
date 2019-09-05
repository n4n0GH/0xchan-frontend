<template>
	<div class="row">
		<div class="pr-0 w-100">
			<div class="card card-chan mb-2">
				<div class="card-header bg-chan p-0 border-0">
					<div class="row">
						<div class="col pl-4 py-1">
							<p class="mb-0 font-chan-red font-weight-bold">
								Open Disputes
							</p>
						</div>
					</div>
				</div>
				<div class="card-body bg-chan-light">
					<div class="row">
						<div class="col">
							<p class="font-chan-normal lead text-center">{{openVotes?'Community is in discord':'Community is balanced'}}.</p>

							<div class="alert alert-warning" v-if="getShowAlert">
								<div class="row">
									<div class="col-auto display-4">
										<i class="fal fa-exclamation-triangle font-warning"></i>	
									</div>
									<div class="col">
										Please note that the content you will see when opening a single dispute might be highly questionable to outright illegal in your jurisdiction. Images will be downloaded automatically. Think twice before interacting with the votes.
									</div>
								</div>
								<button class="mt-2 btn btn-block btn-outline-warning" @click="setBool('mutAlert')"><i class="fal fa-eye-slash"></i> Understood</button>
							</div>
							<div class="w-100 text-center">
								<img src="../assets/peace.png" class="mx-auto" v-if="!openVotes"/>
							</div>
						</div>
					</div>
					<open-votes v-if="openVotes" />
					<single-dispute v-if="openDispute" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {eBus} from '../components/EventBus.js'
	import {mapGetters, mapActions} from 'vuex'
	import OpenVotes from '../components/reports/NewReports.vue'
	import SingleDispute from '../components/reports/Votes.vue'

	export default {
		data(){
			return{
				openVotes: true,
				disputeId: '',
				openDispute: false
			}
		},
		computed: {
			...mapGetters([
				'getShowAlert'
			])
		},
		methods: {
			...mapActions([
				'setBool'
			])
		},
		components: {
			OpenVotes,
			SingleDispute
		},
		mounted(){
			eBus.$on('openDispute', id => {
				this.disputeId = id
				this.openDispute = true
			})
		}
	}
</script>