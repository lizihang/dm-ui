import Vue from 'vue'
import VueRouter from 'vue-router'
import {checkToken} from "@/api";

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
      },
      {
        path: 'department',
        component: () => import('../components/system/Department'),
        meta: {title: '部门管理', requireAuth: true},
      },
      {
        path: 'menu',
        component: () => import('../components/system/MenuConfig'),
        meta: {title: '菜单管理', requireAuth: true}
      },
      {
        path: 'profile',
        component: () => import('../components/system/Profile'),
        meta: {title: '个人信息', requireAuth: true}
      },
      {
        path: 'dict',
        component: () => import('../components/system/DictConfig'),
        meta: {title: '字典管理', requireAuth: true}
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
  let hasToken = localStorage.getItem("Authorization") != null
  console.log("to.path=" + to.path + ";hasToken=" + hasToken)
  // 1.当跳转到login界面时，判断token是否过期，没过期则跳转到主页，过期则重新登录
  if (to.path === "/login") {
    if (hasToken) {
      checkToken().then(res => {
        if (res.data.status === 200) {
          next("/home/main");
        }
      })
    } else {
      next();
    }
  }
  // 2.当跳转到个人信息界面时，如果token没过期，则跳转，过期则重新登录
  else if (to.path === "/system/profile") {
    if (hasToken) {
      checkToken().then(res => {
        if (res.data.status === 200) {
          next();
        }
      })
    } else {
      next("/login");
    }
  }
  // 跳转到其他页面
  else {
    if (hasToken) {
      checkToken().then(res => {
        if (res.data.status === 200) {
          if (JSON.parse(localStorage.getItem("user")).status === 0) {
            next("/system/profile");
          } else {
            next();
          }
        }
      }).catch(err => {
      })
    } else {
      next("/login");
    }
  }
})

/*
router.beforeEach((to, from, next) => {
  let hasToken = localStorage.getItem("Authorization") != null
  console.log("to.path=" + to.path + ";hasToken=" + hasToken)
  // 1.当跳转到login界面时，判断是否有token，有则认为已经登录，跳转到主页
  if (to.path === "/login") {
    if (hasToken) {
      next("/home/main");
    } else {
      next();
    }
  } else { // 2.跳转到其他页面时，判断用户状态是否为0，为0则先跳转到个人信息界面，完善个人信息
    // to.path == "/system/profile"不需要
    if (to.path !== "/system/profile" && hasToken && JSON.parse(localStorage.getItem("user")).status === 0) {
      alert("用户状态为：新建，请先完善个人信息");
      next("/system/profile");
    } else {
      // requireAuth:可以在路由元信息指定哪些页面需要登录权限
      // 其他情况则需要判断是否有token，没有则转到登录页面
      if (to.meta.requireAuth && hasToken) {
        next();
      } else {
        next("/login");
      }
    }
  }
})
*/

// 解决用了keep-alive标签后，在home组件中activated()方法里this.$router.push(this.path)报错问题
// 解决同一个router点击多次报错问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
