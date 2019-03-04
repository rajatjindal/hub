import Vue from 'vue'
import AsyncyVue from '@asyncy/vue'
import Clipboard from 'vue-clipboard2'
import UrlLink from '@/components/UrlLink'
import TopicTag from '@/components/TopicTag'
import Window from '@/components/Window'

Vue.use(AsyncyVue)
Vue.use(Clipboard)

Vue.component('topic-tag', TopicTag)
Vue.component('url-link', UrlLink)
Vue.component('a-window', Window)
