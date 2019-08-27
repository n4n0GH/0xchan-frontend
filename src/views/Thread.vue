<template>
	<div class="row">

		<div class="col-12 thread-view" v-for="(post, index) in posts" :key="'thread-'+index">
			<div class="row text-mono">
				<div class="col-6">
					[<router-link :to="{name: 'board', params: {ticker: board}}">return</router-link>]	
				</div>
				<div class="col-6 text-right">
					[<router-link :to="{name: 'index'}">home</router-link>] 
				</div>
			</div>
				<div class="row mt-2">
					<div class="col" :id="'thread-'+post.thread">
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
				</div>
				<p class="w-100 text-center text-mono">EOF</p>
			</div>
	</div>
</template>

<script>
/* eslint-disable */
	import Loading from '../assets/loading.gif'
	import Thread from '../components/board/thread.json'
	import Post from '../components/board/Post.vue'

	export default {
		components: {
			Post,
		},
		data() {
			return {
			}
		},
		computed: {
			thread() {
				return this.$route.params.number
			},
			board() {
				return this.$route.params.ticker
			},
			posts() {
				//return Thread.filter(a => a.board == this.board)
				return Thread.filter(a => a.board == 'biz') //static for demo
			},
			loading() {
				return Loading
			}
		}
	}
</script>