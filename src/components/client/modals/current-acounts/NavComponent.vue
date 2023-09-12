<template>
	<b-form 
	class="m-b-15"
	@submit.prevent="getCurrentAcounts"
	inline>
		<label>Mostrar cuentas corrientes de </label>
		<b-form-input
		v-model="months_ago"
		class="input-sm m-l-10 m-r-10"
		min="1"
		type="number"></b-form-input>
		<label>meses atras</label>
		<b-button
		type="submit"
		variant="primary"
		class="m-l-15">
			Buscar
		</b-button>

		<b-button
		@click="print"
		variant="danger"
		class="m-l-15">
			<i class="icon-print"></i>
		</b-button>

		<b-button
		v-if="!current_acounts.length"
		class="m-l-15"
		@click="saldoInicial"
		variant="primary">
			Saldo inicial
		</b-button>

		<!-- <b-button
		v-if="current_acounts.length"
		@click="print"
		variant="danger"
		class="m-l-15">
			<i class="icon-print"></i>
			<span
			v-show="selected_currents_acounts.length">
				{{ selected_currents_acounts.length }}
			</span>
			<span
			v-show="!selected_currents_acounts.length">
				todas
			</span>
		</b-button> -->
		
	</b-form>
</template>
<script>
import current_acounts from '@/mixins/current_acounts'
export default {
	name: 'CurrentAcountsNav',
	mixins: [current_acounts],
	methods: {
        saldoInicial() {
            this.$bvModal.show('saldo-inicial')
        },
		getCurrentAcounts() {
			this.$store.dispatch('current_acount/getModels')
		},
		print() {
        	let link = process.env.VUE_APP_API_URL+'/current-acount/pdf/'+this.client.id+
        	'/'+this.months_ago
            window.open(link)
		},
	}
}
</script>