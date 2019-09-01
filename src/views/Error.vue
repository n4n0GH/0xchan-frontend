<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-12">
				<p class="w-100 text-center display-1 font-error font-weight-bold">
					{{errorCode}}
				</p>
				<p class="w-100 lead font-swerve">
					Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!
				</p>
				<p class="w-100 lead">
					While you're waiting, find out <a :href="'https://en.wikipedia.org/wiki/HTTP_'+errorCode" target="_blank">how can she slap?</a>
				</p>
				<p class="text-center w-100">
				<img src="../assets/fag.png" alt="it's what you are">
				</p>
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