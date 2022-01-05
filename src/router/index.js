import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QnA from '../views/QnA.vue'
import Polls from '../views/Polls.vue'
import Event from '../views/Event'
import Login from '../views/Login'
import Register from '../views/Register'
import Logout from '../views/Logout'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
