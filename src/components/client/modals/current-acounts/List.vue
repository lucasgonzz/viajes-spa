<template>

	<div>
		
	    <confirm
	    :text="text_delete"
	    :actions="['current_acount/delete', 'current_acount/getModels']"
	    :id="'delete-current-acount'"></confirm>

	    <checks-details></checks-details>

		<table-component
		:loading="loading"
		:models="models"
		model_name="order"
		spanish_model_name="cuentas corrientes"
		:properties="properties"
		:set_model_on_click="true"
		on_click_set_property="order"
		v-show="display == 'table'">
			<template v-slot:default="slotProps">
				<b-button
				v-if="slotProps.model.haber || slotProps.model.status == 'saldo_inicial'"
				@click="deletePago(slotProps.model)"
				variant="danger"
				class="m-l-10">
					<i class="icon-trash"></i>
				</b-button>
				<b-button
				v-if="showBtnCheck(slotProps.model)"
				@click="showCheck(slotProps.model)"
				variant="outline-primary"
				class="m-l-10">
					Ver cheques
				</b-button>
			</template>
		</table-component>

	</div>
    
</template>
<script>
import Confirm from '@/components/common/Confirm'
import ChecksDetails from '@/components/client/modals/current-acounts/ChecksDetails'

import TableComponent from '@/components/common/display/TableComponent'
export default {
	computed: {
		model_name() {
			return 'current_acount'
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		loading() {
			return this.$store.state[this.model_name].loading
		},
		models() {
			return this.$store.state[this.model_name].models
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete && this.delete.status == 'saldo_inicial') {
				return 'el saldo inicial'
			} else if (this.delete) {
				return 'este pago de '+this.delete.haber
			}
			return ''
		},
	},
	methods: {
		showBtnCheck(model) {
			return model.status == 'pago_from_client' && model.current_acount_payment_method && model.current_acount_payment_method.name == 'Cheque'
		},
		showCheck(model) {
			this.$store.commit(this.model_name+'/setChecks', model.checks)
			this.$bvModal.show('checks-details')
		},
		setDisplay(display) {
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
		deletePago(model) {
			this.$store.commit(this.model_name+'/setDelete', model)
			this.$bvModal.show('delete-current-acount')
		}
	},
	components: {
		Confirm,
		ChecksDetails,
		
		TableComponent,
	}
}
</script>