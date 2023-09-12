export default {
	computed: {
		routes() {
			return [
				{
					name: 'Orders',
					text: 'Pedidos',
					action: 'order/getModels',
					param: {
						view: 'dados-de-alta-hoy',
					}
				},
				{
					name: 'Clients',
					text: 'Clientes',
					action: 'client/getModels',
					param: {
						view: 'lista',
					}
				},
				{
					name: 'Drivers',
					text: 'Repartidores',
					action: 'driver/getModels',
					param: {
						view: 'lista',
					}
				},
				{
					name: 'Locations',
					text: 'Localidades',
					action: 'location/getModels',
					param: {
						view: 'lista',
					}
				},
				{
					name: 'Packages',
					text: 'Bultos',
					action: 'package/getModels',
					param: {
						view: 'lista',
					}
				},
			]
		}
	},
	methods: {
		setRoute(route) {
			if (route.action) {
				let models = this.$store.state[route.action.split('/')[0]].models 
				if (!models.length || this.route_name == route.name) {
					this.$store.dispatch(route.action)
					console.log('No tiene models, llamando action')
				} 
				if (this.route_name != route.name) {
					console.log('No estaba en la ruta, redirigiendo')
					this.toRoute(route)
				} 
			} else if (this.route_name == route.name && route.action) {
				this.$store.dispatch(route.action)
				console.log('ya estaba en la ruta, llamando action')
			} else {
				console.log('Solo redirigiendo')
				this.toRoute(route)
			}
		},
		toRoute(route) {
			if (route.param) {
				this.$router.push({name: route.name, params: route.param})
			} else {
				this.$router.push({name: route.name})
			}
		},
		isActiveRoute(route) {
			if (this.route_name == route.name) {
				return 'active-item'
			}  
			return ''
		},
		logout() {
			this.$store.dispatch('auth/logout')
		}
	}
}