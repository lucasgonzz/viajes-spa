<template>
	<div 
	@click="scroll"
	class="btn-up bg-primary apretable">
		<i class="icon-up"></i>
	</div>
</template>
<script>
export default {
	methods: {
		scroll() {
			this.$scrollToTop()
		},
	},
}
</script>
<style lang="sass">
.btn-up 
	position: fixed
	bottom: 20px
	right: 20px
	padding: .5em
	font-size: 1.4em
	cursor: pointer 
	color: #FFF
	border-radius: 10px
</style>