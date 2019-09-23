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
				<div class="col-4">
					<p class="small mb-0 text-mono text-overflow">
						<input type="file" @change="fileSelect">
					</p>
					<img class="mw-100" style="max-height:200px;" :src="filePreview" v-if="filePreview" />
				</div>
				<div class="col-8 font-chan-normal">
					<textarea class="form-control" name="postContent" placeholder="&gt;implying you have anything worth posting anyway" style="line-height:1.1rem;"></textarea>
					
				</div>
			</div>
			<div class="row">
				<div class="col">
					<p class="small">Please make sure to <router-link :to="{name: 'help'}">read our guidelines on how to stay anonymous</router-link> if that is important to you.</p>
					<p class="small mb-0"><i class="fal fa-gas-pump"></i> Gas Prices &mdash; Fast: {{gasPrice.fast/10}} | Average: {{gasPrice.average/10}} | Safe Low: {{gasPrice.safeLow/10}}</p>
				</div>
			</div>
		</div>
		<div class="card-footer bg-chan-light border-0 p-0">
			<div class="row">
				<div class="col">
					<button class="btn btn-outline-chan btn-block border-left-0 border-right-0 border-bottom-0">Submit</button>
					<span @click="encryptData(saltMine, gasPrice)">salt: {{saltMine}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// some explanation for the cryptographic
	// process below, will be further detailed
	// in documentation but for now this is it
	import Axios from 'axios'
	
	export default {
		data(){
			return{
				filePreview: null,
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
			},
			refreshGas(){
				Axios.get("https://ethgasstation.info/json/ethgasAPI.json")
					.then(response => {this.gasPrice = response.data})
			},
			toHex(str){
				// take a string and turn it into it's 
				// hex representation
				let arr = []
				for(let n=0, l=str.length; n<l; n++){
					let hex = Number(str.charCodeAt(n)).toString(16)
					arr.push(hex)
				}
				return arr.join('')
			},
			equalize(s, m){
				// take salt s and repeat for length 
				// of message m to equalize length of
				// XOR pairs. s will shrink if s>m
				return this.toHex(m).slice(0,0).padStart(this.toHex(m).length, s)
			},
			xor(a, b){
				// setting up basic bitwise
				// XOR operation to use on salt a and message b
				// resulting in output res which is gonna go on IPFS
				if(!Buffer.isBuffer(a)) a = new Buffer(a)
				if(!Buffer.isBuffer(b)) b = new Buffer(b)
				let res = []
				for(let i=0; i<a.length; i++){
					res.push(a[i]^b[i])
				}
				return new Buffer(res)
			},
			encryptData(salt, message){
				// function grabs the salt to encrypt with
				// as well as the message to encrypt as params
				// construct the final output
				let secret = this.equalize(this.toHex(salt))
				let encode = this.toHex(message)

				console.log(this.xor(secret, encode))

			}
		},
		computed: {
			threadID(){
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
				return this.$route.params.ticker+this.threadID
			}
		},
		mounted(){
			Axios.get("https://ethgasstation.info/json/ethgasAPI.json")
				.then(response => {this.gasPrice = response.data})
		}
	}
</script>