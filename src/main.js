import Vue from 'vue'
import Hub from '@/Hub'
import router from '@/router'
// disable the store for now
// import store from '@/store'
import { Raven, createProvider } from '@/plugins'

Vue.config.productionTip = false

Raven.context(() => {
  new Vue({
    router,
    // store,
    apolloProvider: createProvider({ connectToDevTools: process.env.NODE_ENV === 'development' }),
    render: h => h(Hub)
  }).$mount('#hub')
})
