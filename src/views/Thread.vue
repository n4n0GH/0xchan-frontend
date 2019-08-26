<template>
	<div>
		<p>This is thread {{thread}}</p>
		[<router-link :to="{name: 'board', params: {ticker: board}}">Return</router-link>]
	</div>
</template>

<script>
/* eslint-disable */
	import Threads from '../components/board/threads.json'
	import Banner from '../components/board/Banner.vue'
	import NewThread from '../components/board/NewThread.vue'
	import Post from '../components/board/Post.vue'
	import PostExpand from '../components/board/PostExpand.vue'

	export default {
		components: {
			Banner,
			NewThread,
			Post,
			PostExpand
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
			}
		}
	}
</script>