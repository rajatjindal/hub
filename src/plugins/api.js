import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

export class Api {
  constructor(baseURL = process.env.VUE_APP_API_BASEURL, timeout = process.env.VUE_APP_API_TIMEOUT, refresh = (process.env.NODE_ENV === 'production')) {
    this.log(`[HUB][service::Api] initializing...`)
    this.http = axios.create({ baseURL, timeout })
    store.commit('setUserLoggedIn', false)
    if (refresh) {
      this.refresh()
    }
    this.log(`[HUB][service::Api] initialized. ${this.loggedIn ? 'connected' : 'public'} user`)
  }

  log (message) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(message)
    }
  }

  process (method, route, params = {}) {
    return new Promise(resolve => {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
        resolve(undefined, new Error('method is invalid'))
      } else {
        this.log(`[HUB][service::Api] processing ${method.toUpperCase()}:${route} with params: ${JSON.stringify(params)}`)
        try {
          this.http[method](route, params).then((res) => resolve([res, undefined])).catch((err) => resolve([undefined, err]))
        } catch (e) {
          console.log('api error', e)
        }
      }
    })
  }

  isLoggedIn () {
    return store.getters.isUserLoggedIn
  }

  async refresh () {
    store.commit('setUserRefreshing', true)
    const [res, error] = await this.process('get', 'ping')
    store.commit('setUserLoggedIn', (!!res && !error))
    store.commit('setUser', res ? res.data : undefined)
    store.commit('setUserRefreshing', false)
  }

  dummyUser () {
    store.commit('setUserRefreshing', true)
    setTimeout(() => {
      store.commit('setUserLoggedIn', true)
      store.commit('setUser', { name: 'microservices', username: 'microservice', email: 'hello@asyncy.com' })
      store.commit('setUserRefreshing', false)
    }, 1000)
  }
}

const plugin = {
  install (Vue) {
    Vue.prototype.$api = new Api()
  }
}

Vue.use(plugin)

export default plugin
