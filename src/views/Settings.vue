<template>
	<div class="container-fluid">
		<div class="row">
			<div class="pr-0 w-100">
				<div class="card card-chan mb-2">
					<div class="card-header bg-chan p-0 border-0">
						<div class="row">
							<div class="col pl-4 py-1">
								<p class="mb-0 font-chan-red">
									<span class="post-subject font-weight-bold">
										Settings
									</span>
								</p>
							</div>
						</div>
					</div>
					<div class="card-body bg-chan-light">
						<div class="row">
						</div>
						<div class="row">
							<div class="col">
								<p class="display-4 text-center">Content</p>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">SFW Mode</p>
								<p class="small font-chan-normal">0xchan will not auto-fetch images by default. Think twice before flipping the switch.</p>
							</div>
							<div class="col-12 col-sm-2">
								<button 
								class="p-0 px-1 w-100 btn btn-outline-chan-red text-mono"
								@click="switcheroo()">is: {{getGrab?'off':'on'}}</button>
							</div>
						</div>
						<!-- <transition name="fade" mode="out-in">
						<div class="row" v-if="getGrab">
							<div class="col">
								<p class="mb-0 lead">Eco Mode</p>
								<p class="small font-chan-normal">Limit the filesize of files to be downloaded to n MB. Useful if you have a limited Dataplan.</p>
							</div>
							<div class="col-12 col-sm-2">
								<button 
								class="p-0 px-1 w-100 btn btn-outline-chan-red text-mono"
								@click="ecotoggle()">is: {{getEco?'on':'off'}}</button>
							</div>
						</div>
						</transition> -->
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Force Anonymous</p>
								<p class="small font-chan-normal">Removes custom names from posts and replaces them with 'Anonymous'.</p>
							</div>
							<div class="col-12 col-sm-2">
								<button class="p-0 w-100 px-1 btn btn-outline-chan-red text-mono" @click="setBool('mutAnon')">is: {{getForceAnon?'on':'off'}}</button>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Custom Board List</p>
								<p class="small mb-0 font-chan-normal">Define your own set of boards you wish to see in the navigation. Shortcode seperated by comma. Use an exclamation mark at the beginning of your list to exclude the boards from the list.</p>
								<p><input type="text" v-model.trim="boardList" placeholder="a, b OR !a, b" class="pl-1 w-100 form-control text-mono"></p>
							</div>
							<div class="col-12 col-sm-2">
								<button class="btn btn-outline-chan p-0 w-100 px-1 text-mono" @click="saveList()">save()</button>
								<button class="btn btn-outline-danger mt-2 p-0 w-100 px-1 text-mono" @click="resetList()" v-if="getUserBoards.length>0">clear()</button>
							</div>
						</div>
						<hr>
						<div class="row">
							<div class="col">
								<p class="display-4 text-center">Theme</p>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Comfy Mode</p>
								<p class="small font-chan-normal">Removes sidebar on desktop devices.</p>
							</div>
							<div class="col-12 col-sm-2"><button class="btn btn-outline-chan-red text-mono p-0 w-100 px-1" @click="setBool('mutComfy')">is: {{getComfy?'on':'off'}}</button></div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Auto Switch</p>
								<p class="small font-chan-normal">Switch styles between Yotsuba and Yotsuba B when toggling NSFW mode.</p>
							</div>
							<div class="col-12 col-sm-2">
								<button 
								class="p-0 w-100 px-1 btn btn-outline-chan-red text-mono"
								@click="setBool('mutAuto')">is: {{getAutoSwitch?'on':'off'}}</button>
							</div>
						</div>
						<transition name="fade" mode="out-in">
						<div class="row" v-if="!getAutoSwitch">
							<div class="col">
								<p class="mb-0 lead">Theme Selector</p>
								<p class="small font-chan-normal mb-0">Choose your favorite theme to use for 0xchan.</p>
								<p class="mb-0 form-group">
									<select class="form-control" v-model="themeSelect" @change="saveTheme()">
										<option>Yotsuba</option>
										<option>YotsubaB</option>
										<option>Photon</option>
										<option>Tomorrow</option>
										<option>Floeeens</option>
										<option>Custom</option>
									</select>
								</p>
							</div>
							<!-- <div class="col-12 col-sm-2">
									<button class="p-0 w-100 px-1 btn btn-outline-chan text-mono" @click="modTheme()" v-if="themeSelect!='Custom'">modify()</button>
							</div> -->
						</div>
						</transition>
						<transition name="fade" mode="out-in">
						<div v-if="themeSelect=='Custom'">
							<div class="row">
								<div class="col-12 col-xl-7 mt-2">
									<textarea name="customCss" rows="4" class="w-100 form-control text-mono" placeholder="Paste your CSS here" v-model="custom"></textarea>
									<button class="p-0 px-1 btn btn-block btn-outline-chan mt-2 text-mono" @click="updateCustom()">
										saveStyle()
									</button>
								</div>
								<div class="col-12 col-xl-5">
									<p class="mb-0 lead">Preview</p>
									<p class="mb-0 small font-chan-normal">Save styles to see changes.</p>
									<mini-preview />
								</div>
							</div>
						</div>
						</transition>
						<hr>
						<div class="row">
							<div class="col">
								<p class="display-4 text-center">Misc</p>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Preferred Currency</p>
								<p class="small font-chan-normal">Select your preferred currency to be used when paying for actions.</p>
								<p class="mb-0 form-group">
									<select name="currencySelect" id="" class="form-control" v-model="currency" @change="updateCurrency()">
										<option value="none">No Preference</option>
										<option value="zch">Pay with ZCH</option>
										<option value="eth">Pay with ETH</option>
									</select>
								</p>
								<transition name="fade" mode="out-in">
								<p class="small font-chan-normal" v-if="currency=='none'">You can decide which currency to use in the UI.</p>
								<p class="small font-chan-normal" v-if="currency=='zch'">You will use and burn your ZCH. If your ZCH runs out, the system will use ETH instead.</p>
								<p class="small font-chan-normal" v-if="currency=='eth'">You will use ETH for all transactions.</p>
								</transition>
							</div>
						</div>
						<!-- <div class="row">
							<div class="col">
								<p class="mb-0 lead">Custom IPFS Gateway</p>
								<p class="small font-chan-normal">Use your own IPFS Gateway instead of the 0xchan one.</p>
							</div>
							<div class="col-12 col-sm-2"><button class="btn btn-outline-chan-red text-mono p-0 w-100 px-1" @click="setBool('mutCustomGate')">is: {{getCustomGate?'on':'off'}}</button><button class="btn btn-outline-chan mt-2 text-mono p-0 w-100 px-1" @click="setCustomGate()" v-if="getCustomGate">save()</button></div>
						</div>
						<transition name="fade" mode="out-in">
						<div class="input-group" v-if="getCustomGate">
							<div class="input-group-prepend">
								<span class="input-group-text border-chan-red bg-chan-light font-chan-red">Protocol</span>
							</div>
							<select name="currencySelect" id="" class="form-control" v-model="customProtocol">
								<option value="https">HTTPS</option>
								<option value="http">HTTP</option>
							</select>

							<div class="input-group-prepend">
								<span class="input-group-text border-chan-red bg-chan-light font-chan-red">Address</span>
							</div>
							<input type="text" class="form-control" placeholder="ipfs.yourplace.io" v-model="customAddress">

							<div class="input-group-prepend">
								<span class="input-group-text border-chan-red bg-chan-light font-chan-red">Port</span>
							</div>
							<input type="number" class="form-control" placeholder="5001" v-model="customPort">
						</div>
						</transition> -->
 
						<hr>
						<div class="row">
							<div class="col">
								<p class="display-4 text-center">States</p>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Save States</p>
								<p class="small font-chan-normal">Store your settings to a JSON file on your device.</p>
							</div>
							<div class="col-12 col-sm-2">
								<a :href="blobURL" class="btn btn-outline-chan p-0 w-100 px-1 text-mono">save()</a>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Load States</p>
								<p class="small font-chan-normal">Auto-Load your settings from a JSON file.</p>
								<input type="file" @change="fileSelect" style="display:none;" ref="loadSelection">
							</div>
							<div class="col-12 col-sm-2">
								<button class="p-0 w-100 px-1 btn btn-outline-chan text-mono" @click="$refs.loadSelection.click()">load()</button>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<p class="mb-0 lead">Clear States</p>
								<p class="small font-chan-normal">Reset settings to factory default. Refreshes page to take effect.</p>
							</div>
							<div class="col-12 col-sm-2">
								<button class="p-0 w-100 px-1 btn btn-outline-danger text-mono" @click="clearState()">clear()</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import MiniPreview from '../components/MiniPreview.vue'

	export default {
		data(){
			return{
				themeSelect: '',
				custom: '',
				boardList: '',
				boardArray: [],
				tempArray: [],
				currency: '',
				eco: null,
				customAddress: '',
				customPort: '',
				customProtocol: 'https'
			}
		},
		components: {
			MiniPreview
		},
		methods: {
			...mapActions([
				'setBool',
				'setTheme',
				'setCss',
				'setBoardList',
				'setBoardListReset',
				'setPayment'
			]),
			saveList(){
				if(this.boardList){
					if(this.boardList.startsWith('!')){
						this.boardList.replace(/!/, "").replace(/^,/, "").replace(/,\s*$/, "").split(',').map(s => {
							this.tempArray.push(s.trim())
						})
						let vm = this
						let negateList = this.allBoards.filter(function(word){
							return !vm.tempArray.includes(word)
						})
						negateList.map(b => {
							let bObj = {}
							bObj['ticker'] = b.trim()
							this.boardArray.push(bObj)
						})
						this.setBoardList(negateList)
					} else {
						this.boardList.replace(/^,/, "").replace(/,\s*$/, "").split(',').map(s => {
							let bObj = {}
							bObj['ticker'] = s.trim()
							this.boardArray.push(bObj)
						})
					}
					this.setBoardList(this.boardArray)
				}
			},
			resetList(){
				if(confirm("Are you sure you want to reset your custom board list?")){
					this.setBoardListReset()
					this.$router.go()
				}
			},
			clearState(){
				if(confirm("Are you sure you want to reset your custom settings?")){
					localStorage.clear()
					this.$router.go()
				}
			},
			saveTheme(){
				this.setTheme(this.themeSelect)
				if(this.themeSelect=='Custom'){
					this.setCss(this.custom)
				} else {
					this.$router.go()
				}
			},
			modTheme(){
				/*let file = require(`@/assets/css/${this.getTheme}.css`)*/
				this.themeSelect = 'Custom'
				/*if(typeof window.FileReader !== 'function'){
					if(confirm("Your browser doesn't support the file API. Get with the times, Grandpa!")){
						window.location.replace('https://lmgtfy.com/?q=list+of+web+browser')
					}
				} else {
					let file = new Blob([require('../assets/css/'+this.currentTheme)], {type: 'text/plain'})
					let reader = new FileReader()
					reader.onload = function(evt){
						console.log(evt.target.result)
					}
					reader.readAsText(file)
				}*/
			},
			updateCustom(){
				this.setCss(this.custom)
				this.$router.go()
			},
			updateCurrency(){
				this.setPayment(this.currency)
			},
			ecotoggle(){
				this.setBool('mutEco')
			},
			switcheroo(){
				this.setBool('mutGrab')
				if(this.getAutoSwitch){
					if(this.getGrab){
						this.setTheme('Yotsuba')
					} else{
						this.setTheme('YotsubaB')
					}
					this.$router.go()
				}
			},
			fileSelect(e){
				if(typeof window.FileReader !== 'function'){
					if(confirm("Your browser doesn't support the file API. Get with the times, Grandpa!")){
						window.location.replace('https://lmgtfy.com/?q=list+of+web+browser')
					}
				} else {
					let file = e.target.files[0]
					let reader = new FileReader()
					reader.onload = function(evt){
						localStorage.setItem('vuex', evt.target.result)
					}
					reader.readAsText(file)
					this.$router.go()
				}
			}
		},
		computed: {
			...mapGetters([
				'getGrab',
				'getAutoSwitch',
				'getTheme',
				'getCustomCss',
				'getForceAnon',
				'getUserBoards',
				'getComfy',
				'getPayment',
				'getEco',
				'getCustomGate',
				'getDemo'
			]),
			localSettings(){
				return localStorage.getItem('vuex')
			},
			blobURL(){
				return window.URL.createObjectURL(new Blob([this.localSettings], {type: "octet/stream"}))
			},
			currentTheme(){
				return this.getTheme+'.css'
			},
			allBoards(){
				return this.getDemo.boards.map(b => b.ticker)
			}
		},
		mounted(){
			if(this.getUserBoards){
				this.boardList = this.getUserBoards.map(b => {
					return b.ticker
				})
			}
			this.themeSelect = this.getTheme
			this.custom = this.getCustomCss
			this.currency = this.getPayment
		}
	}	
</script>