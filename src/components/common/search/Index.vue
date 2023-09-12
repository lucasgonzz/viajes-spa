<template>
	<div>
		<div
		class="search-component">
			<b-form-input
			:id="id"
			@keyup="search"
			@keydown.enter="select"
			v-model="query"
			:placeholder="_placeholder"></b-form-input>

			<div
			class="search-results s-2"
			v-if="results.length">
				<p
				class="results-title">
					Resultados
				</p>
				<cards
				:loading="false"
				:models="results"
				:properties="props_to_filter"
				:model_name="cards_model_name"
				:set_model_on_click="false"
				@clicked="setSelected"></cards>	
			</div>
		</div>
		<div
		v-if="show_selected">
			<p
			class="m-t-15 m-l-15 m-b-0">
				<i class="icon-down"></i>
				{{ prop.text }} seleccionado
			</p> 
			<cards
			full_card
			:loading="false"
			:models="[model[modelNameFromRelationKey(prop)]]"
			:properties="modelPropertiesFromRelationKey(prop)"
			:model_name="modelNameFromRelationKey(prop)"
			:set_model_on_click="false"
			@clicked="setSelected"></cards>	
		</div>
	</div>
</template>
<script>
import Cards from '@/components/common/display/cards/Index'
export default {
	components: {
		Cards,
	},
	props: {
		id: {
			type: String,
			default: 'select-component',
		},
		models: {
			type: Array,
		},
		model: {
			type: Object,
		},
		model_name: {
			type: String,
			default: null,
		},
		prop: {
			type: Object,
			default: null,
		},
		str_limint: {
			type: Number,
			default: 2,
		},
		auto_select: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			query: '',
			results: [],
			props_to_filter: [],
		}
	},
	computed: {
		_placeholder() {
			if (this.placeholder) {
				return this.placeholder
			} else if (this.prop) {
				return 'Buscar '+this.prop.text.toLowerCase()
			}
		},
		cards_model_name() {
			return this.modelNameFromRelationKey(this.prop)
		},
		show_selected() {
			if (this.model) {
				return this.prop && this.model[this.modelNameFromRelationKey(this.prop)]
			}
		}
	},
	created() {
		this.props_to_filter = this.modelPropertiesFromRelationKey(this.prop)
		console.log(this.prop)
		// if (this.prop) {
		// 	this.props_to_filter = this.modelPropertiesFromRelationKey(this.prop)
		// } else {
		// 	this.props_to_filter = this.modelPropertiesFromName(this.model_name)
		// }
	},
	methods: {
		clicked(model) {
			console.log(model)
		},
		search() {
			this.results = []
			if (this.query.length >= this.str_limint) {
				if (this.props_to_filter.length >= 1) {
					let results = []
					this.props_to_filter.forEach(prop => {
						results = this.models.filter(model => {
							let value = ''+model[prop.key]
							return value && value.toLowerCase().includes(this.query.toLowerCase())
						})
						results = results.filter(model => {
							let index = this.results.findIndex(result => {
								return result.id == model.id 
							})
							return index == -1
						})
						this.results = this.results.concat(results)
					})
					console.log(this.results)
				}
			}
		},
		select() {
			console.log('se apreto enter')
			if (this.auto_select && this.results.length) {
				this.$emit('setSelected', {
					model: this.results[0],
					prop: this.prop,				
				})
				this.results = []
			} else {
				this.$emit('setSelected', {
					model: null, 
					query: this.query,
					prop: this.prop,				
				})
			}
			this.query = ''
		},
		setSelected(model) {
			this.results = []
			this.$emit('setSelected', {
				model,
				prop: this.prop,				
			})
			this.query = ''
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.search-component
	position: relative
	width: 100%
	.search-results
		position: absolute
		background: $background
		box-shadow: 0 0 0 0.2rem rgba($blue, .25)
		z-index: 100
		border-radius: 0 0 5px 5px
		min-width: 400px
		width: 100%
		top: 100%
		max-height: 500px
		overflow-y: scroll
		&::-webkit-scrollbar 
			display: none
		.results-title
			font-size: 1.2em
			font-weight: bold
			margin: 1em 1em 0
</style>