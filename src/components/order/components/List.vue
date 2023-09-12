<template>
    
	<display
	model_name_spanish="pedidos"
	:display="display"
	:loading="loading"
	:models="to_show"
	:model_name="model_name"
	:properties="properties"></display>

</template>
<script>
import Display from '@/components/common/display/Index'
export default {
	computed: {
		model_name() {
			return 'order'
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		loading() {
			return this.$store.state[this.model_name].loading
		},
		to_show() {
			return this.$store.state[this.model_name].to_show
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	},
	components: {
		Display,
	}
}
</script>