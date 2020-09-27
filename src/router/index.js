import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/main'
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/frame/DmMain')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../components/TestTable')
  },
  {
    path: '/tab2',
    name: 'tab2',
    component: () => import('../components/Tab2')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
