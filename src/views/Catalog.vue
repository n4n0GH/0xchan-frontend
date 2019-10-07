<template>
	<div class="row">
		<div class="col-12 mb-2">
			<div class="row">
				<div class="col text-mono">
				<hr>
					[<a href="javascript:history.back();">return</a>]
				</div>
			</div>
		</div>
		<div class="col-6 col-md-4 col-xl-2 mb-2" v-for="(post, index) in posts" :key="post.id+index">
			<catalog-item v-if="!getHidden.includes(board+post.id)">
				<template #threadReplies>
					{{post.replies.length}}
				</template>
				<template #threadImages>
					{{imageCounter(post.replies)}}
				</template>
				<template #threadView>
					[<router-link :to="{name: 'thread', params: {'number': post.id}}">v</router-link>]
				</template>
				<template #threadHide>
					[<a href="javascript:void(0);" @click="setHidden(board+post.id)">-</a>]
				</template>
				<template #opImage v-if="getGrab">
					<router-link :to="{name: 'thread', params: {'number': post.id}}" v-lazy-container="{selector: 'img'}" v-if="post.post.file.src">
						<img :data-src="post.post.file.src" :data-loading="loading" style="width:100%; max-height:256px; object-fit: cover;" alt="">
					</router-link>
				</template>
				<template #threadSubject>
					{{post.post.subject?post.post.subject+':':''}}
				</template>
				<template #threadText>
					{{post.post.text.length>150?post.post.text.slice(0,150)+'...':post.post.text}}
				</template>
			</catalog-item>
			<catalog-item v-else>
				<template #threadReplies>
					{{post.replies.length}}
				</template>
				<template #threadImages>
					{{imageCounter(post.replies)}}
				</template>
				<template #threadView>
					[<router-link :to="{name: 'thread', params: {'number': post.id}}">v</router-link>]
				</template>
				<template #threadHide>
					[<a href="javascript:void(0);" @click="setHidden(board+post.id)">+</a>]
				</template>
				<template #threadText>
					<span class="text-mono">thread hidden</span>
				</template>
			</catalog-item>
		</div>
	</div>
</template>

<script>
	import CatalogItem from '../components/board/CatalogItem.vue'
	import Loading from '../assets/loading.gif'
	// import Threads from '../components/board/threads.json'

	import {mapGetters, mapActions} from 'vuex'

	export default {
		data(){
			return {
				hiddenThreads: [],
				openNew: false
			}
		},
		components: {
			CatalogItem
		},
		methods:{
			...mapActions([
				'setHidden'
			]),
			imageCounter(c) {
				return c.reduce(function(n, x){
					return n + (x.file.originalName != '');
				}, 0)
			}
		},
		computed: {
			...mapGetters([
				'getHidden',
				'getGrab',
				'getLogin',
				'getDemo'
			]),
			board() {
				return this.$route.params.ticker
			},
			threads() {
				return this.getDemo.threads
			},
			posts() { //switch returns if using axios or nah
				//return this.threads.filter(a => a.board == this.board)
				// return Threads.filter(a => a.board == this.board)
				return this.threads[this.board]
			},
			loading() {
				return Loading
			}
		}
	}
</script>
