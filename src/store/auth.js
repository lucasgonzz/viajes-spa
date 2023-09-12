import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		authenticated: null,
		user: null,

		message: '',
		loading: false,
	},
	mutations: {
		setAuthenticated(state, value) {
			state.authenticated = value
		},
		setUser(state, value) {
			state.user = value
			console.log(state.user)
		},
		setLoading(state, value) {
			state.loading = value
		},
		setMessage(state, value) {
			state.message = value
		},
	},
	actions: {
		me({commit}) {
			commit('setMessage', 'Iniciando')
			commit('setLoading', true)
			axios.get('/sanctum/csrf-cookie')
			.then(() => {
				return axios.get('/api/user')
				.then(res => {
					commit('setMessage', '')
					commit('setLoading', false)
					commit('setAuthenticated', true)
					commit('setUser', res.data.user)
				})
				.catch(() => {
					commit('setMessage', '')
					commit('setLoading', false)
					commit('setAuthenticated', false)
					commit('setUser', null)
				})
			})
		},
		logout({ commit }) {
			commit('setMessage', 'Cerrando Sesion')
			commit('setLoading', true)
			return axios.post('/logout')
            .then(() => {
				commit('setMessage', '')
                commit('setLoading', false)
                commit('setAuthenticated', false)
                commit('setUser', null)
            })
            .catch(err => {
                commit('setLoading', false)
				commit('setMessage', '')
                console.log(err)
            })
		}
	},
}
