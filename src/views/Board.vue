<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 text-center">
				<banner :key="componentKey"/>
				<p v-for="line in tag" class="lead font-weight-bold text-chan mb-2" :key="line.punchline">/{{line.ticker}}/ - {{line.punchline}}</p>
				<new-template v-if="openNew"/> <!-- supply slots in case of reply instead of new thread -->
				<button class="btn btn-outline-chan" v-if="!openNew" @click="openNew = !openNew"><i class="far fa-plus"></i> {{!thread?'New Thread':'New Reply'}}</button>
			
				<hr>
			</div>
		</div>
		<router-view v-if="thread" />
		<div class="row" v-if="!thread">
			<p v-if="posts==''" class="text-center text-chan w-100 text-mono">no posts yet, do something about it!</p>
			<div class="col-12 thread-preview" v-for="(post, index) in posts" :key="'thread-'+index" :style="getHidden.includes(board+post.thread)?'height:2.2rem;':''" :id="'p'+post.thread">
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
								{{getForceAnon?'Anonymous':post.name}}
							</template>
							<template #postStamp>
								{{post.timestamp}}
							</template>
							<template #postNumber>
								No. {{post.thread}}
							</template>
							<template #openThread>
								<router-link tag="button" :to="{name: 'thread', params: {'number': post.thread}}" style="line-height: 1rem;" class="mt-n1 mr-2 p-0 px-1 btn btn-outline-chan-red text-mono">
								V
								</router-link>
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
						<div class="row">
							<p class="text-mono small mb-1 ml-4" v-if="post.replies.length - 5 > 0">&gt;&gt; {{post.replies.length-5+' posts'}} <span v-if="omittedImages(post)>0">and {{omittedImages(post)}} {{omittedImages(post)&gt;1?'images':'image'}}</span> omitted [
							<router-link :to="{name: 'thread', params: {'number': post.thread}}">
							view thread</router-link>
							]</p>
							<p class="text-mono small mb-1 ml-4" v-if="post.replies.length <= 0">&gt;&gt; No replies yet [
							<router-link :to="{name: 'thread', params: {'number': post.thread}}">
							view thread</router-link>
							]</p>
						</div>
						<post v-for="reply in post.replies.slice(-5)" :key="reply.id" class="reply-container ml-5 col-auto" :id="reply.id">
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
	import Loading from '../assets/loading.gif'
	import Threads from '../components/board/threads.json'
	import Boards from '../components/navbar/boards.json'
	import Banner from '../components/board/Banner.vue'
	import NewThread from '../components/board/NewThread.vue'
	import Post from '../components/board/Post.vue'
	import PostExpand from '../components/board/PostExpand.vue'
	import NewTemplate from '../components/board/NewTemplate.vue'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		components: {
			Banner,
			NewThread,
			Post,
			PostExpand,
			NewTemplate
		},
		data() {
			return {
				hiddenThreads: [],
				componentKey: 0,
				openNew: false
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
			}
		},
		computed: {
			...mapGetters([
				'getHidden',
				'getForceAnon'
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
		},
		updated(){
			this.componentKey = Math.floor(Math.random()*10)
		}
	}
</script>