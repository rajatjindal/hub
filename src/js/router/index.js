import Vue from 'vue';
import Router from 'vue-router';
import Index from '../views/Index';
import SearchResults from '../views/SearchResults';
import Service from '../views/Service';
import Tags from '../views/Tags';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hub',
      component: Index,
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchResults,
      props(route) {
        return { search: route.query.q };
      },
    },
    {
      path: '/service/:alias',
      name: 'Service',
      component: Service,
      meta: {
        hasSearch: true,
      },
      props(route) {
        return { alias: route.params.alias };
      },
    },
    {
      path: '/tags/:topic',
      name: 'Tags',
      component: Tags,
      meta: {
        hasSearch: true,
      },
      props(route) {
        return { topic: route.params.topic };
      },
    },
    {
      path: '/r/:owner/:repo',
      beforeEnter({ params }) {
        window.location = `https://www.github.com/${params.owner}/${params.repo}`;
      },
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
