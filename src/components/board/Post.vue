<template>
	<div class="pr-0">
		<div class="card card-chan mb-2">
			<div class="card-header bg-chan p-0 border-0">
				<div class="row">
					<div class="col pl-4 pr-0 py-1">
						<p class="mb-0 font-chan-red">
							<router-link tag="button" :to="{name: 'thread', params: {'number': post.thread}}" style="line-height: 1rem;" class="mt-n1 mr-2 p-0 px-1 btn btn-outline-chan-red">
								<i class="fal fa-eye"></i>
							</router-link>
							<span class="post-subject font-weight-bold">
								{{post.subject}}
							</span>
							<span class="post-name font-chan-ok">
								{{getForceAnon?'Anonymous':post.name}}
							</span>
							- {{post.timestamp}}
							| {{post.thread}}
						</p>
					</div>
					<div class="col-auto mr-2">
						<p class="mb-0 font-chan-red">
							<button style="line-height: 1rem;" class="mt-1 p-0 px-1 btn btn-outline-chan-red text-mono">R</button>
						</p>
					</div>
				</div>
			</div>
			<div class="card-body bg-chan-light p-1">
				<div class="row">
					<div class="col-12">
						<div class="float-left mr-3 w-auto" style="max-width:30%;" v-if="!!post.file.originalName && getGrab">
							<p class="small mb-0 text-mono text-overflow">
								File: {{post.file.originalName}} [<a href="javascript:void(0);" @click="doResearch = !doResearch">?</a>]
							</p>
							<p class="small mb-0 text-mono" v-if="doResearch">
								[<a :href="'https://www.google.com/searchbyimage?image_url='+post.file.src" target="_blank">Google</a>] [<a :href="'https://iqdb.org/?url='+post.file.src" target="_blank">IQDB</a>] [<a :href="'https://saucenao.com/search.php?url='+post.file.src" target="_blank">Sauce</a>]
							</p>
							<p class="small mb-0 text-mono">
								(11.11 MB, 1920&times;1080)
							</p>
							<a :href="post.file.src" v-lazy-container="{selector: 'img'}">
								<img :data-src="post.file.src" :data-loading="loading" style="max-width:100%; max-height:256px; object-fit: cover;" alt="">
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
							Replies: <slot name="allThoseYous" /> <!-- @dev pass single replies as &gt;&gt;number -->
						</p>
					</div>
					<div class="col-auto">
						<button class="p-0 px-1 btn btn-outline-chan-red text-mono">(you)</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		data(){
			return{
				doResearch: false
			}
		},
		props: {
			post: {
				default: ''
			}
		},
		computed: {
			picRelated(){
				return !!this.$slots.fileMeta
			},
			hasReplies(){
				return !!this.$slots.replyCounter
			},
			...mapGetters([
				'getGrab',
				'getForceAnon'
			])
		}
	}
</script>