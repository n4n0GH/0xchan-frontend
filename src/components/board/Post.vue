<template>
	<div class="pr-0 pl-0">
		<div class="card card-chan mb-2">
			<div class="card-header bg-chan p-0 border-0">
				<div class="row">
					<div class="col pl-4 pr-0 py-1">
						<p class="mb-0 font-chan-red">
							<router-link tag="button" :to="{name: 'thread', params: {'number': post.thread}}" style="line-height: 1rem;" class="mt-n1 mr-2 p-0 px-1 btn btn-outline-chan-red" v-if="!post.id && !threadCheck">
								<i class="fal fa-eye"></i>
							</router-link>
							<span class="post-subject font-weight-bold">
								{{post.subject}}
							</span>
							<span class="post-name font-chan-ok">
								{{getForceAnon?'Anonymous':post.name}}
							</span>
							- {{post.timestamp}}
							| No. <a href="javascript:void(0);" @click="quickReply(postNumber, $event)">{{postNumber}}</a>
						</p>
					</div>
					<div class="col-auto mr-2">
						<p class="mb-0 font-chan-red">
							<button style="line-height: 1rem;" class="mt-1 p-0 px-1 btn btn-outline-chan-red text-mono" @click="openReport = !openReport" v-if="getLogin">R</button>
						</p>
					</div>
					<div class="col-12" v-if="openReport">
						<div class="input-group">
							<input type="text" class="form-control border-chan-red border-left-0 border-right-0 rounded-0 text-mono" placeholder="State your complaint" v-model="reportReason" :maxlength="maxLength">
							<div class="input-group-append text-mono">
								<span class="input-group-text border-chan-red" style="background-color:white;">{{reportReason.length}}/{{maxLength}}</span>
								<button class="btn btn-outline-chan-red border-right-0 rounded-0" @click="report(post)"><i class="fal fa-paper-plane"></i><span class="d-none d-lg-inline"> File Report</span><span class="d-inline d-lg-none"> Send</span></button>
							</div>
							
						</div>
					</div>
				</div>
			</div>
			<div class="card-body bg-chan-light p-1">
				<div class="row">
					<div class="col-12">
						<div class="float-left mr-3 w-auto" :style="{maxWidth: [inlinePreview?bigPreview:smolPreview]+'%'}" v-if="!!post.file.originalName && getGrab">
							<p class="small mb-0 text-mono text-overflow">
								[<a href="javascript:void(0);" @click="doResearch = !doResearch">?</a>]<span class="d-none d-sm-inline">&nbsp;File:&nbsp;{{post.file.originalName}}</span></p>
							<p class="small mb-0 text-mono" v-if="doResearch">
								[<a :href="'https://www.google.com/searchbyimage?image_url='+post.file.src" target="_blank">Google</a>] [<a :href="'https://iqdb.org/?url='+post.file.src" target="_blank">IQDB</a>] [<a :href="'https://saucenao.com/search.php?url='+post.file.src" target="_blank">Sauce</a>]
							</p>
							<p class="small mb-0 text-mono d-none d-sm-inline">
								(11.11 MB, 1920&times;1080)
							</p>
							<a :href="post.file.src" v-lazy-container="{selector: 'img'}" @click.prevent="toggleSize()">
								<img :data-src="post.file.src" :data-loading="loading" :class="[inlinePreview?'bigPreview':'smolPreview']" alt="">
							</a>
						</div>
						<div class="font-chan-normal">
							<blockquote class="mb-0" v-html="post.text">
							</blockquote>
						</div>
					</div>
				</div>
				<div class="row mt-2" v-if="!!post.file.originalName && !getGrab">
					<div class="col">
						<p class="small mb-0 text-mono">
							File omitted: <slot name="fileMeta" /> (11.11 MB, 1920&times;1080) [<a :href="post.file.src" target="_blank">view</a>]
						</p>
					</div>
				</div>
			</div>
			<div class="card-footer bg-chan-light border-0 p-1">
				<div class="row">
					<div class="col pr-0">
						<p class="small text-mono mb-0" v-if="hasReplies">
							Replies: <slot name="allThoseYous" />
						</p>
					</div>
					<div class="col-auto">
						<button class="p-0 px-1 btn btn-outline-chan-red text-mono" v-if="getLogin">(you)</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Loading from '../../assets/loading.gif'
	import {mapGetters, mapActions} from 'vuex'
	import {eBus} from '../EventBus.js'

	export default {
		data(){
			return{
				postNumber: '',
				doResearch: false,
				openReport: false,
				hasReplies: '',
				maxLength: 140,
				reportReason: '',
				inlinePreview: false,
				smolPreview: 30,
				bigPreview: 100
			}
		},
		props: {
			post: {
				default: ''
			}
		},
		computed: {
			loading() {
				return Loading
			},
			...mapGetters([
				'getGrab',
				'getReports',
				'getForceAnon',
				'getLogin'
			]),
			threadCheck(){
				return this.$route.params.number
			}
		},
		methods: {
			...mapActions([
				'setReports'
			]),
			toggleSize(){
				this.inlinePreview = !this.inlinePreview
			},
			doingResearch(){
				this.doResearch = true
				setTimeout(function(){
					this.doResearch = false
				}, 10000)
			},
			report(n){
				let id
				if(n.id){
					id = n.id
				} else {
					id = n.thread
				}
				let subject
				if(n.subject){
					subject = n.subject
				}
				let name = n.name
				let fileName
				let fileSrc
				if(n.file.originalName){
					fileName = n.file.originalName
					fileSrc = n.file.src
				}
				let post = n.text
				let board = this.$route.params.ticker
				let reason = this.reportReason.slice(0, 140)
				let reportObj = {
					board: board,
					id: id,
					subject: subject,
					name: name,
					file: {
						name: fileName,
						src: fileSrc
					},
					post: post,
					reason: reason
				}
				this.openReport = false
				if(!this.getReports.some(report => report.id === reportObj.id)){
					this.setReports(reportObj)
				} else { alert('This post was already reported.') }
			},
			quickReply(p, n){
				eBus.$emit('openReply', {posx: n.clientX, posy: n.clientY, id: p})
				eBus.$emit('addReply', p)
			}
		},
		mounted(){
			this.postNumber = this.post.id?this.post.id:this.post.thread
		}
	}
</script>

<style scoped>
	.bigPreview{
		max-width:100%;
		display: block;
	}
	.smolPreview{
		max-width:100%; 
		max-height:256px; 
		object-fit: cover; 
		display: block;
	}
</style>