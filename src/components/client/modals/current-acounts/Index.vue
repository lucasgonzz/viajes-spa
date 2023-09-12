<template>
<div>

	<model
	size="xl"
	:model="modelStoreFromName('order')"
	model_name="order"
	text_delete="text_delete"
	:properties="modelPropertiesFromName('order')">
		<btn-print
		:model="modelStoreFromName('order')"></btn-print>
	</model>

	<pago></pago>
	<nota-credito></nota-credito>
	<saldo-inicial></saldo-inicial>

	<b-modal
	size="xl"
	hide-footer
	:title="title"
	id="current-acounts">
		<nav-component></nav-component>
		<list></list>
		<buttons></buttons>
	</b-modal>
</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import BtnPrint from '@/components/order/components/BtnPrint'

import Pago from '@/components/client/modals/current-acounts/pago/Index'
import NotaCredito from '@/components/client/modals/current-acounts/NotaCredito'
import SaldoInicial from '@/components/client/modals/current-acounts/SaldoInicial'

import NavComponent from '@/components/client/modals/current-acounts/NavComponent'
import List from '@/components/client/modals/current-acounts/List'
import Buttons from '@/components/client/modals/current-acounts/Buttons'

import current_acounts from '@/mixins/current_acounts'
export default {
	mixins: [current_acounts],
	computed: {
		title() {
			return 'Cuenta corriente de '+this.client.name
		}
	},
	components: {
		Model,
		BtnPrint,
		
		Pago,
		NotaCredito,
		SaldoInicial,
		
		NavComponent,
		List,
		Buttons,
	},
}
</script>