export default {
	data() {
		return {
			progress: 0,
			there_is_update: false,
		}
	},
	watch: {
		loading() {
			console.log('se cambio loading')
		}
	},
	computed: {
		loading() {
			return this.$store.state.auth.loading
		},
	},
	created() {
        document.addEventListener(
            'swUpdated', this.updateApp, { once: true }
        )
		console.log('Escuchando evento de actualizacion')
	},
	methods: {
		updateApp() {
			this.there_is_update = true
		    console.log('Se llamo updateApp')
		    this.$store.commit('auth/setMessage', 'Descargando actualizacion')
		    this.$store.commit('auth/setLoading', true)
			let interval = window.setInterval(() => {
		    	this.$store.commit('auth/setMessage', 'Descargando actualizacion')
                this.progress += 10
                console.log('se aumento progress a '+this.progress)
                if (this.progress == 70) {
		    		this.$store.commit('auth/setMessage', 'Instalando')
                }
                if (this.progress == 100) {
                    window.clearInterval(interval)
                    console.log('Se actualizo')
		    		location.reload(true)
                }
            }, 500)
		}
	}
}