import moment from 'moment'
moment.locale('es')
import numeral from 'numeral'
export default {
	computed: {
		view() {
			return this.$route.params.view
		},
		sub_view() {
			return this.$route.params.sub_view
		},
        route_name() {
            return this.$route.name
        },
        attempt_property() {
            return process.env.VUE_APP_ATTEMPT_PROPERTY
        },
	},
	methods: {

		// --------------------------------- Model ---------------------------------

		showProperty(property, model, check_if_is_empty, check_show_on_form = false) {
			if (check_show_on_form && property.not_show_on_form) {
				return false
			}
			if (check_if_is_empty && ((!model[property.key] || model[property.key] == '') && !property.function )) {
				return false
			}
			if (property.v_if) {
				let array = property.v_if[0].split('.')
				let prop_to_check
				let prop = array[0]
				let sub_prop = null
				if (array[1]) {
					sub_prop = array[1]
				}
				if (model[prop]) {
					if (sub_prop && model[prop][sub_prop]) {
						prop_to_check = model[prop][sub_prop]
					}  else {
						prop_to_check = model[prop]
					}
					if (typeof prop_to_check == 'String') {
						prop_to_check = prop_to_check.toLowerCase()
					}
					if (property.v_if[1] == '=') {
						return prop_to_check == property.v_if[2] 
					} else if (property.v_if[1] == '<') {
						return prop_to_check < property.v_if[2]
					} else if (property.v_if[1] == '>') {
						return prop_to_check > property.v_if[2]
					}
				} else {
					return false
				}
			}
			return true 
		},
		modelsToSearch(prop, model) {
			let store 
			if (prop.store) {
				store = prop.store
			} else {
				store = this.modelNameFromRelationKey(prop)
			}
			let models = this.$store.state[store].models 
			if (prop.belongs_to) {
				return models.filter(_model => {
					return _model[prop.belongs_to+'_id'] == model[prop.belongs_to+'_id'] 
				})
			}
			return models 
		},
		relationshipNameFromKey(key) {
			return key+'_id'
		},
		modelNameFromRelationKey(prop, in_plural = false, from_store = true) {
			let model_name
			if (prop.store && from_store) {
				model_name = prop.store
			} else {
				model_name = prop.key.substring(0, prop.key.length-3)
			}
			if (in_plural) {
				return this.modelPlural(model_name)
			} 
			return model_name 
		},
		modelPropertiesFromRelationKey(prop) {
			if (prop.store) {
				return require('@/models/'+prop.store).default.properties
			} 
			return require('@/models/'+this.modelNameFromRelationKey(prop)).default.properties
		},
		modelPropertiesFromName(model_name) {
			return require('@/models/'+model_name).default.properties
		},
		modelStoreFromName(model_name) {
			return this.$store.state[model_name].model 
		},
		modelsStoreFromName(model_name) {
			return this.$store.state[model_name].models
		},
		propText(model, prop) {
			if (prop.function) {
				return this.getFunctionValue(prop, model)
			}
			if (this.isRelationKey(prop)) {
				let relationship = this.modelNameFromRelationKey(prop, false, false)
				if (model[relationship]) {
					return model[relationship].name 
				}
			}
			if (prop.is_boolean) {
				if (model[prop.key]) {
					return 'Si'
				}
				return 'No'
			}
			if (prop.type == 'date') {
				return this.date(model[prop.key] )
			}
			let array = prop.key.split('.')
			if (model[array[0]] && array[1]) {
				return model[array[0]][array[1]]
			}
			return model[prop.key] 
		},
		isRelationKey(prop) {
			let last = prop.key.substring(prop.key.length-3, prop.key.length)
			return last == '_id'
		},
		propertiesToShow(props, with_title = false) {
			if (with_title) {
				return props.filter(prop => {
					return prop.show || prop.is_title
				})
			} else {
				return props.filter(prop => {
					return prop.show 
				})
			}
		},
		modelPlural(model, replace_guion = false) {
			let plural 
			if (model.charAt(model.length-1) == 'y') {
				plural = model.substring(0, model.length-1)+'ies'
			} else if (model.charAt(model.length-1) == 's') {
				plural = model+'es'
			} else {
				plural = model +'s'
			}
			if (replace_guion) {
				plural = plural.replace('-', '_')
			}
			return plural
		},
		getOptions(options_store, model_name, prop_name = 'name') {
			let store = options_store.substring(0, options_store.length-3)
			// store = this.modelPlural(store)
			let models = this.$store.state[store].models

			let options = []
			options.push({
				value: 0, text: 'Seleccione '+model_name
			})
			models.forEach(item => {
				options.push({value: item.id, text: item[prop_name]})
			})
			return options
		},

		// --------------------------------- Generals ---------------------------------

		replaceGuion(string) {
			return string.replaceAll('-', '_')
		},
		routeString(string, in_plural = false) {
			let result 
			if (in_plural) {
				result = this.modelPlural(string.toLowerCase().replaceAll(' ', '-'))
			} else {
				result = string.toLowerCase().replaceAll(' ', '-')
			}
			return result.replaceAll('_', '-')
		},
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		},
		date(d, complete = false) {
			if (d) {
				if (complete) {
					return moment(d).format('DD/MM/YY h:mm:ss')
				}
				return moment(d).format('DD/MM/YY')
			}
			return '-'
		},
		hour(d) {
			return moment(d).format('HH:mm')
		},
		hour_from_time(d) {
			return moment(d, 'HH:mm:ss').format('HH:mm')
		},
		price(p, with_decimals = true) {
			if (p) {
				let price = numeral(p).format('$0,0.00')
				if (with_decimals) {
					return price
				} else {
					if (price.substr(price.length-2, price.length) == '00') {
						return price.substr(0, price.length-3)
					}
				}
			}
			return '-'
		},
		getMonth(d) {
			return moment(d).format('MMM')
		},
		getDay(d) {
			return moment(d).format('dd')
		},
		since(date, fisrt_upp = false) {
			if (date) {
				if (fisrt_upp) {
					return this.capitalize(moment(date).fromNow())
				} else {
					return moment(date).fromNow()
				}
			}
			return '-'
		},
	}
}