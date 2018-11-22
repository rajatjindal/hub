import Vue from 'vue'
import Chart from 'vue2-frappe'
// import Trend from 'vuetrend'
import { Cartesian, Area, Line } from 'laue'

Vue.use(Chart)
// Vue.use(Trend)
Vue.component('la-cartesian', Cartesian)
Vue.component('la-area', Area)
Vue.component('la-line', Line)
