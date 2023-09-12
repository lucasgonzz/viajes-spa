<template>
    <b-container fluid>

    	<current-acounts></current-acounts>

    	<model
    	modal_title="Nuevo Cliente"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties">
    		<template v-slot:default>
	    		<b-button 
	    		v-if="model.id"
	    		@click="currentAcounts"
	    		block 
	    		variant="outline-primary">
	    			Cuentas corrientes
	    		</b-button>
    		</template>
    	</model>

		<b-row>
			<b-col
			cols="12">

				<horizontal-nav
				:display="display"
				set_view
				@setDisplay="setDisplay"
				:items="items"></horizontal-nav>

				<search-nav
				:models="models"
				:model_name="model_name"
				:properties_to_filter="properties"></search-nav>

				<display
				:display="display"
				:loading="loading"
				:models="to_show"
				:model_name="model_name"
				:model_name_spanish="model_name_spanish"
				:properties="properties"></display>

			</b-col>
		</b-row>
		
    </b-container>
</template>
<script>
import Model from '@/components/common/model/Index'
import CurrentAcounts from '@/components/client/modals/current-acounts/Index'

import HorizontalNav from '@/components/common/horizontal-nav/Index'
import SearchNav from '@/components/common/search-nav/Index'
import Display from '@/components/common/display/Index'
export default {
	computed: {
		model_name() {
			return 'client'
		},
		model_name_spanish() {
			return 'clientes'
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
		text_delete() {
			return 'el usuario'
		},
		items() {
			return [
				{
					name: 'Nuevo Cliente',
					is_for_create: 'client'
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
		currentAcounts() {
			this.$store.commit('current_acount/setClient', this.model)
			this.$store.dispatch('current_acount/getModels')
			this.$bvModal.show('current-acounts')
		}
	},
	components: {
		Model,
		CurrentAcounts,
		
		HorizontalNav,
		SearchNav,
		Display,

	}
}
</script>