<template>
	<b-form-group
	label="Metodo de pago">
		<b-form-select
		v-model="pago.current_acount_payment_method_id"
		:options="getOptions('current_acount_payment_method_id', 'Metodo de pago')"></b-form-select>
	</b-form-group>
</template>
<script>
export default {
	props: ['pago'],
}
</script>