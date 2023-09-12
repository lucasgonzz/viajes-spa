<template>
    <b-container fluid>

    	<model
    	modal_title="Nueva Usuario"
    	:model="model"
    	model_name="user"
    	:text_delete="text_delete"
    	:properties="properties"></model>

		<b-row>
			<b-col
			cols="12">

				<horizontal-nav
				:display="display"
				set_view
				@setDisplay="setDisplay"
				:items="items"></horizontal-nav>

				<display
				:display="display"
				:loading="loading"
				:models="models"
				:model_name="model_name"
				:properties="properties"></display>

			</b-col>
		</b-row>
		
    </b-container>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'
import Display from '@/components/common/display/Index'
import Model from '@/components/common/model/Index'

import model from '@/models/user'
export default {
	computed: {
		model_name() {
			return 'user'
		},
		display() {
			return this.$store.state[this.modelPlural(this.model_name)].display
		},
		loading() {
			return this.$store.state[this.modelPlural(this.model_name)].loading
		},
		model() {
			return this.$store.state[this.modelPlural(this.model_name)].model
		},
		text_delete() {
			return 'el usuario'
		},
		items() {
			return [
				{
					name: 'Nuevo Pedido',
					zapato: 'Adios',
				},
				{
					name: 'Hola',
					zapato: 'asdsadwsd',
				},
			] 
		},
		models() {
			return [
				{
					name: 'Lucas',
					ocupation: 'Programador'
				},
				{
					name: 'Lucas',
					ocupation: 'Programador'
				},
				{
					name: 'Lucas',
					ocupation: 'Programador'
				},
				{
					name: 'Lucas',
					ocupation: 'Programador'
				},
				{
					name: 'Lucas',
					ocupation: 'Programador'
				},
			]
		},
		properties() {
			return model.properties 
		}
	},
	methods: {
		setDisplay(display) {
			this.$store.commit(this.modelPlural(this.model_name)+'/setDisplay', display)
		},
	},
	components: {
		HorizontalNav,
		Display,
		Model,
	}
}
</script>