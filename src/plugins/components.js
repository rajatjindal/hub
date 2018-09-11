import Vue from 'vue'
import Clipboard from 'vue-clipboard2'
import Pagination from 'vuejs-uib-pagination'
import AppFooter from 'asyncy-ui-components/dist/AppFooter'
import TwoColumnSidebar from '@/components/TwoColumnSidebar'
import AsyncyVue from 'asyncy-vue'
import UrlLink from '@/components/UrlLink'
import TopicTag from '@/components/TopicTag'
import TopicsList from '@/components/TopicsList'

Vue.use(AsyncyVue)

Vue.component('two-column-sidebar', TwoColumnSidebar)
Vue.component('topic-tag', TopicTag)
Vue.component('url-link', UrlLink)
Vue.component('app-footer', AppFooter)
Vue.component('topics-list', TopicsList)

Vue.use(Clipboard)
Vue.use(Pagination) // what is the pagination plugin for ?
