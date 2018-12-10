import Vue from 'vue'
import Hub from '@/Hub'
import router from '@/router'
import store from '@/store'
import { Raven, createProvider } from '@/plugins'

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   if (to && to.meta && to.meta.private && !store.getters.isUserLoggedIn) {
//     next({ name: 'hub' })
//   } else {
//     next()
//   }
// })

Raven.context(() => {
  new Vue({
    router,
    store,
    apolloProvider: createProvider({ connectToDevTools: process.env.NODE_ENV === 'development' }),
    render: h => h(Hub)
  }).$mount('#hub')
})
