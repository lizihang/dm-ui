import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决同一个router点击多次报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
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
