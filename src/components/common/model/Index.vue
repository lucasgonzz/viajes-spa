<template>
	<div>
	    <confirm
	    :text="text_delete"
	    :actions="[model_name+'/delete']"
	    :id="'delete-'+model_name"></confirm>

	    <confirm
	    v-if="delete_img"
	    text="la imagen"
	    :actions="[model_name+'/deleteImage']"
	    :id="'delete-'+model_name+'-image'"
	    toast="Imagen eliminada"></confirm>

		<b-modal
		:size="size"
		hide-footer
		:title="title"
		:id="model_name">

			<model-form
			:model="model"
			:model_name="model_name"
			:properties="properties"
			:actions_after_save="actions_after_save">
				<template v-slot:belongs="slotProps">
					<slot :model="slotProps.model"></slot>
				</template> 
				<template v-slot:default>
					<slot></slot>
				</template>
			</model-form>

		</b-modal>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import BtnLoader from '@/components/common/BtnLoader'
import BtnDelete from '@/components/common/BtnDelete'

import ModelForm from '@/components/common/model/ModelForm'
export default {
	props: {
		model: {
			type: Object,
		},
		properties: {
			type: Array,
		},
		model_name: {
			type: String,
		},
		text_delete: {
			type: String,
		},
		delete_img: {
			type: Boolean,
			default: false,
		},
		modal_title: String,
		size: {
			type: String,
			default: 'md',
		},
		actions_after_save: {
			type: Array,
			default: () => {
				return []
			}
		},
	},
	components: {
		Confirm,

		ModelForm,
	},
	computed: {
		title() {
			if (this.model.id) {
				return 'Actualizar'
			}
			return this.modal_title
		},
	},
}
</script>