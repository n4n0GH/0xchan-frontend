<template>
	<div class="row">
		<div class="col-12 thread-view" v-for="(post, index) in posts" :key="'thread-'+index">
			<hr>
			<div class="row text-mono">
				<div class="col-6">
					[<router-link :to="{path: '/board/'+board}">return</router-link>]	
					[<router-link :to="{name: 'index'}">home</router-link>] 
				</div>
				<div class="col-6 text-right">
					(<span title="Replies">{{post.replies.length}}</span>/<span title="Images">{{imageCounter(post.replies)}}</span>)
				</div>
			</div>
				<div class="row mt-2">
					<div class="col" :id="'thread-'+post.thread">
						<post class="op-container col-12 pl-0" :id="'p'+post.thread" :post="post" />
						<post v-for="reply in post.replies" :key="reply.id" class="d-inline d-sm-block reply-container ml-sm-5 col-auto" :id="'p'+reply.id" :post="reply" />
					</div>
				</div>
				<p class="w-100 text-center text-mono">EOF</p>
				<div class="row text-mono">
				<div class="col-6">
					[<router-link :to="{path: '/board/'+board}">return</router-link>]	
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
	import Threads from '../components/board/threads.json'
	import Post from '../components/board/Post.vue'
	import {mapGetters} from 'vuex'
	import {eBus} from '../components/EventBus.js'

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
				'getForceAnon',
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
			}
		},
		beforeRouteUpdate(to, from, next){
			eBus.$emit('closeReply')
			next()
		}
	}
</script>