<template>
	<div class="container-fluid px-0 px-sm-4">
		<div class="row">
			<div class="col text-center">
				<hr>
				<div class="row text-mono text-left">
					<div class="col-12 mb-2">
						<router-link tag="span" :to="{name: 'catalog'}">[<a>catalog</a>]</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<p v-if="threads==''" class="text-center text-chan w-100 text-mono">no posts yet, do something about it!</p>
			<div class="col-12 thread-preview" v-for="(post, index) in threads.slice((5*(page-1)),(5*(page-1))+5)" :key="'post.id-'+index" :style="getHidden.includes(board+post.id)?'height:2.2rem;':''" :id="'p'+post.id">
				<div class="row">
					<div class="col-auto p-0">
						<button style="line-height: 1rem;" class="d-none d-sm-inline mt-2 p-0 px-1 btn btn-outline-chan-red text-mono" @click="setHidden(board+post.id)">{{getHidden.includes(board+post.id)?'+':'-'}}</button>
					</div>
					<div class="col" v-if="!getHidden.includes(board+post.id)" :id="'thread-'+post.id">
						
						<post class="op-container col-12 pl-0" :id="'p'+post.id" :post="post.post" />
						<div class="row">
							<p class="text-mono small mb-1 ml-4 d-none d-sm-block" v-if="post.replies.length - 5 > 0">&gt;&gt; {{post.replies.length-5+' posts'}} <span v-if="omittedImages(post)>0">and {{omittedImages(post)}} {{omittedImages(post)&gt;1?'images':'image'}}</span> omitted [
							<router-link :to="{name: 'thread', params: {'number': post.id}}">
							view thread</router-link>
							]</p>
							<p class="text-mono small mb-1 ml-4 d-none d-sm-block" v-if="post.replies.length <= 0">&gt;&gt; No replies yet [
							<router-link :to="{name: 'thread', params: {'number': post.id}}">
							view thread</router-link>
							]</p>
						</div>
						<post v-for="reply in post.replies.slice(-5)" :key="reply.id" class="reply-container ml-5 col-auto d-none d-sm-block" :id="'p'+reply.id" :post="reply" />
					</div>
					<div class="col" v-if="getHidden.includes(board+post.id)">
						<p class="chan-disabled text-mono small font-chan-red pt-2">Thread #{{post.id}} hidden</p>
					</div>
				</div>
				
				<hr v-if="!getHidden.includes(board+post.id)" class=" d-none d-sm-block">
			</div>

			<div class="row w-100">
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
	// import Threads from './threads.json' //disable for axios testing
	// import Boards from '../navbar/boards.json'
	import Post from './Post.vue'
	import {mapGetters, mapActions} from 'vuex'
	import {eBus} from '../EventBus.js'

	export default{
		components: {
			Post
		},
		data() {
			return {
				// threads: [],
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
				'getLogin',
				'getDemo'
			]),
			board() {
				return this.$route.params.ticker
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
			boards() {
				return this.getDemo.boards
			},
			threads() {
				return this.getDemo.threads[this.board].slice().reverse()
			},
			// posts() { //switch returns if using axios or nah
			// 	//return this.threads.filter(a => a.board == this.board)
			// 	return this.threads.filter(a => a == this.board)
			// },
			tag() {
				return this.boards.filter(a => a.ticker == this.board)
			},
			pages() {
				if(this.threads.length>=5){
					return this.threads.length/5
				} else {
					return 1
				}
			}
		},
		updated(){
			this.componentKey = Math.floor(Math.random()*10)
		},
		mounted(){		//disable for dev
			/*Axios.get("https://ipfs.globalupload.io/QmTBxkQmp5dEqSspHELZRqUrWt5Neb62MGxg7opAcedpvE")
				.then(response => {this.threads = response.data})*/
			console.log(this.threads)
		},
		beforeRouteUpdate(to, from, next){
			eBus.$emit('boardChange')
			eBus.$emit('closeReply')
			eBus.$emit('closeNew')
			next()
		}
	}
</script>