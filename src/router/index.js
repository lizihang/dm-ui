import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载模式
// const home = () => import('../views/Home')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: {title: '登录'}
  },
  {
    path: '/404',
    component: () => import('../views/error/404'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    meta: {title: '首页'},
    children: [
      {
        path: '/',
        redirect: 'main'
      },
      {
        path: 'main',
        component: () => import('../views/frame/DmMain.vue'),
        meta: {title: '首页', requireAuth: true},
      }
    ]
  },
  {
    path: '/system',
    component: () => import('../views/Home.vue'),
    meta: {title: '系统管理'},
    children: [
      {
        path: 'user',
        component: () => import('../components/system/User'),
        meta: {title: '用户管理', requireAuth: true},
      },
      {
        path: 'role',
        component: () => import('../components/system/Role'),
        meta: {title: '角色管理', requireAuth: true},
      }
    ]
  },
  {
    path: '/log',
    component: () => import('../views/Home.vue'),
    meta: {title: '日志管理'},
    children: [
      {
        path: 'login',
        component: () => import('../components/log/LoginLog'),
        meta: {title: '登录日志', requireAuth: true},
      },
      {
        path: 'operate',
        component: () => import('../components/log/OperateLog'),
        meta: {title: '操作日志', requireAuth: true},
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫，登录
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("isLogin") === 'true'
  if (to.path === "/login") {
    if (isLogin) {
      next("/home/main");
    } else {
      next();
    }
  } else {
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if (to.meta.requireAuth && isLogin) {
      next();
    } else {
      next("/login");
    }
  }
})

// 解决用了keep-alive标签后，在home组件中activated()方法里this.$router.push(this.path)报错问题
// 解决同一个router点击多次报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
