import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QnA from '../views/QnA.vue'
import Polls from '../views/Polls.vue'
import Poll from '../views/Poll.vue'
import Event from '../views/Event.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Logout from '../views/auth/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/qa',
    name: 'Q&A',
    component: QnA
  },
  {
    path: '/qa/events/:pk',
    name: 'Event detailed',
    component: Event
  },
  {
    path: '/polls',
    name: 'Polls',
    component: Polls
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/poll/:pk',
    name: 'Poll',
    component: Poll
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
