<template>
	<div class="w-100 pt-3 pr-0" id="disputePreview">
		<div class="card card-chan mb-2">
			<div class="card-header bg-chan p-0 border-0">
				<div class="row">
					<div class="col pl-4 py-1">
						<p class="mb-0 font-chan-red">
							<button class="btn btn-outline-chan-red mt-n1 mr-2 p-0 px-1" style="line-height: 1rem;" @click="closeView()"><i class="fal fa-eye-slash"></i></button>
							<span class="post-subject font-weight-bold">
								{{report.subject}}
							</span>
							<span class="post-name font-chan-ok">
								{{report.name}}
							</span>
							- <slot name="date" />
							| No. {{report.id}}
						</p>
					</div>
				</div>
			</div>
			<div class="card-body bg-chan-light p-1">
				<div class="row">
					<div class="float-left ml-3 mr-3 w-auto" style="max-width:30%;" v-if="!!report.file.name">
							<p class="small mb-0 text-mono text-overflow">
								File:&nbsp;{{report.file.name}}
							</p>
							<a :href="report.file.src" v-lazy-container="{selector: 'img'}">
								<img :data-src="report.file.src" :data-loading="loading" style="max-width:100%; max-height:256px; object-fit: cover;" alt="">
							</a>
						</div>
					<div class="col font-chan-normal">
						<blockquote v-html="report.post">
							
						</blockquote>
					</div>
				</div>
			</div>
			<hr class="bg-chan-light my-0">
			<div class="card-footer bg-chan-light border-0 p-1">
				<div class="row">
					<div class="col-12">
						<p class="lead font-chan-normal text-center mb-1">Submitted complaint:</p>
						<p class="text-mono font-chan-ok bg-chan small px-2 mb-2"><span class="font-chan-red">&gt;&gt;{{report.id}}</span><br>&gt;{{report.reason}}</p>
					</div>
					<div class="col-12">
						<p class="text-center font-chan-normal lead mb-2">Is the report justified?</p>
					</div>
					<div class="col ml-1 mr-0 pr-1">
						<button class="btn btn-block btn-outline-chan text-center text-mono" @click="punish(report)"><i class="fal fa-vote-yea"></i> Yea</button>
					</div>
					<div class="col mr-1 ml-0 pl-1">
						<button class="btn btn-block btn-outline-danger text-center text-mono" @click="britney(report)"><i class="fal fa-vote-nay"></i> Nay</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {eBus} from '../EventBus.js'
	import Loading from '../../assets/loading.gif'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		methods: {
			...mapActions([
				'setReportsRemove'
			]),
			punish(n){
				this.setReportsRemove(n)
				eBus.$emit('closeDispute')
			},
			britney(n){
				this.setReportsRemove(n)
				eBus.$emit('closeDispute')
			},
			closeView(){
				eBus.$emit('closeDispute')
			}
		},
		computed: {
			...mapGetters([
				'getReports'
			]),
			loading(){
				return Loading
			}
		},
		props: {
			report: {
				default: ''
			}
		}
	}
</script>