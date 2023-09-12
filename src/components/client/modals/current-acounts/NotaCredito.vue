<template>
<b-modal 
id="nota-credito" 
title="Nota Credito" 
hide-footer>
    <b-form-group
    label="Fecha del pago">
        <b-form-checkbox
        :value="true"
        :unchecked-value="false"
        v-model="form.current_date">
            Dia de hoy
        </b-form-checkbox>
        <b-form-datepicker
        class="m-t-10"
        placeholder="Ingrese la fecha en la que se hizo el pago"
        v-if="!form.current_date"
        v-model="form.created_at">
        </b-form-datepicker>
    </b-form-group>
    
    <b-form-group>
        <b-form-input
        type="number"
        min="0"
        @keydown.enter="save"
        placeholder="Ingrese el monto"
        v-model="form.haber"></b-form-input>
    </b-form-group>
    <b-form-group>
        <b-form-textarea
        type="text"
        @keydown.enter="save"
        placeholder="Ingrese una descripcion"
        v-model="form.description"></b-form-textarea>
    </b-form-group>
    <btn-loader
    @clicked="save"
    text="Registrar nota de credito"
    :loader="loading"></btn-loader>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'

import current_acounts from '@/mixins/current_acounts' 
export default {
	name: 'NotaCredito',
    mixins: [current_acounts],
    components: {
        BtnLoader
    },
    data() {
        return {
            form: {
                current_date: true,
                created_at: '',
                haber: '',
                description: '',
            },
            loading: false,
        }
    },
    methods: {
    	save() {
    		this.loading = true
    		this.$api.post('/current-acount/nota-credito', {
    			client_id:   this.client.id,
    			...this.form,
    		})
    		.then(res => {
                this.$store.dispatch('current_acount/getModels')
    			this.loading = false
    			this.$toast.success('Nota de credito registrada')
                this.$bvModal.hide('nota-credito')
                this.clear()
    		})
    		.catch(err => {
    			this.loading = false
    			console.log(err)
    			this.$toast.error('Error al registrar nota de credito')
    		})
    	},
        clear() {
            this.form.current_date = true
            this.form.created_at = ''
            this.form.haber = ''
            this.form.description = ''
        }
    }
}
</script>
<style lang="sass">
</style>
