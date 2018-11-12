import Vue from 'vue'
import Clipboard from 'vue-clipboard2'
import TwoColumnSidebar from '@/components/TwoColumnSidebar'
import AsyncyVue from '@asyncy/vue'
import UrlLink from '@/components/UrlLink'
import TopicTag from '@/components/TopicTag'
import TopicsList from '@/components/TopicsList'
import '@asyncy/vue/dist/asyncy-vue.css'

Vue.use(AsyncyVue)

Vue.component('two-column-sidebar', TwoColumnSidebar)
Vue.component('topic-tag', TopicTag)
Vue.component('url-link', UrlLink)
Vue.component('topics-list', TopicsList)

Vue.use(Clipboard)
