<template>
	<div class="pr-0 pl-0">
		<div class="card card-chan mb-2">
			<div class="card-header bg-chan p-0 border-0">
				<div class="row">
					<div class="col pl-4 pr-0 py-1">
						<p class="mb-0 font-chan-red">
							<router-link tag="button" :to="{name: 'thread', params: {'number': post.id}}" style="line-height: 1rem;" class="mt-n1 mr-2 p-0 px-1 btn btn-outline-chan-red" v-if="!threadCheck && !isReply">
								<i class="fal fa-eye"></i>
							</router-link>
							<span class="post-subject font-weight-bold">
								{{post.subject}}
							</span>
							<span class="post-name font-chan-ok">
								{{getForceAnon?'Anonymous':post.name}}
							</span>
							- {{calcDateTime}}
							| <router-link :to="{path: `/board/${this.$route.params.ticker}/thread/${permalink}#p${postNumber}`}">No.</router-link>&nbsp;<a href="javascript:void(0);" @click="quickReply(postNumber, $event)" v-if="getLogin">{{postNumber}}</a><span v-if="!getLogin">{{postNumber}}</span>
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
								[<a href="javascript:void(0);" @click="doResearch = !doResearch">?</a>]<span class="d-none d-sm-inline">&nbsp;File:&nbsp;<a :href="post.file.src" target="_blank">{{post.file.originalName}}</a></span></p>
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
							<blockquote class="mb-0" style="white-space:pre-line" v-html="filteredPost(post.text)"></blockquote>
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
						<button class="p-0 px-1 btn btn-outline-chan-red text-mono" v-if="getLogin" @click="giftYou()">(you)</button>
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
				bigPreview: 100,
				nowTime: null
			}
		},
		props: {
			post: {
				default: ''
			},
			isReply: {
				default: false
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
			},
			calcDateTime(){
				let baseTime = new Date(this.post.stamp)
				let baseMonth = baseTime.getMonth()+1
				let year = baseTime.getFullYear()
				let month = baseMonth<=9?'0'+baseMonth:baseMonth
				let humanDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				let humanDayIndex = (Math.floor(baseTime/86400)+4)%7
				let humanDay = humanDays[humanDayIndex-1]
				let baseDay = baseTime.getDay()-1
				let day = baseDay<=9?'0'+baseDay:baseDay
				let hour = baseTime.getHours()<=9?'0'+baseTime.getHours():baseTime.getHours()
				let minute = baseTime.getMinutes()<=9?'0'+baseTime.getMinutes():baseTime.getMinutes()
				let second = baseTime.getSeconds()<=9?'0'+baseTime.getSeconds():baseTime.getSeconds()
				return month+'/'+day+'/'+year+' ('+humanDay+') '+hour+':'+minute+':'+second
			},
			permalink(){
				return this.post.replyTo[0]?this.post.replyTo[0]:this.postNumber
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
			giftYou() {
				if(confirm("Do you want to send a free (you)? Note: still costs gas to send transaction.")){
					alert('this is the part were metamask annoys you to send the tx')
				}
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
			},
			filteredPost(t){
				let vm = this
				let clean = this.$sanitize(t, {
					allowedTags: ['b', 'i', 'em', 'strong', 'code', 'pre'],
					textFilter: function(text){
						let refPost = text.match(/&gt;&gt;\w+/gm)	//find >>link
						if(refPost!=null){
							let cutPost = text.replace(/&gt;&gt;\w+/gm, '<a href="'+vm.$route.params.ticker+'/thread/'+vm.permalink+'#'+refPost[0].slice(8)+'">'+refPost[0]+'</a>')
							return cutPost
						} else { return text }
					}
				})
				return clean
			}
		},
		mounted(){
			this.nowTime = Date.now()
			this.postNumber = this.post.id
			// @dev: needs to be switched to use router guards instead
			eBus.$on('boardChange', () => {
				if(this.doResearch){
					this.doResearch = false
				}
				if(this.inlinePreview){
					this.inlinePreview = false
				}
				if(this.openReport){
					this.openReport = false
				}
			})
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