<template>
    <b-container fluid>

    	<model
    	modal_title="Nueva Usuario"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties"
    	:actions_after_save="['location/getModels']"></model>

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
				:model_name_spanish="model_name_spanish"
				:properties="properties"></display>

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
			return 'package'
		},
		model_name_spanish() {
			return 'bulto'
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
		model() {
			return this.$store.state[this.model_name].model
		},
		text_delete() {
			return 'el bulto'
		},
		items() {
			return [
				{
					name: 'Nuevo Bulto',
					is_for_create: 'package'
				},
				{
					name: 'Lista',
				},
			] 
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	},
	methods: {
		setDisplay(display) {
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
	},
	components: {
		HorizontalNav,
		Display,
		Model,
	}
}
</script>