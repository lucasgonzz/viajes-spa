<template>
	<div
	class="model-form">
		<images
		:model="model"
		:model_name="model_name"></images>	

		<b-form-group
		v-for="(prop, index) in properties"
		:key="'model-prop-'+index">
			<label
			v-if="showProperty(prop, model, false, true)"
			class="form-label">
				<i class="icon-right"></i>
				{{ label(prop) }}
			</label>
			<div
			v-if="showProperty(prop, model, false, true)">

				<div
				v-if="prop.type == 'search' || (prop.belongs_to_many && !prop.belongs_to_many.related_with_all)">
					<search-component
					class="m-b-15"
					@setSelected="setSelected"
					:models="modelsToSearch(prop)"
					:model="model"
					:prop="prop"></search-component>
				</div>

		        <b-form-datepicker
				v-if="prop.type == 'date'"
		        placeholder="Fecha"
		        :disabled="isDisabled(prop)"
		        v-model="model[prop.key]"></b-form-datepicker>

				<div
				v-if="prop.type == 'radio'">
					<b-form-radio
					v-for="model_radio in modelsToSearch(prop, model)"
					:key="prop.key+'-'+model_radio.id"
					:value="model_radio.id"
					:name="model_name+'-'+prop.key"
					:id="prop.key+'-'+model_radio.id"
					v-model="model[prop.key]">
						<div
						v-if="prop.props_to_show_in_radio">
							<p
							v-for="prop_to_show in prop.props_to_show_in_radio">
								{{ model_radio[prop_to_show] }}
							</p>
						</div>
						<span
						v-else>
							{{ model_radio.name }}
						</span>
					</b-form-radio>
				</div>

				<b-form-input
				v-if="prop.type == 'text' || prop.type == 'number'"
		        :disabled="isDisabled(prop)"
				:placeholder="'Ingresar '+prop.text"
				:type="prop.type"
				v-model="model[prop.key]"></b-form-input>

				<b-form-textarea
				v-if="prop.type == 'textarea'"
		        :disabled="isDisabled(prop)"
				:placeholder="'Ingresar '+prop.text"
				:type="prop.type"
				v-model="model[prop.key]"></b-form-textarea>

				<b-form-select
				v-else-if="prop.type == 'select'"
				@change="setChange(prop)"
		        :disabled="isDisabled(prop)"
				v-model="model[prop.key]"
				:options="getOptions(prop.key, prop.text)"></b-form-select>

				<b-form-checkbox
				v-else-if="prop.type == 'checkbox'"
		        :disabled="isDisabled(prop)"
				v-model="model[prop.key]"
				:value="prop.value"
				:unchecked-value="prop.unchecked_value">
					{{ prop.text }}
				</b-form-checkbox>

		    	<model-component
		    	v-if="prop.show_model"
		    	:modal_title="'Agregar '+prop.btn_model_text"
		    	:model="modelStoreFromName(prop.store)"
		    	:model_name="routeString(modelNameFromRelationKey(prop))"
		    	:text_delete="prop.text"
		    	:properties="modelPropertiesFromRelationKey(prop)"></model-component>

				<b-button
		    	v-if="prop.show_model"
		    	class="m-r-15"
		    	@click="setModel(prop)"
				variant="primary">
					<i class="icon-plus"></i>
					{{ btnText(prop) }}
				</b-button>

				<div
		    	v-if="prop.belongs_to_many">
					<table-component
					:loading="false"
					:models="model[prop.key]"
					:properties="propsToShowInBelongsToMany(prop)"
					:model_name="prop.belongs_to_many.model_name"
					:pivot="prop.belongs_to_many"
					:pivot_model="model"
					:set_model_on_click="false"
					:show_btn_edit="false">
						<template v-slot:default="slotProps">
							<slot name="belongs" :model="slotProps.model"></slot>
							<b-button
							class="m-l-15"
							variant="danger"
							@click="removeModel(prop, slotProps.model)">
								<i class="icon-trash"></i>
							</b-button>
						</template>  
						<!-- <slot name="belongs">
							sdf
						</slot> -->
					</table-component>	
				</div>

				<p
				class="function-value"
				v-if="prop.function">
					{{ getFunctionValue(prop, model) }}
				</p>

				<b-button
				v-if="(prop.type == 'radio' || prop.type == 'search') && model[prop.key] != prop.value"
				variant="outline-primary"
				size="sm"
				@click="clear(prop)">
					Limpiar
				</b-button>

				<b-button
				class="m-l-15"
				v-if="(prop.type == 'radio' || prop.type == 'search') && model[prop.key] != 0 && model[prop.key] != '' && prop.show_btn_delete"
				variant="danger"
				size="sm"
				@click="deleteProp(prop)">
					<i class="icon-trash"></i>
				</b-button>

				<hr>

			</div>

		</b-form-group>

		<slot></slot>

		<slot name="buttons">
			<btn-loader
			@clicked="save"
			:loader="loading"
			text="Guardar"></btn-loader>

			<btn-delete
			:model_name="model_name"
			:model="model"
			:modal="'delete-'+model_name"></btn-delete>
		</slot>
		
	</div>
