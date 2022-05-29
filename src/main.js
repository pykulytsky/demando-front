import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";

import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
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
  uniSetting,
  uniClockFive,
  uniArrowDown,
  uniEstate,
  uniQuestion,
  uniCommentQuestion,
  uniSearch,
  uniCommentChartLine,
  uniDialpadAlt,
  uniVolume,
  uniVolumeMute,
  uniAngleDown,
  uniAngleUp
} from "vue-unicons/dist/icons";
import VueScrollTo from "vue-scrollto";
import VueMeta from "vue-meta";
import GAuth from "vue-google-oauth2";
import VueNumber from 'vue-number-animation'
import responsive from 'vue-responsive'
import { MotionPlugin } from '@vueuse/motion'
import checkView from 'vue-check-view'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueSelectImage from 'vue-select-image'
import VueMq from 'vue-mq'


const gauthOption = {
  clientId:
    "969331023358-h9klfqv0tdpbi6cjrof87i9u72sld7r6.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};

Vue.config.productionTip = process.env.VUE_APP_DEBUG;

Vue.use(Vuesax, {
  colors: {
    primary: "#0ec4a6",
    success: "rgb(23, 201, 100)",
    danger: "rgb(242, 19, 93)",
    warning: "rgb(255, 130, 0)",
    dark: "rgb(36, 33, 69)",
  },
});

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
  uniSetting,
  uniClockFive,
  uniArrowDown,
  uniEstate,
  uniQuestion,
  uniCommentQuestion,
  uniSearch,
  uniCommentChartLine,
  uniDialpadAlt,
  uniVolume,
  uniVolumeMute,
  uniAngleDown,
  uniAngleUp
]);
Vue.use(Unicon, {
  fill: "#0ec4a6"
});
Vue.use(VueScrollTo);
Vue.use(VueMeta);
Vue.use(GAuth, gauthOption);
Vue.use(VueNumber);
Vue.use(responsive)
Vue.use(MotionPlugin)
Vue.use(checkView)
Vue.use(Datetime)
Vue.use(VueSelectImage)
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

require('vue-select-image/dist/vue-select-image.css')

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
