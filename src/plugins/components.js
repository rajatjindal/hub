import Vue from 'vue'
import Clipboard from 'vue-clipboard2'
import Pagination from 'vuejs-uib-pagination'
import AButton from 'asyncy-ui-components/dist/AButton'
import AInput from 'asyncy-ui-components/dist/AInput'
import AppFooter from 'asyncy-ui-components/dist/AppFooter'
import AppHeader from 'asyncy-ui-components/dist/AppHeader'
import TwoColumnSidebar from '@/components/TwoColumnSidebar'
import UrlLink from '@/components/UrlLink'
import TopicTag from '@/components/TopicTag'
import TopicsList from '@/components/TopicsList'

Vue.component('two-column-sidebar', TwoColumnSidebar)
Vue.component('topic-tag', TopicTag)
Vue.component('url-link', UrlLink)
Vue.component('a-button', AButton)
Vue.component('a-input', AInput)
Vue.component('app-header', AppHeader)
Vue.component('app-footer', AppFooter)
Vue.component('topics-list', TopicsList)

Vue.use(Clipboard)
Vue.use(Pagination)
