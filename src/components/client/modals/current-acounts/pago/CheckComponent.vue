<template>
	<div 
	class="check s-1 b-r-5">
		<b-form-row>
			<b-col
			cols="12">
				<b-input-group
				prepend="Banco">
					<b-form-input
					:disabled="disabled_inputs"
					v-model="check.bank"
					placeholder="Banco"></b-form-input>
				</b-input-group>
			</b-col>
		</b-form-row>
		<b-form-row>
			<b-col
			cols="8">
		        <b-form-datepicker
		        :disabled="disabled_inputs"
		        placeholder="Fecha de pago"
		        v-model="check.payment_date">
		        </b-form-datepicker>
			</b-col>
			<b-col
			cols="4">
				<b-input-group
				prepend="$">
					<b-form-input
					:disabled="disabled_inputs"
					v-model="check.amount"
					placeholder="Importe"></b-form-input>
				</b-input-group>
			</b-col>
		</b-form-row>
		<b-form-row>
			<b-col
			cols="12">
				<b-input-group
				prepend="N°">
			        <b-form-input
			        :disabled="disabled_inputs"
			        placeholder="Numero de cheque"
			        v-model="check.num">
			        </b-form-input>
				</b-input-group>
			</b-col>
		</b-form-row>
	</div>
</template>
<script>
export default {
	props: {
		check: {
			type: Object,
		},
		disabled_inputs: {
			type: Boolean,
			default: false,
		},
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.check 
	padding: 15px 
	margin-bottom: 15px
	border-left: 4px solid $blue 
	.form-row 
		margin-bottom: 10px
</style>