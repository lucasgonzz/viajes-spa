<template>
    <div id="app">
        <logo-loading></logo-loading>
        <nav-component></nav-component>
        <router-view/>
    </div>
</template>
<script>
import LogoLoading from '@/components/common/LogoLoading'
import NavComponent from '@/components/nav/Index'

import update_app from '@/mixins/update_app'
export default {
    mixins: [update_app],
    components: {
        LogoLoading, 
        NavComponent,
    },
    created() {
        this.$store.dispatch('auth/me')
    },
    watch: {
        authenticated() {
            if (!this.authenticated) {
                this.$router.replace({name: 'Login'})
            } else {
                if (this.route_name != 'Orders') {
                    this.$router.replace({name: 'Orders', params: {view: 'dados-de-alta-hoy'}})
                }
                this.callMethods()
            }
        }
    },
    methods: {
        async callMethods() {
            this.$store.commit('auth/setLoading', true)
            this.updateMessage('Descargando informacion')
            
            await this.$store.dispatch('order_operation/getModels')
            await this.$store.dispatch('order_type/getModels')
            await this.$store.dispatch('order_status/getModels')
            this.updateMessage('Descargando clientes')
            await this.$store.dispatch('client/getModels')
            await this.$store.dispatch('client_address/getModels')
            this.updateMessage('Descargando bultos')
            await this.$store.dispatch('package/getModels')
            this.updateMessage('Descargando localidades')
            await this.$store.dispatch('location/getModels')
            this.updateMessage('Descargando conductores')
            await this.$store.dispatch('driver/getModels')
            await this.$store.dispatch('current_acount_payment_method/getModels')
            this.updateMessage('Descargando pedidos')
            await this.$store.dispatch('order/getModels')
            this.$store.commit('auth/setLoading', false)
            this.updateMessage('')
        },
        updateMessage(message) {
            if (!this.there_is_update) {
                this.$store.commit('auth/setMessage', message)
            }
        }
    }
}
</script>
<style lang="sass">
@import "./sass/fonts/styles.css"
@import '@/sass/app.sass'
@import '@/sass/_custom.sass'
#app 
    font-family: Roboto, Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50


.container-fluid 
    background: $background
    min-height: calc(100vh - 70px)

#nav 
    padding: 30px

    a 
        font-weight: bold
        color: #2c3e50

    &.router-link-exact-active 
        color: #42b983
    
  

</style>
