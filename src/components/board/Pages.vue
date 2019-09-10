<template>
	<div class="container-fluid px-0 px-sm-4">
		<div class="row">
			<div class="col-auto p-0" v-if="openNew">
				<button style="line-height: 1rem;" class="mt-2 p-0 px-1 btn btn-outline-chan-red text-mono" @click="openNew = !openNew">&times;</button>
			</div>
			<div class="col text-center">
				<new-template v-if="openNew" /> <!-- supply slots in case of reply instead of new thread -->
				<button class="btn btn-outline-chan" v-if="!openNew && getLogin" @click="openNew = !openNew"><i class="far fa-plus"></i> {{!thread?'New Thread':'New Reply'}}</button>
				<hr>
				<div class="row text-mono text-left">
					<div class="col-12 mb-2">
						<router-link tag="span" :to="{name: 'catalog'}">[<a>catalog</a>]</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<p v-if="posts==''" class="text-center text-chan w-100 text-mono">no posts yet, do something about it!</p>
			<div class="col-12 thread-preview" v-for="(post, index) in posts.slice((5*(page-1)),(5*(page-1))+5)" :key="'post.thread-'+index" :style="getHidden.includes(board+post.thread)?'height:2.2rem;':''" :id="'p'+post.thread">
				<div class="row">
					<div class="col-auto p-0">
						<button style="line-height: 1rem;" class="d-none d-sm-inline mt-2 p-0 px-1 btn btn-outline-chan-red text-mono" @click="setHidden(board+post.thread)">{{getHidden.includes(board+post.thread)?'+':'-'}}</button>
					</div>
					<div class="col" v-if="!getHidden.includes(board+post.thread)" :id="'thread-'+post.thread">
						
						<post class="op-container col-12 pl-0" :id="'p'+post.thread" :post="post" />
						<div class="row">
							<p class="text-mono small mb-1 ml-4 d-none d-sm-block" v-if="post.replies.length - 5 > 0">&gt;&gt; {{post.replies.length-5+' posts'}} <span v-if="omittedImages(post)>0">and {{omittedImages(post)}} {{omittedImages(post)&gt;1?'images':'image'}}</span> omitted [
							<router-link :to="{name: 'thread', params: {'number': post.thread}}">
							view thread</router-link>
							]</p>
							<p class="text-mono small mb-1 ml-4 d-none d-sm-block" v-if="post.replies.length <= 0">&gt;&gt; No replies yet [
							<router-link :to="{name: 'thread', params: {'number': post.thread}}">
							view thread</router-link>
							]</p>
						</div>
						<post v-for="reply in post.replies.slice(-5)" :key="reply.id" class="reply-container ml-5 col-auto d-none d-sm-block" :id="'p'+reply.id" :post="reply" />
					</div>
					<div class="col" v-if="getHidden.includes(board+post.thread)">
						<p class="chan-disabled text-mono small font-chan-red pt-2">Thread #{{post.thread}} hidden</p>
					</div>
				</div>
				
				<hr v-if="!getHidden.includes(board+post.thread)" class=" d-none d-sm-block">
			</div>

			<div class="row w-100" v-if="!thread">
				{{thread}}
				<div class="col-12">
					<p class="text-mono text-center">
						<span v-for="n in pages" :key="'page-'+n">
							<router-link tag="span" v-if="n!=page" :to="{name: 'page', params: {'page': n}}">[<a>{{n}}</a>]</router-link>
							<span v-if="n==page">[{{n}}]</span>
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	//import Axios from 'axios'
	import Threads from './threads.json' //disable for axios testing
	import Boards from '../navbar/boards.json'
	import Post from './Post.vue'
	import NewTemplate from './NewTemplate.vue'
	import {mapGetters, mapActions} from 'vuex'
	

	export default{
		components: {
			Post,
			NewTemplate
		},
		data() {
			return {
				threads: [],
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
			omittedImages(thread) {
				return thread.replies.filter(a => a.file.originalName != "").length
			}
		},
		computed: {
			...mapGetters([
				'getHidden',
				'getForceAnon',
				'getLogin'
			]),
			board() {
				return this.$route.params.ticker
			},
			thread() {
				return this.$route.params.number
			},
			page() {
				let curPag = this.$route.params.page 
				if(curPag){
					return curPag
				}
				else{
					return 1
				}
			},
			posts() { //switch returns if using axios or nah
				//return this.threads.filter(a => a.board == this.board)
				return Threads.filter(a => a.board == this.board)
			},
			tag() {
				return Boards.filter(a => a.ticker == this.board)
			},
			pages() {
				return this.posts.length/5
			}
		},
		updated(){
			this.componentKey = Math.floor(Math.random()*10)
		},
		mounted(){		//disable for dev
			/*Axios.get("https://ipfs.globalupload.io/QmTBxkQmp5dEqSspHELZRqUrWt5Neb62MGxg7opAcedpvE")
				.then(response => {this.threads = response.data})*/
			
		}
	}
</script>