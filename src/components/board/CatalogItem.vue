<template>
		<div class="card card-chan">
			<div class="card-header bg-chan px-1 py-0">
				<div class="row">
					<div class="col">
						<p class="small text-mono mb-0">
					R: <span class="font-weight-bold"><slot name="threadReplies" /></span> | I: <span class="font-weight-bold"><slot name="threadImages" /></span>
						</p>
					</div>
					<div class="col-auto">
						<p class="small text-mono mb-0">
							<slot name="threadView" /><slot name="threadHide" />
						</p>
					</div>
				</div>
				
			</div>
			<div class="card-body bg-chan-light p-0">
				<slot name="opImage" />
				<p class="small font-normal mx-1 my-1">
					<span class="font-weight-bold"><slot name="threadSubject" /></span> <slot name="threadText" />
				</p>
			</div>
		</div>
</template>