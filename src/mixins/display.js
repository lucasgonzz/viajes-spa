export default {
	methods: {
		setModel(model, model_name, _properties) {
			let properties =  this.getPivotProperties(model, _properties)
			this.$store.commit(model_name+'/setModel', {
				model,
				properties
			})
			this.$bvModal.show(model_name)
		},
		getPivotProperties(model, properties) {
			let properties_to_add = []
			if (properties) {
				properties.forEach(prop => {
					if (prop.belongs_to_many && prop.belongs_to_many.related_with_all) {
						if (!model) {
							let all_models_for_relation = this.modelsStoreFromName(prop.belongs_to_many.model_name)
							let propertye_to_add = {
								key: prop.key,
								value: [], 
							}
							all_models_for_relation.forEach(model_to_relation => {
								propertye_to_add.value.push(this.getRelationToAdd(model, prop, model_to_relation))
							})
							properties_to_add.push(propertye_to_add)
						}
					}
				})
			}
			return properties_to_add
		},
		getRelationToAdd(model, prop, model_to_relation) {
			console.log('agregando '+model_to_relation.name)
			let model_relation_to_add = {
				...model_to_relation,
			}
			if (model && model[prop.key]) {
				let pivot_to_set = model[prop.key].find(r => {
					return r.id == model_to_relation.id 
				})
				if (typeof pivot_to_set != 'undefined') {
					console.log('Ya tenia '+model_to_relation.name)
					model_relation_to_add.pivot = pivot_to_set.pivot
				} else {
					this.setPivot(prop, model, model_relation_to_add, model_to_relation)
				}
			} else {
				this.setPivot(prop, model, model_relation_to_add, model_to_relation)
			}
			console.log('Quedo asi:')
			console.log(model_relation_to_add)
			return model_relation_to_add
		},
		setPivot(prop, model, model_relation_to_add, model_to_relation) {
			let finded = undefined
			if (model) {
				finded = model_to_relation[prop.belongs_to_many.relations_with].find(_model => {
					return _model.id == model[prop.belongs_to_many.related_by]
				})
			}
			model_relation_to_add.pivot = {}
			if (typeof finded != 'undefined') {
				prop.belongs_to_many.properties_to_set.forEach(prop_to_set => {
					if (finded.pivot[prop_to_set.key]) {
						model_relation_to_add.pivot[prop_to_set.key] = finded.pivot[prop_to_set.key]
					} else {
						model_relation_to_add.pivot[prop_to_set.key] = prop_to_set.value
					}
				})
				model_relation_to_add.pivot = finded.pivot
			} else {
				prop.belongs_to_many.properties_to_set.forEach(prop_to_set => {
					model_relation_to_add.pivot[prop_to_set.key] = prop_to_set.value
				})
			}
		},
	}
}