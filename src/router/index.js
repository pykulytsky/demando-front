import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QnA from '../views/QnA.vue'
import Polls from '../views/Polls.vue'
import Poll from '../views/Poll.vue'
import Event from '../views/Event.vue'
import Quiz from '../views/Quiz.vue'
import Profile from '../views/Profile.vue'
import Quizzes from '../views/Quizzes.vue'
import QuizConstructor from '../views/QuizConstructor.vue'
import NotFound from '../views/NotFound.vue'
import CriticalError from '../views/CriticalError.vue'
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
    path: '/polls/:pk',
    name: 'Poll',
    component: Poll
  },
  {
    path: '/quizzes',
    name: "Quizzes",
    component: Quizzes,
  },
  {
    path: "/quizzes/constructor",
    component: QuizConstructor,
    name: "Constructor"
  },
  {
    path: "/quizzes/quiz/:quizId",
    component: Quiz,
    name: "Quiz"
  },
  {
    path: "/profile",
    component: Profile,
    name: "Profile"
  },
  {
    path: "/505",
    component: CriticalError,
    name: "CriticalError"
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
