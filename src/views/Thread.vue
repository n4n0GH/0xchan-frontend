<template>
	<div class="row">

		<div class="col-12 thread-view" v-for="(post, index) in posts" :key="'thread-'+index">
			<div class="row text-mono">
				<div class="col-6">
					[<a href="javascript:history.back();">return</a>]	
					[<router-link :to="{name: 'index'}">home</router-link>] 
				</div>
				<div class="col-6 text-right">
					({{post.replies.length}}/{{imageCounter(post.replies)}})
				</div>
			</div>
				<div class="row mt-2">
					<div class="col" :id="'thread-'+post.thread">
						<post class="op-container col-12 pl-0" :id="'p'+post.thread">
							<template #postSubject>
								{{post.subject}}
							</template>
							<template #postName>
								{{getForceAnon?'Anonymous':post.name}}
							</template>
							<template #postStamp>
								{{post.timestamp}}
							</template>
							<template #postNumber>
								No. {{post.thread}}
							</template>
							<template #fileMeta>
								{{post.file.originalName}}
							</template>
							<template #fileThumb>
								<a :href="post.file.src" v-lazy-container="{selector: 'img'}">
									<img :data-src="post.file.src" :data-loading="loading" style="max-width:100%; max-height:256px; object-fit: cover;" alt="">
								</a>
							</template>
							<template #postText>
								<blockquote class="mb-0" v-html="post.text">
									{{post.text}}
								</blockquote>
							</template>
						</post>
						<post v-for="reply in post.replies" :key="reply.id" class="reply-container ml-5 col-auto" :id="'p'+reply.id">
							<template #postSubject>
								{{reply.subject}}
							</template>
							<template #postName>
								{{getForceAnon?'Anonymous':reply.name}}
							</template>
							<template #postStamp>
								{{reply.timestamp}}
							</template>
							<template #postNumber>
								No. {{reply.id}}
							</template>
							<template #fileMeta v-if="reply.file.originalName != ''">
								{{reply.file.originalName}}
							</template>
							<template #fileThumb v-if="reply.file.src != 'undefined'">
								<a :href="reply.file.src" v-lazy-container="{selector: 'img'}">
									<img :data-src="reply.file.src" :data-loading="loading" style="max-width:100%; max-height:128px; object-fit: cover;" alt="">
								</a>
							</template>
							<template #postText>
								<blockquote class="mb-0" v-html="reply.text">
									{{reply.text}}
								</blockquote>
							</template>
						</post>
					</div>
				</div>
				<p class="w-100 text-center text-mono">EOF</p>
				<div class="row text-mono">
				<div class="col-6">
					[<a href="javascript:history.back();">return</a>]	
				</div>
				<div class="col-6 text-right">
					[<router-link :to="{name: 'index'}">home</router-link>] 
				</div>
			</div>
			</div>
	</div>
</template>

<script>
/* eslint-disable */
	import Loading from '../assets/loading.gif'
	import Thread from '../components/board/thread.json'
	import Threads from '../components/board/threads.json'
	import Post from '../components/board/Post.vue'
	import {mapGetters} from 'vuex'

	export default {
		components: {
			Post,
		},
		data() {
			return {
			}
		},
		methods: {
			imageCounter(c) {
				return c.reduce(function(n, x){
					return n + (x.file.originalName != '');
				}, 0)
			}
		},
		computed: {
			...mapGetters([
				'getForceAnon'
			]),
			thread() {
				return this.$route.params.number
			},
			board() {
				return this.$route.params.ticker
			},
			preSelect() {
				return Threads.filter(a => a.board == this.board)
			},
			posts() {
				return this.preSelect.filter(a => a.thread == this.thread)
			},
			loading() {
				return Loading
			},
		}
	}
</script>