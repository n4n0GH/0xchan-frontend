<template>
	<div>

		<div class="col-12 thread-preview" v-for="(post, index) in posts" :key="'thread-'+index">
		[<router-link :to="{name: 'index'}">Home</router-link>] 
		[<router-link :to="{name: 'board', params: {ticker: board}}">Return</router-link>]
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
								<img v-lazy="post.file.src" style="width:100%; max-height:256px; object-fit: cover;" alt="">
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
									<img v-lazy="reply.file.src" style="width:100%; max-height:128px; object-fit: cover;" alt="">
							</template>
							<template #postText>
								<blockquote class="mb-0">
									{{reply.text}}
								</blockquote>
							</template>
						</post>
					</div>
				</div>
				<hr>
			</div>
	</div>
</template>

<script>
/* eslint-disable */
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
			}
		}
	}
</script>