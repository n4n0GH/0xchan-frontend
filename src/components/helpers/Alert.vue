<template>
	<div class="alert alert-warning">
		<div class="row">
			<div class="col-auto display-4">
				<i class="fal fa-exclamation-triangle font-warning"></i>
			</div>
			<div class="col">
				<slot name="content"/>
			</div>
			<slot name="button" />
		</div>
	</div>
</template>