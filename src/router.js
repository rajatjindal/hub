import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import ServiceIndex from '@/views/Service/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/Services'),
      props: function (route) {
        return { search: route.query.search, category: route.query.c }
      }
    },
    {
      path: '/functions',
      name: 'functions',
      component: () => import('@/views/PageNotFound')
    },
    {
      path: '/apps',
      name: 'apps',
      component: () => import('@/views/PageNotFound')
    },
    {
      path: '/r/:alias/:repo',
      alias: '/service/:alias:repo',
      component: ServiceIndex,
      props: function (route) {
        return {
          alias: route.path.includes('service') ? route.params.alias + route.params.repo : undefined,
          owner: !route.path.includes('service') ? route.params.alias : undefined,
          repo: !route.path.includes('service') ? route.params.repo : undefined
        }
      },
      children: [{
        path: '',
        name: 'service',
        component: () => import('@/views/Service/Home')
      }, {
        path: 'guide',
        name: 'guide',
        component: () => import('@/views/Service/Guide')
      }]
    },
    // {
    //   path: '/r/:owner',
    //   component: () => import('@/views/Organization'),
    //   name: 'organization',
    //   meta: {
    //     hasSearch: true
    //   },
    //   props: function (route) {
    //     return { owner: route.params.owner }
    //   }
    // },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/Faq')
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('@/views/PageNotFound')
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (to.hash) {
          resolve({ selector: to.hash })
        } else {
          resolve()
        }
      }, 200)
    })
  }
})
