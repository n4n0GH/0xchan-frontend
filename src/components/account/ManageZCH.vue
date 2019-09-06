<template>
	<div>
		<div class="row border-chan-red border-top pt-4">
			<div class="col">
				<p class="lead text-center">
					Buy ZCH
				</p>
				<div class="input-group text-center mb-0">
					<input type="number" placeholder="1" class="form-control text-center border-chan-red" v-model="purchaseAmount"/>
					<div class="input-group-append">
						<span class="input-group-text bg-chan text-chan border-chan-red">
							<i class="fab fa-creative-commons-zero"></i>
						</span>
					</div>
				</div>
				<p class="text-center small text-mono">
					= {{totalCost}} <i class="fab fa-ethereum"></i>
				</p>
				<p class="text-center">
					<button class="btn btn-block btn-outline-chan-red text-mono"><i class="fab fa-ethereum"></i> Purchase</button>
				</p>
			</div>
			<div class="col">
				<p class="lead text-center">
					Convert Rewards
				</p>
				<div class="input-group text-center mb-0">
					<input value="1333.4156" class="form-control text-center bg-chan text-chan border-chan-red border-right-0" disabled />
					<div class="input-group-append">
						<span class="input-group-text bg-chan text-chan border-chan-red">
							<i class="fab fa-ethereum"></i>
						</span>
					</div>
				</div>
				<p class="text-center small text-mono">
					= 13.334.156‬ <i class="fab fa-creative-commons-zero"></i>
				</p>
				<p class="text-center">
					<button class="btn btn-block btn-outline-chan-red text-mono"><i class="far fa-sync-alt"></i> Convert</button>
				</p>
			</div>
			<div class="col">
				<p class="lead text-center">
					Swap ZCI
				</p>
				<div class="input-group text-center mb-0">
					<input value="1333.4156" class="form-control text-center bg-chan text-chan border-chan-red border-right-0" disabled />
					<div class="input-group-append">
						<span class="input-group-text bg-chan text-chan border-chan-red">
							ZCI
						</span>
					</div>
				</div>
				<p class="text-center small text-mono">
					= 1,333.4156‬ <i class="fab fa-creative-commons-zero"></i>
				</p>
				<p class="text-center">
					<button class="btn btn-block btn-outline-chan-red text-mono"><i class="far fa-sync-alt"></i> Convert</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				purchaseAmount: ''
			}
		},
		computed: {
			totalCost(){
				return (this.purchaseAmount*0.0001).toFixed(4)
			}
		}
	}
</script>