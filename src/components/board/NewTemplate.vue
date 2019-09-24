<template>
	<div class="card card-chan mb-2">
		<div class="card-header bg-chan p-0 border-0">
			<div class="row">
				<div class="col text-left input-group">
					<input class="border-left-0 border-top-0 form-control" type="text" placeholder="Subject (optional)" v-if="!isReply">
					<input class="border-top-0 form-control" type="text" placeholder="Name (optional)">
					<input type="text" class="border-right-0 border-top-0 form-control" placeholder="Options (optional kek)">
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
					<textarea class="form-control h-100" name="postContent" placeholder="&gt;implying you have anything worth posting anyway" style="line-height:1.1rem;" v-model="postContent"></textarea>
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
				<div class="col-12 col-lg-6 mb-2 mb-lg-0">
					<button class="btn btn-outline-chan btn-block"><i class="fab fa-creative-commons-zero"></i> Post with 1 ZCH</button>
				</div>
				<div class="col-12 col-lg-6">
					<button class="btn btn-outline-chan btn-block"><i class="fab fa-ethereum"></i> Post with 0.0001 ETH</button>
				</div>
				<button class="btn" @click="encryptData(saltMine, postContent)">encrypt</button>
				<button class="btn" @click="decryptData(saltMine, xorResult)">decrypt</button> <br>
				<span class="text-mono" style="overflow:auto">
					post: {{encodePost}} <br>
					salt: {{equalizeSalt}} <br>
					xor: {{xorResult}} <br>
					xorRev: {{xorReverse}} <br>
					decrypt: {{decryptPost}}
				</span>
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
	
	export default {
		data(){
			return{
				filePreview: null,
				postContent: '',
				encodePost: '',
				encodeSalt: '',
				equalizeSalt: '',
				xorResult: '',
				xorReverse: '',
				decryptPost: '',
				shaResult: null,
				shaDecrypt: null,
				gasPrice: {}
			}
		},
		props: {
			isReply: {
				default: false
			}
		},
		methods: {
			fileSelect(e){
				const file = e.target.files[0]
				this.filePreview = URL.createObjectURL(file)
				let fr = new FileReader()
				fr.readAsText(file)
				fr.onload = function(e){
					console.log(fr.result)

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
			toHex(s){
				// take a string s and turn it into 
				// it's hexadecimal representation
				// console.log(s)
				let hex
				let arr = []
				for(let n = 0; n < s.length; n++){
					let char = Number(s.charCodeAt(n))
					// check if the char to encode is a
					// LF and prepend a 0 to prevent
					// parsing errors during decoding
					if(char == 10){
						hex = '0'+char.toString(16)
					} else {
						hex = char.toString(16)
					}
					// console.log(s.charCodeAt(n)+' -> '+hex)
					arr.push(hex)
				}
				return arr.join('')
			},
			fromHex(s){
				// take a string s and return it
				// into it's non-hex representation
				let hex = s.toString()
				let arr = []
				for(let n = 0; n < s.length; n+= 2){
					arr.push(String.fromCharCode(parseInt(s.substr(n, 2), 16)))
					// console.log(arr)
				}
				return arr.join('')
			},
			equalize(s, m){
				// take salt s and repeat for length 
				// of message m to equalize length of
				// XOR pairs. s will shrink if s > m
				return m.slice(0,0).padStart(m.length, s)
			},
			xor(a, b){
				// setting up basic bitwise XOR function
				// to use on salt a and message b resulting
				// in output res which is gonna go on IPFS
				let res = []
				for(let i=0; i<a.length; i++){
					let hex = Number('0x'+a[i]^'0x'+b[i]).toString(16)
					res.push(hex)
				}
				return res.join('')
			},
			encryptData(s, m){
				// function grabs the salt s to encrypt with
				// as well as the message m to encrypt as params
				// construct the final output
				
				// encode post content to hexadecimal
				this.encodePost = this.toHex(m)
				console.log('hexed post: '+this.encodePost)

				// encode salt to hexadecimal
				this.encodeSalt = this.toHex(s)
				console.log('hexed salt: '+this.encodeSalt)

				// equalize length of encoded salt
				// to match length of encoded post
				this.equalizeSalt = this.equalize(this.encodeSalt, this.encodePost)
				console.log('equalized: '+this.equalizeSalt)

				// begin bitwise XOR of the content
				this.xorResult = this.xor(this.equalizeSalt, this.encodePost)
				console.log('xor: '+this.xorResult)

			},
			decryptData(s, m){
				// for dev purpose static data, change to variables s and m later
				// XOR encoded salt s against message m
				this.xorReverse = this.xor(this.equalizeSalt, this.xorResult)
				console.log('reverse xor: '+this.xorReverse)

				// decode this.xorReverse in byte pairs
				this.decryptPost = this.fromHex(this.xorReverse)
				console.log('decrypted: '+this.decryptPost)
			}
		},
		computed: {
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