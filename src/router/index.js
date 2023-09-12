import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Clients from '../views/Clients.vue'
import Orders from '../views/Orders.vue'
import Drivers from '../views/Drivers.vue'
import Locations from '../views/Locations.vue'
import Packages from '../views/Packages.vue'
import Configuration from '../views/Configuration.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/iniciar-sesion',
        name: 'Login',
        component: Login
    },
    {
        path: '/pedidos/:view',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/clientes/:view',
        name: 'Clients',
        component: Clients
    },
    {
        path: '/conductores/:view',
        name: 'Drivers',
        component: Drivers
    },
    {
        path: '/localidades/:view',
        name: 'Locations',
        component: Locations
    },
    {
        path: '/bultos/:view',
        name: 'Packages',
        component: Packages
    },
    {
        path: '/configuracion',
        name: 'Configuration',
        component: Configuration
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
