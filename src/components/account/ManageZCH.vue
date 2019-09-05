<template>
	<div>
		<hr>
		<div class="row">
			<div class="col">
				<p class="display-4 text-center">ZCH</p>
				<p class="font-chan-normal small text-center">ZCH enable you to pay for posts instead of using ETH. Think of them as shitposting vouchers. They also increase your overall portion in the distributed rewards system.</p>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<p class="lead text-center">
					Buy ZCH
				</p>
				<div class="input-group text-center mb-0">
					<input type="number" placeholder="1" class="form-control text-center" v-model="purchaseAmount"/>
					<div class="input-group-append">
						<span class="input-group-text">
							<i class="fab fa-creative-commons-zero"></i>
						</span>
					</div>
				</div>
				<p class="text-center small text-mono">
					= {{totalCost}} <i class="fab fa-ethereum"></i>
				</p>
				<p class="text-center">
					<button class="btn btn-outline-chan-red text-mono"><i class="fab fa-ethereum"></i> Purchase</button>
				</p>
			</div>
			<div class="col">
				<p class="lead text-center">
					Convert Rewards
				</p>
				<div class="input-group text-center mb-0">
					<input value="1333.4156" class="form-control text-center" disabled />
					<div class="input-group-append">
						<span class="input-group-text">
							<i class="fab fa-ethereum"></i>
						</span>
					</div>
				</div>
				<p class="text-center small text-mono">
					= 13.334.156‬ <i class="fab fa-creative-commons-zero"></i>
				</p>
				<p class="text-center">
					<button class="btn btn-outline-chan-red text-mono"><i class="far fa-sync-alt"></i> Convert</button>
				</p>
			</div>
			<div class="col">
				<p class="lead text-center">
					Swap ZCI
				</p>
				<div class="input-group text-center mb-0">
					<input value="1333.4156" class="form-control text-center" disabled />
					<div class="input-group-append">
						<span class="input-group-text">
							ZCI
						</span>
					</div>
				</div>
				<p class="text-center small text-mono">
					= 1,333.4156‬ <i class="fab fa-creative-commons-zero"></i>
				</p>
				<p class="text-center">
					<button class="btn btn-outline-chan-red text-mono"><i class="far fa-sync-alt"></i> Convert</button>
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