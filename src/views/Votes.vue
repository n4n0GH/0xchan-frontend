<template>
	<div class="row">
		<div class="pr-0 w-100">
			<div class="card card-chan mb-2">
				<div class="card-header bg-chan p-0 border-0">
					<div class="row">
						<div class="col pl-4 py-1">
							<p class="mb-0 font-chan-red font-weight-bold">
								Dispute Management
							</p>
						</div>
					</div>
				</div>
				<div class="card-body bg-chan-light">
					<div class="row">
						<div class="col">
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
							<p class="font-chan-normal lead text-center">{{disputeCheck?'There are open disputes':'Community is balanced'}}.</p>
							<div class="w-100 text-center" v-if="!disputeCheck">
								<img src="../assets/peace.png" class="mx-auto" />
							</div>
						</div>
					</div>
					<open-votes v-if="disputeCheck" />
					<single-dispute v-if="openDispute" :report="dispute" />
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
				dispute: '',
				openDispute: false
			}
		},
		computed: {
			...mapGetters([
				'getShowAlert',
				'getReports'
			]),
			disputeCheck(){
				return this.getReports.length
			}
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
			eBus.$on('openDispute', r => {
				this.dispute = r
				this.openDispute = true
			})
			eBus.$on('closeDispute', () => {
				this.openDispute = false
			})
		}
	}
</script>