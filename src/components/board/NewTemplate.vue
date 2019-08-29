<template>
	<div class="card card-chan mb-2">
		<div class="card-header bg-chan p-0 border-0">
			<div class="row">
				<div class="col pl-4 py-1 text-left">
					<p class="mb-0 font-chan-red">
						<span class="post-subject mr-2">
							<input type="text" placeholder="Subject (optional)">
						</span>
						<span class="post-name">
							<input type="text" placeholder="Name (optional)">
						</span>
					</p>
				</div>
				<div class="col-auto mr-2 py-1">
						<p class="mb-0 font-chan-red">
							<input type="checkbox" name="sage" value="sage"> sage
						</p>
					</div>
			</div>
		</div>
		<div class="card-body bg-chan-light p-1">
			<!-- @dev maybe split this into a card so text can flow around it -->
			<div class="row">
				<div class="col-12">
					<div class="float-left mr-3 w-auto" style="max-width:30%;">
						<p class="small mb-0 text-mono text-overflow">
							<input type="file" @change="fileSelect">
						</p>
						<img class="mw-100" :src="filePreview" v-if="filePreview" />
					</div>
					<div class="font-chan-normal">
						<textarea name="postContent" rows="10" placeholder="&gt;implying you have anything worth posting" style="width:60%;"></textarea>
					</div>
				</div>
			</div>
		</div>
		<div class="card-footer bg-chan-light border-0 p-1">
			<div class="row">
				<div class="col">
					<button class="btn btn-outline-chan btn-block">Submit</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				filePreview: null
			}
		},
		methods: {
			fileSelect(e){
				const file = e.target.files[0]
				this.filePreview = URL.createObjectURL(file)
			}
		}
	}
</script>