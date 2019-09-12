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
		<div class="col-6 col-md-4 col-xl-2 mb-2" v-for="post in posts" :key="post.number">
			<catalog-item v-if="!getHidden.includes(board+post.thread)">
				<template #threadReplies>
					{{post.replies.length}}
				</template>
				<template #threadImages>
					{{imageCounter(post.replies)}}
				</template>
				<template #threadView>
					[<router-link :to="{name: 'thread', params: {'number': post.thread}}">v</router-link>]
				</template>
				<template #threadHide>
					[<a href="javascript:void(0);" @click="setHidden(board+post.thread)">-</a>]
				</template>
				<template #opImage v-if="getGrab">
					<router-link :to="{name: 'thread', params: {'number': post.thread}}" v-lazy-container="{selector: 'img'}">
						<img :data-src="post.file.src" :data-loading="loading" style="width:100%; max-height:256px; object-fit: cover;" alt="">
					</router-link>
				</template>
				<template #threadSubject>
					{{post.subject?post.subject+':':''}}
				</template>
				<template #threadText>
					{{post.text.length>150?post.text.slice(0,150)+'...':post.text}}
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
					[<router-link :to="{name: 'thread', params: {'number': post.thread}}">v</router-link>]
				</template>
				<template #threadHide>
					[<a href="javascript:void(0);" @click="setHidden(board+post.thread)">+</a>]
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
	import Threads from '../components/board/threads.json'
	import NewTemplate from '../components/board/NewTemplate.vue'

	import {mapGetters, mapActions} from 'vuex'

	export default {
		data(){
			return {
				hiddenThreads: [],
				openNew: false
			}
		},
		components: {
			CatalogItem,
			NewTemplate
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
				'getLogin'
			]),
			board() {
				return this.$route.params.ticker
			},
			posts() { //switch returns if using axios or nah
				//return this.threads.filter(a => a.board == this.board)
				return Threads.filter(a => a.board == this.board)
			},
			loading() {
				return Loading
			}
		}
	}
</script>
