// if you need a new icon, import it from free-solid-svg-icons
// add it in the library add method
// call it with <font-awesome-icon icon="coffee" size="3x" />
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faCodeBranch, faPlus, faPlay, faArrowRight, faFileSignature, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faDocker } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faCodeBranch, faPlus, faPlay, faDocker, faArrowRight, faFileSignature, faChevronRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)
