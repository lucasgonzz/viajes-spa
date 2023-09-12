<template>
	<b-modal
	title="Cheques"
	hide-footer
	id="checks-details">
		<check-component
		:disabled_inputs="true"
		v-for="check in checks"
		:check="check"></check-component>
	</b-modal>
</template>
<script>
import CheckComponent from '@/components/client/modals/current-acounts/pago/CheckComponent'
export default {
	components: {
		CheckComponent,
	},
	computed: {
		checks() {
			return this.$store.state.current_acount.checks
		},
	},
}
</script>