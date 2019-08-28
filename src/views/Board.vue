<template>
	<div class="container-fluid">
		<settings />
		<div class="row">
			<div class="col-12 text-center">
				<banner />
				<p v-for="line in tag" class="lead font-weight-bold text-chan mb-2" :key="line.punchline">/{{line.ticker}}/ - {{line.punchline}}</p>
				<button class="btn btn-outline-chan" v-if="!thread">New Thread</button>
				<button class="btn btn-outline-chan" v-if="thread">New Reply</button>
				<hr>
			</div>
		</div>
		<router-view v-if="thread" />
		<div class="row" v-if="!thread">
			<p v-if="posts==''" class="text-center text-chan w-100 text-mono">no posts yet, do something about it!</p>
			<div class="col-12 thread-preview" v-for="(post, index) in posts" :key="'thread-'+index" :style="getHidden.includes(board+post.thread)?'height:2.2rem;':''">
				<div class="row">
					<div class="col-auto p-0">
						<button style="line-height: 1rem;" class="mt-2 p-0 px-1 btn btn-outline-chan-red text-mono" @click="setHidden(board+post.thread)">{{getHidden.includes(board+post.thread)?'+':'-'}}</button>
					</div>
					<div class="col" v-if="!getHidden.includes(board+post.thread)" :id="'thread-'+post.thread">
						<post class="op-container col-12 pl-0" :id="post.thread">
							<template #postSubject>
								{{post.subject}}
							</template>
							<template #postName>
								{{post.name}}
							</template>
							<template #postStamp>
								{{post.timestamp}}
							</template>
							<template #postNumber>
								No. {{post.thread}}
							</template>
							<template #openThread>
								<button style="line-height: 1rem;" class="mt-n1 mr-2 p-0 px-1 btn btn-outline-chan-red text-mono">
								<router-link :to="{name: 'thread', params: {'number': post.thread}}">
								V
								</router-link>
								</button>
							</template>
							<template #fileMeta>
								{{post.file.originalName}}
							</template>
							<template #fileThumb>
								<div v-lazy-container="{selector: 'img'}">
									<img :data-src="post.file.src" :data-loading="loading" style="max-width:100%; max-height:256px; object-fit: cover;" alt="">
								</div>
							</template>
							<template #postText>
								<blockquote class="mb-0">
									{{post.text}}
								</blockquote>
							</template>
						</post>
						<div class="row">
							<p class="text-mono small mb-1 ml-4">&gt;&gt; {{post.replies.length}} posts <span v-if="omittedImages(post)>0">and {{omittedImages(post)}} {{omittedImages(post)&gt;1?'images':'image'}}</span> omitted [
							<router-link :to="{name: 'thread', params: {'number': post.thread}}">
							view thread</router-link>
							]</p>
						</div>
						<post v-for="reply in post.replies" :key="reply.id" class="reply-container ml-5 col-auto" :id="reply.id">
							<template #postSubject>
								{{reply.subject}}
							</template>
							<template #postName>
								{{reply.name}}
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
								<div v-lazy-container="{selector: 'img'}">
									<img :data-src="reply.file.src" :data-loading="loading" style="max-width:100%; max-height:128px; object-fit: cover;" alt="">
								</div>
							</template>
							<template #postText>
								<blockquote class="mb-0">
									{{reply.text}}
								</blockquote>
							</template>
						</post>
					</div>
					<div class="col" v-if="getHidden.includes(board+post.thread)">
						<p class="chan-disabled text-mono small font-chan-red pt-2">Thread #{{post.thread}} hidden</p>
					</div>
				</div>
				
				<hr v-if="!getHidden.includes(board+post.thread)">
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	import Settings from '../components/Settings.vue'
	import Loading from '../assets/loading.gif'
	import Threads from '../components/board/threads.json'
	import Boards from '../components/navbar/boards.json'
	import Banner from '../components/board/Banner.vue'
	import NewThread from '../components/board/NewThread.vue'
	import Post from '../components/board/Post.vue'
	import PostExpand from '../components/board/PostExpand.vue'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		components: {
			Banner,
			NewThread,
			Post,
			PostExpand,
			Settings
		},
		data() {
			return {
				hiddenThreads: []
			}
		},
		methods: {
			...mapActions([
				'setHidden'
			]),
			hideThread(thread) {
				if(this.hiddenThreads.includes(thread)){
					this.hiddenThreads.splice(this.hiddenThreads.indexOf(thread), 1)
				}
				else {
					this.hiddenThreads.push(thread)
				}
			},
			omittedPosts(thread){

			},
			omittedImages(thread) {
				return thread.replies.filter(a => a.file.originalName != "").length
			},
		},
		computed: {
			...mapGetters([
				'getHidden'
			]),
			board() {
				return this.$route.params.ticker
			},
			thread() {
				return this.$route.params.number
			},
			posts() {
				return Threads.filter(a => a.board == this.board)
			},
			tag() {
				return Boards.filter(a => a.ticker == this.board)
			},
			loading() {
				return Loading
			}
		}
	}
</script>