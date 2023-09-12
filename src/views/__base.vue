<template>
    <b-container fluid>

    	<model
    	:modal_title="'Nuevo '+model_name_spanish"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties"></model>

		<b-row>
			<b-col
			cols="12">

				<horizontal-nav
				:display="display"
				:model_name="model_name"
				set_view
				:items="items"></horizontal-nav>

				<display
				:display="display"
				:loading="loading"
				:models="to_show"
				:model_name="model_name"
				:properties="properties"
				:model_name_spanish="model_name_spanish"></display>

			</b-col>
		</b-row>

    </b-container>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'
import Display from '@/components/common/display/Index'
import Model from '@/components/common/model/Index'
export default {
	computed: {
		model_name() {
			return 'MODEL_NAME'
		},
		model_name_spanish() {
			return 'conductor'
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
		models() {
			return this.$store.state[this.model_name].models
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'el '+this.delete.name
			}
			return ''
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		},
		items() {
			return [
				{
					name: 'Nuevo '+this.model_name_spanish,
					is_for_create: this.model_name
				},
				{
					name: 'Dados de alta hoy',
					view: 'created-today',
				},
				{
					name: 'Filtrar',
					is_for_filter: true
				},
			] 
		},
	},
	components: {
		HorizontalNav,
		Display,
		Model,
	}
}
</script>