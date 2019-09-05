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
							<p class="font-chan-normal lead text-center">{{openVotes?'There are open disputes':'Community is balanced'}}.</p>

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
					<open-votes v-if="openVotes">
						
					</open-votes>
					<single-dispute v-if="openDispute">
						<template #subject>
							you suck balls
						</template>
						<template #name>
							Ken-sama
						</template>
						<template #date>
							time what is time
						</template>
						<template #id>
							1251352
						</template>
						<template #post>
							u r an fagit lol
						</template>
					</single-dispute>
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
				openVotes: false,
				disputeId: '',
				openDispute: false
			}
		},
		computed: {
			...mapGetters([
				'getShowAlert',
				'getReports'
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
			if(this.getReports.length){
				this.openVotes = true
			}
		}
	}
</script>