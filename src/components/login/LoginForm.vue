<template>
	<div
	class="loading-form">
		<img 
		src="@/assets/logo.jpg">
		<p class="title">
			Iniciar Sesion
		</p>
		<b-form-group>
			<b-form-input
			@keyup.enter="login"
			v-model="form[attempt_property]"
			placeholder="Numero de Documento"></b-form-input>
		</b-form-group>
		<b-form-group>
			<b-form-input
			@keyup.enter="login"
			v-model="form.password"
			type="password"
			placeholder="Contraseña"></b-form-input>
		</b-form-group>
		<btn-loader
		@clicked="login"
		text="Ingresar"
		:loader="loading"></btn-loader>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			form: {
				doc_number: '',
				password: '',
			},
			loading: false,
		}
	},
	methods: {
		login() {
			if (this.check() && !this.loading) {
				this.loading = true 
				this.$axios.post('login', this.form)
				.then(res => {
					this.loading = false
					if (res.data.login) {
						this.$store.dispatch('auth/me')
					} else {
						this.$toast.error('Sus credenciales son incorrectas')
					}
				})
				.catch(err => {
					console.log(err)
					this.loading = false 
					this.$toast.error('Error al ingresar')
				})
			}
		},
		check() {
			if (this.form[this.attempt_property] == '') {
				this.$toast.error('Ingrese el '+this.attempt_property)
				return false
			}
			if (this.form.password == '') {
				this.$toast.error('Ingrese la contraseña')
				return false
			}
			return true 
		}
	}
}
</script>
<style lang="sass">
.loading-form
	img 
		width: 100px
		margin-bottom: 1em
</style>