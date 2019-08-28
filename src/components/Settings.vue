<template>
	<div class="w-100 text-right text-mono">
		<span v-if="path=='/settings'">
			[<a href="javascript:history.back();">return</a>]
		</span>
		<span v-else>
			[<router-link :to="{name: 'settings'}">settings</router-link>]
		</span>
	</div>
</template>

<script>
	export default{
		computed: {
			path(){
				return this.$route.path
			}
		}
	}
</script>