</template>
<script>
import SearchComponent from '@/components/common/search/Index'
import Cards from '@/components/common/display/cards/Index'
import TableComponent from '@/components/common/display/TableComponent'
import Images from '@/components/common/model/Images'
import BtnLoader from '@/components/common/BtnLoader'
import BtnDelete from '@/components/common/BtnDelete'
export default {
	props: {
		model: Object,
		properties: Array,
		model_name: String,
		form_to_filter: {
			type: Boolean,
			default: false,
		},
		actions_after_save: Array,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		deleteProp(prop) {
			this.$store.commit(prop.store+'/setDelete', {id: this.model[prop.key]})
			this.$store.dispatch(prop.store+'/delete')
			.then(() => {
				this.$toast.success('Eliminado')
			})
		},
		removeModel(prop, model) {
			let index = this.model[prop.key].findIndex(_model => {
				return _model.id == model.id 
			})
			this.model[prop.key].splice(index, 1)
		},
		propsToShowInBelongsToMany(prop) {
			if (prop.belongs_to_many.props_to_show) {
				return prop.belongs_to_many.props_to_show 
			}
			return this.modelPropertiesFromName(prop.belongs_to_many.model_name)
		},
		isDisabled(prop) {
			if (prop.disabled && !this.form_to_filter) {
				return true 
			}
			return false
		},
		clear(prop) {
			this.model[prop.key] = prop.value 
			if (this.isRelationKey(prop)) {
				this.model[this.modelNameFromRelationKey(prop, false, false)] = null
			}
		},
		setChange(prop) {
			if (prop.on_change) {
				this[prop.on_change](prop)
			}
		},
		setPivotProps(prop) {
			if (this.model[prop.key] && this.model[prop.key] != 0) {
				prop.properties_to_set_on_change.forEach(prop_to_set => {
					if (prop_to_set.relation_to_set) {
						console.log(prop_to_set.relation_to_set)
						this.model[prop_to_set.relation_to_set].forEach(model => {
							let selected_relationship = model[prop_to_set.find_on].find(relationship => {
								return relationship.id == this.model[prop.key]
							})
							let array = prop_to_set.set.split('.')
							if (array[1]) {
								model[array[0]][array[1]] = selected_relationship[array[0]][array[1]]
							}
						})
					} else if (prop_to_set.search_on_models) {
						let models_to_search = this.modelsStoreFromName(prop_to_set.search_on_models)
						let finded = models_to_search.find(model_to_search => {
							return model_to_search.id == this.model[prop.key]
						})
						this.model[prop_to_set.set] = finded[prop_to_set.set]
					}
				})
				// this.model['packages'].forEach(model => {
				// 	let selected_relationship = model['locations'].find(relationship => {
				// 		return relationship.id == this.model['location_id']
				// 	})
				// 	model.pivot['price'] = selected_relationship.pivot['price']
				// })
			}
		},
		pivotModels(prop) {
			return this.model[this.modelPlural(prop.belongs_to_many.model_name)]
		},
		btnText(prop) {
			if (prop.btn_model_text) {
				return 'Agregar '+prop.btn_model_text
			}
			return 'Agregar '+prop.text
		},
		setModel(prop) {
			let properties = []
			prop.properties.forEach(_prop => {
				properties.push({
					key: _prop,
					value: this.model[_prop]
				})
			})
			console.log(properties)
			this.$store.commit(prop.store+'/setModel', {model: null, properties: properties})
			this.$bvModal.show(this.routeString(this.modelNameFromRelationKey(prop)))
		},
		label(prop) {
			if (prop.type == 'checkbox') {
				return ''
			}
			return prop.text
		},
		setSelected(result) {
			console.log(result)
			let prop = result.prop
			if (prop.belongs_to_many) {
				let model_to_add = result.model 
				if (!model_to_add) {
					model_to_add = {}
					let last_id = -1 
					this.model[result.prop.key].forEach(model => {
						if (model.id < last_id) {
							last_id = model.id 
						}
					})
					last_id--
					model_to_add.id = last_id
					if (prop.belongs_to_many.if_null) {
						model_to_add[prop.belongs_to_many.if_null.prop_to_set_with_query] = result.query
						prop.belongs_to_many.if_null.props_to_set.forEach(prop_to_set => {
							model_to_add[prop_to_set.key] = prop_to_set.value 
						})
					}
				} 
				model_to_add.pivot = {}
				prop.belongs_to_many.properties_to_set.forEach(prop_to_set => {
					if (typeof prop_to_set.value === 'object') {
						if (model_to_add[prop_to_set.value.key]) {
							model_to_add.pivot[prop_to_set.key] = model_to_add[prop_to_set.value.key] 
						} else {
							model_to_add.pivot[prop_to_set.key] = prop_to_set.value.value_if_undefined
						}
					} else {
						model_to_add.pivot[prop_to_set.key] = prop_to_set.value 
						console.log('seteando '+prop_to_set.key+' con '+prop_to_set.value)
					}
				})
				this.model[result.prop.key].push(model_to_add)
			} else {
				this.$set(this.model, result.prop.key, result.model.id)
				this.$set(this.model, this.modelNameFromRelationKey(result.prop), result.model)
			}

			console.log(this.model)
		},
		save() {
			if (this.check() && !this.loading) {
				this.loading = true 
				let route = this.routeString(this.model_name)
				if (this.model.id) {
					this.$api.put(route+'/'+this.model.id, this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Actualizado')
						this.$store.commit(this.replaceGuion(this.model_name)+'/add', res.data.model)
						this.$store.commit(this.replaceGuion(this.model_name)+'/setToShow')
						this.$bvModal.hide(this.model_name)
						this.callActions()
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Hubo un Error')
						this.loading = false
					})
				} else {
					this.$api.post(route, this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Guardado')
						this.$store.commit(this.replaceGuion(this.model_name)+'/add', res.data.model)
						this.$store.commit(this.replaceGuion(this.model_name)+'/setToShow')
						this.$bvModal.hide(this.model_name)
						this.callActions()
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Hubo un error')
						this.loading = false
					})
				}
			}
		},
		check() {
			let ok = true
			this.properties.forEach(prop => {
				if (prop.required) {
					if (ok && prop.type == 'select' && this.model[prop.key] == 0) {
						this.$toast.error('Ingrese '+prop.text)
						ok = false
					} else if (ok && this.model[prop.key] == '') {
						this.$toast.error('Ingrese '+prop.text)
						ok = false
					}
				} 
			})
			return ok
		},
		callActions() {
			this.actions_after_save.forEach(action => {
				this.$store.dispatch(action)
			})
		}
	},
	components: {
		ModelComponent: () => import('@/components/common/model/Index'),

		SearchComponent,
		Cards,
		TableComponent,
		Images,
		BtnLoader,
		BtnDelete,
	}
}
</script>
<style lang="sass">
.model-form 
	.custom-radio 
		margin-bottom: 1em 
		p 
			margin-bottom: 0
			text-align: left
	.form-group
		margin-bottom: 0 !important
	hr 
		width: 100%
	.function-value
		font-size: 1.5em
		font-weight: bold
</style>