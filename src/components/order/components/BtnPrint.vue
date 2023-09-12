<template>
	<b-button
	v-if="model.id"
	@click="print"
	class="m-b-10"
	block
	variant="outline-danger">
		<i class="icon-print"></i>
		Imprimir PDF
	</b-button>
</template>
<script>
export default {
	props: ['model'],
	methods: {
		print() {
			let link = process.env.VUE_APP_API_URL+'/order/pdf/'+this.model.id 
			window.open(link)
		}
	}
}
</script>