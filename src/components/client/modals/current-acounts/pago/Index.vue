<template>
<b-modal 
id="pago" 
title="Pago" 
hide-footer>
    <b-form-group
    label="Fecha del pago">

        <b-form-checkbox
        :value="true"
        :unchecked-value="false"
        v-model="pago.current_date">
            Dia de hoy
        </b-form-checkbox>
        <b-form-datepicker
        class="m-t-10"
        placeholder="Ingrese la fecha en la que se hizo el pago"
        v-if="!pago.current_date"
        v-model="pago.created_at">
        </b-form-datepicker>

    </b-form-group>

    <b-form-group>
        <b-form-input
        type="number"
        min="0"
        @keydown.enter="save"
        placeholder="Ingrese el pago"
        v-model="pago.haber"></b-form-input>
    </b-form-group>

    <payment-method
    :pago="pago"></payment-method>

    <checks
    :pago="pago"></checks>  

    <b-form-group>
        <b-form-textarea
        @keydown.enter="save"
        placeholder="Descripcion"
        v-model="pago.description"></b-form-textarea>
    </b-form-group> 

    <btn-loader
    @clicked="save"
    :loader="loading"
    text="Registrar pago"></btn-loader>

</b-modal>
</template>
<script>
import current_acounts from '@/mixins/current_acounts'

import PaymentMethod from '@/components/client/modals/current-acounts/pago/PaymentMethod'
import Checks from '@/components/client/modals/current-acounts/pago/Checks'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'CurrentAcountPago',
    mixins: [current_acounts],
    components: {
        PaymentMethod,
        Checks,
    	BtnLoader,
    },
    data() {
        return {
        	pago: {
                current_date: true,
                created_at: '',
                haber: '',
                description: '',
                current_acount_payment_method_id: 0,
                checks: [
                    {
                        bank: '',
                        payment_date: '',
                        amount: '',
                        num: '',
                    },
                ],
            },
        	loading: false,
        }
    },
    methods: {
    	save() {
            if (this.check()) {
        		this.loading = true
        		this.$api.post('/current-acount/pago', {
        			client_id: this.client.id,
        			...this.pago,
        		})
        		.then(res => {
                    this.$store.dispatch('current_acount/getModels')
        			this.loading = false
        			this.$toast.success('Pago registrado')
                    this.$bvModal.hide('pago')
                    this.clear()
        		})
        		.catch(err => {
        			this.loading = false
        			console.log(err)
        			this.$toast.error('Error al registrar pago')
        		})
            }
    	},
        check() {
            if (this.pago.haber == '') {
                this.$toast.error('Ingrese el importe del pago')
                return false
            }
            if (this.pago.current_acount_payment_method_id == 1) {
                this.pago.checks.forEach(check => {
                    if (check.bank == '') {
                        this.$toast.error('Ingrese el banco del cheque')
                        return false
                    }
                    if (check.payment_date == '') {
                        this.$toast.error('Ingrese la fecha de corbo del cheque')
                        return false
                    }
                    if (check.amount == '') {
                        this.$toast.error('Ingrese imorte del cheque')
                        return false
                    }
                    if (check.num == '') {
                        this.$toast.error('Ingrese el numero del cheque')
                        return false
                    }
                })
            }
            return true
        },
        clear() {
            this.pago = {
                current_date: true,
                created_at: '',
                haber: '',
                description: '',
                current_acount_payment_method_id: 0,
                checks: [
                    {
                        bank: '',
                        payment_date: '',
                        amount: '',
                        num: '',
                    },
                ],
            }
        }
    }
}
</script>
<style lang="sass">
</style>
