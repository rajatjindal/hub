// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import pagination from 'vuejs-uib-pagination';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import emoji from 'node-emoji';

import App from './App';
import router from './router';

import UrlLink from './components/UrlLink';
import TopicTag from './components/TopicTag';
import AppFooter from '../../node_modules/asyncy-ui-components/dist/AppFooter';
import AppHeader from '../../node_modules/asyncy-ui-components/dist/AppHeader';

const httpLink = new HttpLink({
  uri: 'https://api.asyncy.com/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);
Vue.use(pagination);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;
Vue.component('topic-tag', TopicTag);
Vue.component('url-link', UrlLink);
Vue.component('app-header', AppHeader);
Vue.component('app-footer', AppFooter);

Vue.filter('emoji', value => emoji.emojify(value, () => '🐙'));
Vue.filter('capitalize', (value) => {
  if (value) {
    const str = value.toString();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return '';
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  },
  apolloProvider,
});
