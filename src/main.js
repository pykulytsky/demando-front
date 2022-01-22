import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'

import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import {
  uniAlignJustify,
  uniMoon,
  uniBrightness,
  uniAngleDoubleRight,
  uniArrowRight,
  uniExclamationTriangle,
  uniUser,
  uniLock,
  uniMailbox,
  uniEye,
  uniEyeSlash,
  uniSignOutAlt,
  uniThumbsUp,
  uniThumbsDown,
  uniCalendarAlt,
  uniSchedule,
  uniCalender,
  uniPlus
} from 'vue-unicons/dist/icons'
import VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = process.env.VUE_APP_DEBUG
Vue.use(Vuesax)

Unicon.add([
  uniAlignJustify,
  uniMoon,
  uniBrightness,
  uniAngleDoubleRight,
  uniArrowRight,
  uniExclamationTriangle,
  uniUser,
  uniLock,
  uniMailbox,
  uniEye,
  uniEyeSlash,
  uniThumbsUp,
  uniThumbsDown,
  uniCalendarAlt,
  uniSchedule,
  uniCalender,
  uniSignOutAlt,
  uniPlus
])
Vue.use(Unicon)
Vue.use(VueScrollTo)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
