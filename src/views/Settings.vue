<template>
	<div class="row">
		<div class="pr-0 w-100">
			<div class="card card-chan mb-2">
				<div class="card-header bg-chan p-0 border-0">
					<div class="row">
						<div class="col pl-4 py-1">
							<p class="mb-0 font-chan-red">
								<span class="post-subject font-weight-bold">
									Content
								</span>
							</p>
						</div>
					</div>
				</div>
				<div class="card-body bg-chan-light">
					<div class="row">
						<div class="col">
							<p class="mb-0 lead">NSFW Mode</p>
							<p class="small font-chan-normal">If turned on, 0xchan will not auto-fetch images. Think twice before flipping the switch.</p>
						</div>
						<div class="col-auto">
							<button 
							class="p-0 px-1 btn btn-outline-chan-red text-mono"
							@click="setBool('mutGrab')">{{getGrab?'off':'on'}}</button>
						</div>
					</div>
					<div class="row mw-100 overflow-auto">
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		methods: {
			...mapActions([
				'setBool'
			])
		},
		computed: {
			...mapGetters([
				'getGrab'
			])
		}
	}	
</script>