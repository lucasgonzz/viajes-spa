import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import model from '@/models/user'
export default {
	namespaced: true,
	state: {
		models: [],
		model: {},

		delete: null,
		delete_image: null,
		
		display: 'cards',

		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setModel(state, value = null) {
			if (value) {
				state.model = value
			} else {
				let obj = {
					id: null
				}
				model.props.forEach(prop => {
					obj[prop.key] = prop.value 
				})
				state.model = obj
			}
		},
		setModels(state, value) {
			state.models = value
		},
		add(state, value) {
			let index = state.models.findIndex(item => {
				return item.id == value.id
			})
			if (index == -1) {
				state.models.unshift(value)
			} else {
				state.models.splice(index, 1, value)
			}
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
			})
			state.models.splice(index, 1)
		},
		setDeleteImage(state, value) {
			state.delete_image = value
		},
		deleteImage(state, value) {
			let index = state.models.images.findIndex(model => {
				return model.id == state.delete.id
			})
			state.models.splice(index, 1)
		},
		setDisplay(state, value) {
			state.display = value 
		},
	},
	actions: {
		getModels({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/users')
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.models)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('/api/users/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
		deleteImage({ commit, state }) {
			return axios.delete('/api/users/image/'+state.delete_image.id)
			.then((res) => {
				commit('add', res.data.model)
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
}
