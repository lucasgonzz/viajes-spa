import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/auth'
import user from '@/store/user'
import order from '@/store/order'
import client from '@/store/client'
import order_type from '@/store/order_type'
import client_address from '@/store/client_address'
import order_status from '@/store/order_status'
import driver from '@/store/driver'
import order_operation from '@/store/order_operation'
import location from '@/store/location'
import _package from '@/store/package'
import current_acount from '@/store/current_acount'
import current_acount_payment_method from '@/store/current_acount_payment_method'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        user,
        order,
        client,
        order_type,
        client_address,
        order_status,
        driver,
        order_operation,
        location,
        package: _package,
        current_acount,
        current_acount_payment_method,
    }
})
