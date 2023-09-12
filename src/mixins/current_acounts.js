export default {
	computed: {
		months_ago: {
			get() {
				return this.$store.state.current_acount.months_ago
			},
			set(value) {
				this.$store.commit('current_acount/setMonthsAgo', value)
			}
		},
		current_acounts() {
			return this.$store.state.current_acount.models
		},
		client() {
			return this.$store.state.current_acount.client
		},
	}	
}