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
								<p class="small mb-0 font-chan-normal">Define your own set of boards you wish to see in the navigation. Shortcode seperated by comma.</p>
								<p><input type="text" v-model.trim="boardList" placeholder="e.g. a, g, v, biz" class="pl-1 w-100 form-control"></p>
							</div>
							<div class="col-12 col-sm-2">
								<button class="btn btn-outline-chan p-0 w-100 px-1 text-mono" @click="saveList()">save()</button>
								<button class="btn btn-outline-danger mt-2 p-0 w-100 px-1 text-mono" @click="resetList()">clear()</button>
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
									<select class="form-control" v-model="themeSelect">
										<option>Yotsuba</option>
										<option>YotsubaB</option>
										<option>Photon</option>
										<option>Tomorrow</option>
										<option>Floeeens</option>
										<option>Custom</option>
									</select>
								</p>
							</div>
							<div class="col-12 col-sm-2">
									<button class="mb-1 p-0 w-100 px-1 btn btn-outline-chan-red text-mono" @click="saveTheme()">use this</button>
									<button class="p-0 w-100 px-1 btn btn-outline-chan text-mono">modify()</button>
							</div>
						</div>
						</transition>
						<transition name="fade" mode="out-in">
						<div v-if="themeSelect=='Custom'">
							<div class="row">
								<div class="col-12 col-xl-7">
									<p class="mb-0 lead">Custom Styles</p>
									<p class="mb-0 small font-chan-normal">Check out the documentation [insert link here] to find out about class-names.</p>
									<textarea name="customCss" rows="4" class="w-100" placeholder="Paste your CSS here" v-model="custom"></textarea>
									<button class="btn btn-block btn-outline-chan mt-2" @click="updateCustom()">
										Update Styles
									</button>
								</div>
								<div class="col-12 col-xl-5">
									<p class="mb-0 lead">Preview</p>
									<p class="mb-0 small font-chan-normal">Update styles to see changes.</p>
									<mini-preview />
								</div>
							</div>
						</div>
						</transition>
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
							<div class="col mb-3">
								<p class="mb-0 lead">Load States</p>
								<p class="small font-chan-normal mb-0">Auto-Load your settings from a JSON file.</p>
								<input type="file" class="form-control" @change="fileSelect">
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
				testArray: [],
				loadFile: {}
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
				'setBoardListReset'
			]),
			saveList(){
				if(this.boardList){	
					this.setBoardList(this.boardList.replace(/^,/, "").replace(/,\s*$/, "").split(',').map(s => s.trim()))
				}
			},
			resetList(){
				this.setBoardListReset()
				this.$router.go()
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
				}
				this.$router.go()
			},
			updateCustom(){
				this.setCss(this.custom)
				this.$router.go()
			},
			switcheroo(){
				this.setBool('mutGrab')
				if(this.getAutoSwitch){
					if(this.getGrab){
						this.setTheme('Yotsuba')
					}
					else{
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
				'getUserBoards'
			]),
			localSettings(){
				return localStorage.getItem('vuex')
			},
			blobURL(){
				return window.URL.createObjectURL(new Blob([this.localSettings], {type: "octet/stream"}))
			}
		},
		mounted(){
			if(this.getUserBoards){
				this.boardList = this.getUserBoards
			}
			this.themeSelect = this.getTheme
			this.custom = this.getCustomCss
		}
	}	
</script>