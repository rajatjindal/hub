import Vue from 'vue'
import Hub from '@/Hub'
import router from '@/router'
// disable the store for now
// import store from '@/store'
import { createProvider } from '@/plugins/vue-apollo'
// import '@/plugins/styles'
import '@/plugins/components'
import '@/plugins/filters'
import '@/plugins/scrollspy'
import '@/plugins/chart'
import '@/plugins/prism'
import '@/plugins/fontawesome'
import Raven from '@/plugins/sentry'

Vue.config.productionTip = false

Raven.context(() => {
  new Vue({
    router,
    // store,
    apolloProvider: createProvider({ connectToDevTools: process.env.NODE_ENV === 'development' }),
    render: h => h(Hub)
  }).$mount('#hub')
})
