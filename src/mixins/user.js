export default {
	computed: {
		user() {
			return this.$store.state.auth.user
		},
		authenticated() {
			return this.$store.state.auth.authenticated
		},
	}
}