<template>
	<div class="pr-0">
		<div class="card card-chan mb-2">
			<div class="card-header bg-chan p-0 border-0">
				<div class="row">
					<div class="col pl-4 py-1">
						<p class="mb-0 font-chan-red">
							<span class="post-subject font-weight-bold">
								<slot name="postSubject" />
							</span>
							<span class="post-name font-chan-ok">
								<slot name="postName" />
							</span>
							- <slot name="postStamp" />
							| <slot name="postNumber" />
							<slot name="openThread" />
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
				<!-- @dev maybe split this into a card so text can flow around it -->
				<div class="row">
					<div class="col-12">
						<div class="float-left mr-3 w-auto" style="max-width:30%;" v-if="picRelated && getGrab">
							<p class="small mb-0 text-mono text-overflow">
								File: <slot name="fileMeta" /> [<a href="javascript:void(0);" @click="doResearch = !doResearch">?</a>]
							</p>
							<p class="small mb-0 text-mono" v-if="doResearch">
								<slot name="fileLookup" />
							</p>
							<p class="small mb-0 text-mono">
								(11.11 MB, 1920&times;1080)
							</p>
							<slot name="fileThumb" />
						</div>
						<div class="font-chan-normal">
							<slot name="postText" />
						</div>
						{{post.thread}}
					</div>
				</div>
				<div class="row mt-2" v-if="picRelated && !getGrab">
					<div class="col">
						<p class="small mb-0 text-mono">
							File omitted: <slot name="fileMeta" /> (11.11 MB, 1920&times;1080) [<a :href="fileLink" target="_blank">view</a>]
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
			fileLink: {
				type: String,
				default: ''
			},
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
				'getGrab'
			])
		}
	}
</script>