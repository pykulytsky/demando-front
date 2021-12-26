import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'

import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import {uniAlignJustify, uniMoon, uniBrightness} from 'vue-unicons/dist/icons'

Vue.config.productionTip = process.env.VUE_APP_DEBUG
Vue.use(Vuesax)

Unicon.add([
  uniAlignJustify,
  uniMoon,
  uniBrightness
])
Vue.use(Unicon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
