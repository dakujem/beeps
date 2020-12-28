import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Beep Stream',
    component: Home
  },
  {
    path: '/add',
    name: 'Add a Beep',
    component: Add
  },
  // {
  //   path: '/login',
  //   name: 'Log in',
  //   component: Login
  // },
  // {
  //   path: '/signup',
  //   name: 'Sign up',
  //   component: Signup
  // },
  // {
  //   path: '/accounts',
  //   name: 'Accounts',
  //   component: Accounts
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Add.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
