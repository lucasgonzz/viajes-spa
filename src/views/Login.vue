<template>
	<b-container
	fluid>
		<b-row
		class="all-center">
			<b-col
			cols="12"
			md="6"
			lg="5"
			xl="3">
				<div 
				class="s-2 p-20 b-r-5 b-w">
					<login-form></login-form>
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>
import LoginForm from '@/components/login/LoginForm'
export default {
	components: {
		LoginForm
	},
}
</script>