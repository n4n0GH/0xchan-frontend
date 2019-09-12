<template>
	<div class="card card-chan mb-2">
		<div class="card-header bg-chan p-0 border-0">
			<div class="row">
				<div class="col text-left input-group">
					<input class="border-left-0 border-top-0 form-control" type="text" placeholder="Subject (optional)">
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios'
	
	export default {
		data(){
			return{
				filePreview: null,
				gasPrice: null
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
			}
		},
		mounted(){
			Axios.get("https://ethgasstation.info/json/ethgasAPI.json")
				.then(response => {this.gasPrice = response.data})
		}
	}
</script>