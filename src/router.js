import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import ServiceIndex from '@/views/Service/Index'
// import Organization from '@/views/Organization'
// import SearchResults from '@/views/SearchResults'
// import Service from '@/views/Service'
// import Tags from '@/views/Tags'
// import Faq from '@/views/Faq'
// import PageNotFound from '@/views/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'hub',
      component: Index
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchResults'),
      props: function (route) {
        return { search: route.query.q }
      }
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/Services')
    },
    {
      path: '/service/:alias',
      component: ServiceIndex,
      meta: {
        hasSearch: true
      },
      props: function (route) {
        return { alias: route.params.alias }
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
    {
      path: '/r/:owner/:repo',
      component: ServiceIndex,
      meta: {
        hasSearch: true
      },
      props: function (route) {
        return {
          owner: route.params.owner,
          repo: route.params.repo
        }
      },
      children: [{
        path: '',
        name: 'service_repo',
        component: () => import('@/views/Service/Home')
      }, {
        path: 'guide',
        name: 'guide_repo',
        component: () => import('@/views/Service/Guide')
      }]
    },
    {
      path: '/tags/:topic',
      name: 'tags',
      component: () => import('@/views/Tags'),
      meta: {
        hasSearch: true
      },
      props: function (route) {
        return { topic: route.params.topic }
      }
    },
    {
      path: '/r/:owner',
      component: () => import('@/views/Organization'),
      name: 'organization',
      meta: {
        hasSearch: true
      },
      props: function (route) {
        return { owner: route.params.owner }
      }
    },
    {
      path: '/faq',
      component: () => import('@/views/Faq'),
      meta: {
        hasSearch: true
      }
    },
    {
      path: '/new-service',
      name: 'new-service',
      component: () => import('@/views/NewService')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard')
    },
    {
      path: '*',
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
