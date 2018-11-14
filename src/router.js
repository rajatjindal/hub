import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
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
      name: 'Service',
      component: () => import('@/views/Integration'),
      meta: {
        hasSearch: true
      },
      props: function (route) {
        return { alias: route.params.alias }
      }
    },
    {
      path: '/tags/:topic',
      name: 'Tags',
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
      meta: {
        hasSearch: true
      },
      props: function (route) {
        return { owner: route.params.owner }
      }
    },
    {
      path: '/r/:owner/:repo',
      component: () => import('@/views/Integration'),
      meta: {
        hasSearch: true
      },
      props: function (route) {
        return {
          owner: route.params.owner,
          repo: route.params.repo
        }
      }
    },
    {
      path: '/integrations',
      name: 'integrations',
      component: () => import('@/views/Integrations')
    },
    {
      path: '/integration/:repo',
      name: 'integration',
      component: () => import('@/views/Integration'),
      props: function (route) {
        return {
          repo: route.params.repo
        }
      }
    },
    {
      path: '/integration/:repo/guide',
      name: 'guide',
      component: () => import('@/views/Guide'),
      props: function (route) {
        return {
          repo: route.params.repo
        }
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
      path: '*',
      component: () => import('@/views/PageNotFound')
    }
  ],
  scrollBehavior: function () {
    return { x: 0, y: 0 }
  }
})
