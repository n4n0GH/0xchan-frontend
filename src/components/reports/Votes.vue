<template>
	<div class="w-100 pt-3 pr-0" id="disputePreview">
		<div class="card card-chan mb-2">
			<div class="card-header bg-chan p-0 border-0">
				<div class="row">
					<div class="col pl-4 py-1">
						<p class="mb-0 font-chan-red">
							<span class="post-subject font-weight-bold">
								you're waifu is shit
							</span>
							<span class="post-name font-chan-ok">
								Ken-sama
							</span>
							- 01/11/13(Fri)01:02:03
							| No. 123415
						</p>
					</div>
				</div>
			</div>
			<div class="card-body bg-chan-light p-1">
				<div class="row">
					<div class="col font-chan-normal">
						<blockquote>
							<a class="quotelink" href="javascript:void(0);">&gt;&gt;123414</a>
							<br>
							<span class="quote">&gt;implying your waifu is any good</span>
							<br>
							here's a protip you massive raging faggot you're waifu is shit and you should feel bad for even thinking about talking about her like she's a queen or something like you fucking bitch would be lucky enough if the qt3.14 at the burgerking register looks you in the eye you fucking incel holy shit go back into your hiki-cave and stay go
						</blockquote>
					</div>
				</div>
			</div>
			<hr class="bg-chan-light my-0">
			<div class="card-footer bg-chan-light border-0 p-1">
				<div class="row">
					<div class="col-12">
						<p class="text-center lead mb-2">Is the report justified?</p>
					</div>
					<div class="col ml-1 mr-0 pr-1">
						<button class="btn btn-block btn-outline-chan text-center text-mono"><i class="fal fa-vote-yea"></i> Yea</button>
					</div>
					<div class="col mr-1 ml-0 pl-1">
						<button class="btn btn-block btn-outline-danger text-center text-mono"><i class="fal fa-vote-nay"></i> Nay</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {eBus} from '../EventBus.js'

	export default {
		data(){
			return{
				disputeId: ''
			}
		},
		components: {
		}
	}
</script>