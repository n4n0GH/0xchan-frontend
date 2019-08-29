<template>
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
						<div class="col">
							<p class="display-4 text-center">Content</p>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<p class="mb-0 lead">NSFW Mode</p>
							<p class="small font-chan-normal">If turned on, 0xchan will not auto-fetch images. Think twice before flipping the switch.</p>
						</div>
						<div class="col-2">
							<button 
							class="p-0 px-1 w-100 btn btn-outline-chan-red text-mono"
							@click="switcheroo()">is: {{getGrab?'off':'on'}}</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<p class="mb-0 lead">Clear States</p>
							<p class="small font-chan-normal">Reset settings to factory default. Refreshes page to take effect. WARNING: DELETES YOUR CUSTOM STYLES!</p>
						</div>
						<div class="col-2">
							<button class="p-0 w-100 px-1 btn btn-outline-chan-red text-mono" @click="clearState()">clear()</button>
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
						<div class="col-2">
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
						</div>
						<div class="col-2">
							<p class="mb-0 form-group">
									<select class="form-control" v-model="themeSelect">
										<option>Yotsuba</option>
										<option>YotsubaB</option>
										<option disabled>Photon</option>
										<option disabled>Tomorrow</option>
										<option disabled>Floeeens</option>
										<option>Custom</option>
									</select>
							</p>
							<p>
								<button class="p-0 w-100 px-1 btn btn-outline-chan-red text-mono" @click="saveTheme()">use this</button>
							</p>
						</div>
					</div>
					</transition>
					<transition name="fade" mode="out-in">
					<div v-if="themeSelect=='Custom'">
						<div class="row">
							<div class="col-7">
								<p class="mb-0 lead">Custom Styles</p>
								<p class="mb-0 small font-chan-normal">Check out the documentation [insert link here] to find out about class-names.</p>
								<textarea name="customCss" rows="4" class="w-100" placeholder="Paste your CSS here" v-model="custom"></textarea>
								<button class="btn btn-block btn-outline-chan mt-2" @click="updateCustom()">
									Update Styles
								</button>
							</div>
							<div class="col-5">
								<p class="mb-0 lead">Preview</p>
								<p class="mb-0 small font-chan-normal">Update styles to see changes.</p>
								<mini-preview />
							</div>
						</div>
					</div>
					</transition>
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
				custom: ''
			}
		},
		components: {
			MiniPreview
		},
		methods: {
			...mapActions([
				'setBool',
				'setTheme',
				'setCss'
			]),
			clearState(){
				if(confirm("Are you sure you want to reset the browser's local storage?")){
					localStorage.clear()
					location.reload()
				}
			},
			saveTheme(){
				this.setTheme(this.themeSelect)
				if(this.themeSelect=='Custom'){
					this.setCss(this.custom)
				}
				location.reload()
			},
			updateCustom(){
				this.setCss(this.custom)
				location.reload()
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
					location.reload()
				}
			}
		},
		computed: {
			...mapGetters([
				'getGrab',
				'getAutoSwitch',
				'getTheme',
				'getCustomCss'
			])
		},
		mounted(){
			this.themeSelect = this.getTheme
			this.custom = this.getCustomCss
		}
	}	
</script>