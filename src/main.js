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
  uniPlus,
  uniComments,
  uniLightbulbAlt,
  uniPen,
  uniShare,
  uniShareAlt,
  uniEllipsisV,
  uniEllipsisH,
  uniTimes,
  uniGoogle,
  uniSetting
} from 'vue-unicons/dist/icons'
import VueScrollTo from 'vue-scrollto'
import VueMeta from 'vue-meta'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '969331023358-h9klfqv0tdpbi6cjrof87i9u72sld7r6.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

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
  uniPlus,
  uniComments,
  uniLightbulbAlt,
  uniPen,
  uniShare,
  uniShareAlt,
  uniEllipsisV,
  uniEllipsisH,
  uniTimes,
  uniGoogle,
  uniSetting
])
Vue.use(Unicon)
Vue.use(VueScrollTo)
Vue.use(VueMeta)
Vue.use(GAuth, gauthOption)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
