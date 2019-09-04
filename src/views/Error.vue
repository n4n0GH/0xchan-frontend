<template>
	
	<div class="row">
		<div class="pr-0 w-100">
			<div class="card card-chan mb-2">
				<div class="card-header bg-chan p-0 border-0">
					<div class="row">
						<div class="col pl-4 py-1 text-center">
							<p class="mb-0 font-chan-red">
								<span class="post-subject font-weight-bold">
									HTTP {{errorCode}}
								</span>
							</p>
						</div>
					</div>
				</div>
				<div class="card-body bg-chan-light">
					<div class="row">
						<div class="col text-center">
							<p class="w-100 text-center display-1 font-error font-weight-bold">
								{{errorCode}}
							</p>
							<p class="w-100 lead font-swerve">
								Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!
							</p>
							<p class="w-100 lead text-center">
								While you're waiting, find out <a :href="'https://en.wikipedia.org/wiki/HTTP_'+errorCode" target="_blank">how can she slap?</a>
							</p>
							<img src="../assets/fag.png" alt="it's what you are">
							<p class="text-mono small">protip: no one will fix anything, you're doomed</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		computed: {
			errorCode() {
				return this.$route.params.err
			}
		}
	}
</script>