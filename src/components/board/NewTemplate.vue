<template>
	<div class="card card-chan mb-2">
		<div class="card-header bg-chan p-0 border-0">
			<div class="row">
				<div class="col text-left input-group">
					<input class="border-left-0 border-top-0 form-control" type="text" placeholder="Subject (optional)" v-if="!isReply" v-model="postBody.subject">
					<input class="border-top-0 form-control" type="text" placeholder="Name (optional)" v-model="postBody.name">
					<input type="text" class="border-right-0 border-top-0 form-control" placeholder="Options (optional kek)" v-model="postBody.options">
				</div>
			</div>
		</div>
		<div class="card-body bg-chan-light p-1">
			<!-- @dev maybe split this into a card so text can flow around it -->
			<div class="row">
				<div class="col-4 pr-0">
					<p class="small mb-0 text-mono text-overflow">
						<input type="file" @change="fileSelect" style="display: none" ref="fileSelection">
						<button class="btn btn-outline-chan-red btn-block py-0" @click="$refs.fileSelection.click()" v-if="!filePreview">add file</button>
					</p>
					<img class="mw-100" style="max-height:200px; cursor: pointer;" :src="filePreview" v-if="filePreview" @click="$refs.fileSelection.click()"/>
					<p class="small mb-0 text-mono" v-if="filePreview">[<a href="javascript:void(0);" @click="fileClear()">clear</a>]</p>
				</div>
				<div class="col pl-1 font-chan-normal">
					<textarea class="form-control h-100" name="postContent" placeholder="&gt;implying you can encrypt unicode during testnet" style="line-height:1.1rem;" v-model="postBody.text"></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<p class="small">Please make sure to <router-link :to="{name: 'help'}">read our guidelines on how to stay anonymous</router-link> if that is important to you.</p>
					<p class="small mb-0"><i class="fal fa-gas-pump"></i> Gas Prices &mdash; Fast: {{gasPrice.fast/10}} | Average: {{gasPrice.average/10}} | Safe Low: {{gasPrice.safeLow/10}}</p>
				</div>
			</div>
		</div>
		<div class="card-footer bg-chan-light border-0">
			<div class="row">
				<div class="col-12 col-lg-6 mb-2 mb-lg-0" v-if="getPayment == 'none' || getPayment == 'zch'">
					<button class="btn btn-outline-chan btn-block" @click="writePost()"><i class="fab fa-creative-commons-zero"></i> Post with 1 ZCH</button>
				</div>
				<div class="col-12 col-lg-6" v-if="getPayment == 'none' || getPayment == 'eth'">
					<button class="btn btn-outline-chan btn-block"><i class="fab fa-ethereum"></i> Post with 0.0001 ETH</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	// some explanation for the cryptographic
	// process below, will be further detailed
	// in documentation but for now this is it
	import Axios from 'axios'
	import Tripcode from 'tripcode'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		data(){
			return{
				filePreview: null,
				fileRaw: null,
				postContent: '',
				encodePost: '',
				encodeSalt: '',
				equalizeSalt: '',
				xorResult: '',
				xorReverse: '',
				decryptPost: '',
				shaResult: null,
				shaDecrypt: null,
				gasPrice: {},
				bufferImage: null,
				eth: '0x7ac73ebb',
				postBody: {
					id: '',	// taken from boards postcounter in contract
					stamp: '',	// unix time
					file: {
						originalName: '',
						size: '',
						src: '',
						iv: ''	// iv generated from encryption algo
					},
					replyTo: [],
					name: '',
					subject: '',
					options: '',
					iv: '',
					text: ''
				},
				threadBody: {
					id: '',
					post: null,
					replies: [],
					hidden: []
				}
			}
		},
		props: {
			isReply: {
				default: false
			}
		},
		methods: {
			...mapActions([
				'setThread',
				'setReply'
			]),
			writePost(){
				let newId = this.postId(6)
				this.postBody.stamp = Date.now()
				this.postBody.id = newId
				if(this.postBody.name == ''){
					this.postBody.name = 'Anonymous'
				}
				if(!this.$route.params.number){
					this.threadBody.post = this.postBody
					this.threadBody.id = newId
					this.setThread({board: this.board, body: this.threadBody})
				} else {
					this.setReply({board: this.board, thread: this.thread, body: this.postBody})
				}
			},
			postId(len){
				let maxlen = 8
				let min = Math.pow(16, Math.min(len, maxlen)-1)
				let max = Math.pow(16, Math.min(len, maxlen)) -1
				let n = Math.floor(Math.random()*(max-min+1))+min
				let r = n.toString(16)
				while(r.length < len){
					r = r+this.postId(len - maxlen)
				}
				return r
			},
			fileSelect(e){
				const file = e.target.files[0]
				let vm = this
				this.filePreview = URL.createObjectURL(file)
				let fr = new FileReader()
				fr.readAsArrayBuffer(file)
				fr.onload = function(e){
					console.log(fr.result)
					vm.bufferImage = fr.result
				}
			},
			fileClear(){
				this.filePreview = null
				this.$refs.fileSelection.value = ''
			},
			refreshGas(){
				Axios.get("https://ethgasstation.info/json/ethgasAPI.json")
					.then(response => {this.gasPrice = response.data})
			},
			async genKey(passwd, mode, len){
				let algo = {
					name: 'PBKDF2',
					hash: 'SHA-256',
					salt: new TextEncoder().encode(this.saltMine),
					iterations: 1000
				}
				let derived = {
					name: mode,
					length: len
				}
				let encoded = new TextEncoder().encode(passwd)
				let key = await crypto.subtle.importKey('raw', encoded, {name: 'PBKDF2'}, false, ['deriveKey'])
				return crypto.subtle.deriveKey(algo, key, derived, false, ['encrypt', 'decrypt'])
			},
			async encrypt(text, passwd, mode, len, ivlen){
				let algo = {
					name: mode,
					length: len,
					iv: crypto.getRandomValues(new Uint8Array(ivlen))
				}
				let key = await this.genKey(passwd, mode, len)
				let encoded = new TextEncoder().encode(text)
				return {
					cipherText: await crypto.subtle.encrypt(algo, key, encoded),
					iv: algo.iv
				}
			},
			async decrypt(encrypted, passwd, mode, len){
				let algo = {
					name: mode,
					length: len,
					iv: encrypted.iv
				}
				let key = await this.genKey(passwd, mode, len)
				let decrypted = await crypto.subtle.decrypt(algo, key, encrypted.cipherText)
				return new TextDecoder().decode(decrypted)
			}
		},
		computed: {
			...mapGetters([
				'getDemo',
				'getPayment'
			]),
			counter(){
				return this.getDemo.boards.filter(a => a.ticker == this.board)
			},
			board(){
				return this.$route.params.ticker
			},
			thread() {
				return this.$route.params.number
			},
			threadId(){
				// since it's not possible to reliably 
				// fetch the next possible ID from the
				// contract, we have to provide an ID
				// for the first post in every thread
				return this.$route.params.number?this.$route.params.number:'OPISAFAGGOT'
			},
			saltMine(){
				// generates the salt to be used
				// dynamically based on the current
				// board and thread ID which stays 
				// the same within a single thread
				return this.$route.params.ticker+this.threadId
			}
		},
		mounted(){
			this.refreshGas()
		}
	}
</script>