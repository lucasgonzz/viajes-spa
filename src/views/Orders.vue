<template>
    <b-container fluid>

		<filter-form
		:model_name="model_name"></filter-form>

    	<model
    	modal_title="Nuevo Pedido"
    	size="xl"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties">
    		<btn-print
    		:model="model"></btn-print>
    	</model>

		<b-row>
			<b-col
			cols="12">

				<horizontal-nav
				:display="display"
				set_view
				:model_name="model_name"
				@setDisplay="setDisplay"
				:items="items"></horizontal-nav>

				<search-nav
				:models="models"
				:model_name="model_name"
				:properties_to_filter="properties"></search-nav>

				<list></list>	

			</b-col>
		</b-row>

		<btn-up></btn-up>
		
    </b-container>
</template>
<script>
import FilterForm from '@/components/common/FilterForm'
import Model from '@/components/common/model/Index'
import HorizontalNav from '@/components/common/horizontal-nav/Index'
import SearchNav from '@/components/common/search-nav/Index'
import BtnUp from '@/components/common/BtnUp'
import BtnPrint from '@/components/order/components/BtnPrint'

import List from '@/components/order/components/List'

import model from '@/models/order'
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
		model() {
			return this.$store.state[this.model_name].model
		},
		models() {
			return this.$store.state[this.model_name].models
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'el pedido N° '+this.delete.id
			}
			return ''
		},
		items() {
			return [
				{
					name: 'Nuevo Pedido',
					is_for_create: 'order'
				},
				{
					name: 'Dados de alta hoy',
					view: 'created-today',
				},
				{
					name: 'Fecha de ejecucion hoy',
					view: 'executed-today'
				},
				{
					name: 'Fecha de ejecucion mañana',
					view: 'executed-tomorrow'
				},
				{
					name: 'Filtrar',
					is_for_filter: true
				},
			] 
		},
		properties() {
			return model.properties 
		}
	},
	methods: {
		setDisplay(display) {
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
	},
	components: {
		FilterForm,
		HorizontalNav,
		SearchNav,
		Model,
		BtnUp,
		BtnPrint,

		List,
	}
}
</script>