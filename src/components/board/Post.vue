<template>
	<div class="pr-0">
		<div class="card card-chan mb-2">
			<div class="card-header bg-chan p-0 border-0">
				<div class="row">
					<div class="col-auto pl-4 py-1">
						<p class="mb-0 font-chan-red">
							<span class="post-subject font-weight-bold">
								<slot name="postSubject" />
							</span>
							<span class="post-name font-chan-ok">
								<slot name="postName" />
							</span>
							- <slot name="postStamp" />
							| <slot name="postNumber" />
							<button style="line-height: 1rem;" class="p-0 px-1 btn btn-outline-chan-red text-mono">R</button>
						</p>
					</div>
				</div>
			</div>
			<div class="card-body bg-chan-light p-1">
				<!-- @dev maybe split this into a card so text can flow around it -->
				<div class="row">
					<div class="col-4 pr-0" v-if="picRelated">
						<p class="small mb-0 text-mono">
							File: <slot name="fileMeta" /><br>
							(11.11 MB, 1920&times;1080)
						</p>
						<slot name="fileThumb" />
					</div>
					<div class="col font-chan-normal">
						<slot name="postText" />
					</div>
				</div>
			</div>
			<div class="card-footer bg-chan-light border-0 p-1">
				<div class="row">
					<div class="col px-0">
						<p class="small text-mono mb-0">
							<slot name="allThoseYous" /> <!-- @dev pass single replies as &gt;&gt;number -->
						</p>
					</div>
					<div class="col-auto">
						<button class="p-0 px-1 btn btn-outline-chan-red text-mono">(you)</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			picRelated(){
				return !!this.$slots.fileMeta
			}
		}
	}
</script>