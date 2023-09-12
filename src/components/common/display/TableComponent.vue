<template>
	<div>
		<div
		v-if="!loading">
			<b-table
			v-if="models.length"
			class="s-2 b-r-5 animate__animated animate__fadeIn"
			head-variant="dark"
			striped
			responsive
			:fields="fields"
			:items="items">
				<template #cell(edit)="data">
					<div class="cont-edit">
						<b-button
						v-if="show_btn_edit"
						@click="clicked(models[data.index])"
						variant="primary">
							<i class="icon-edit"></i>
						</b-button>

						<div
						class="cont-pivot-inputs"
						v-if="pivot && pivot.properties_to_set">
							<b-form-group
							v-for="(prop, index) in pivot.properties_to_set"
							:key="'pivot-prop-'+index"
							class="pivot-input"
							:label="prop.text">
								<b-form-input
								:type="prop.type"
								:placeholder="'Ingrese '+prop.text"
								v-model="models[data.index].pivot[prop.key]"></b-form-input>
							</b-form-group>
						</div>
					</div>
					<slot :model="models[data.index]"></slot>
				</template>
			</b-table>
			<p 
			v-else-if="!models.length && model_name_spanish"
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay {{ model_name_spanish }}
			</p>
		</div>
		<b-skeleton-table
		class="animate__animated animate__fadeIn"
		v-else
		:rows="10"
		:columns="propertiesToShow(properties, true).length"
		:table-props="{ bordered: true, striped: true }"
		></b-skeleton-table>
	</div>
</template>
<script>
import display from '@/mixins/display'
export default {
	mixins: [display],
	props: {
		loading: Boolean,
		models: Array,
		model_name: String,
		model_name_spanish: String,
		properties: Array,
		set_model_on_click: Boolean,
		on_click_set_property: String,
		pivot: {
			type: Object,
			default: null,
		},
		pivot_model: {
			type: Object,
			default: null,
		},
		show_btn_edit: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		fields() {
			let fields = []
			this.propertiesToShow(this.properties, true).forEach(prop => {
				fields.push({
					key: prop.key,
					label: prop.text,
				})
			})
			fields.push({
				key: 'edit',
				label: '',
			})
			return fields 
		},
		items() {
			let items = []
			let index = 0
			let item = {}
			this.models.forEach(model => {
				item = {}
				this.propertiesToShow(this.properties, true).forEach(prop => {
					item[prop.key] = this.propText(model, prop)
				})
				items.push(item)
			})
			return items
		},
	},
	methods: {
		clicked(model) {
			if (this.set_model_on_click) {
				if (this.on_click_set_property) {
					this.setModel(model[this.on_click_set_property], this.model_name, this.properties)
				} else {
					this.setModel(model, this.model_name, this.properties)
				}
			} else {
				this.$emit('clicked', model)
			}
		},
	}
}
</script>
<style lang="sass">
.cont-edit 
	display: flex
	flex-direction: row
	justify-content: center
	align-items: center
	.cont-pivot-inputs
		display: flex
	.pivot-input
		width: 200px
		margin-left: 1em
</style>