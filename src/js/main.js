// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import pagination from 'vuejs-uib-pagination';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import VueClipboard from 'vue-clipboard2';
import emoji from 'node-emoji';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import App from './App';
import router from './router';

import TwoColumnSidebar from './layouts/TwoColumnSidebar';
import UrlLink from './components/UrlLink';
import TopicTag from './components/TopicTag';
import TopicsList from './components/TopicsList';
import AButton from '../../node_modules/asyncy-ui-components/dist/AButton';
import AInput from '../../node_modules/asyncy-ui-components/dist/AInput';
import AppFooter from '../../node_modules/asyncy-ui-components/dist/AppFooter';
import AppHeader from '../../node_modules/asyncy-ui-components/dist/AppHeader';

import '../../node_modules/asyncy-ui-components/dist/AButton.css';
import '../../node_modules/asyncy-ui-components/dist/AInput.css';
import '../../node_modules/asyncy-ui-components/dist/AppFooter.css';
import '../../node_modules/asyncy-ui-components/dist/AppHeader.css';
import '../../node_modules/asyncy-ui-components/dist/css/global.css';

/* global __SENTRY_DSN__ */
Raven.config(__SENTRY_DSN__, {
  environment: process.env.NODE_ENV,
}).addPlugin(RavenVue, Vue)
  .install();

const httpLink = new HttpLink({
  uri: 'https://api.asyncy.com/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);
Vue.use(VueClipboard);
Vue.use(pagination);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;
Vue.component('two-column-sidebar', TwoColumnSidebar);
Vue.component('topic-tag', TopicTag);
Vue.component('url-link', UrlLink);
Vue.component('a-button', AButton);
Vue.component('a-input', AInput);
Vue.component('app-header', AppHeader);
Vue.component('app-footer', AppFooter);
Vue.component('topics-list', TopicsList);

Vue.filter('emoji', value => emoji.emojify(value, () => '🐙'));
Vue.filter('from-topic', (value) => {
  const values = value.split('-');
  const capitalized = values.map(v => v.charAt(0).toUpperCase() + v.slice(1));
  return capitalized.join(' ');
});
Vue.filter('capitalize', (value) => {
  if (value) {
    const str = value.toString();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return '';
});

Raven.context(() => {
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
});
