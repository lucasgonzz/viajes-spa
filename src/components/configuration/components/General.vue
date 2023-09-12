<template>
	<b-card
	class="shadow b-r-5 m-t-15 m-b-15"
	header="Informacion del negocio">
		<b-form-group
		label="Numero de documento">
			<b-form-input
			placeholder="Ingrese Numero de documento"
			v-model="user.doc_number"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Nombre de Empresa">
			<b-form-input
			placeholder="Ingrese Nombre de Empresa"
			v-model="user.company_name"></b-form-input>
		</b-form-group>
		<btn-loader
		@clicked="save"
		text="Actualizar"
		:loader="loading"></btn-loader>
	</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		save() {
			this.loading = true 
			this.$api.put('user', this.user)
			.then(res => {
				this.loading = false 
				this.$toast.success('Actualizado')
			})
			.catch(err => {
				this.loading = false 
				console.log(err)
			})
		}
	}
}
</script>