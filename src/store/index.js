import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      username: '',
      nickname: '',
      createdate: '',
      modifydate: '',
    },
    tabs: [
      {
        title: '首页',
        name: '1',
        closable: false,
        path: '/home/main'
      }
    ],
    menus: [
      {
        index: 'system',
        title: '系统管理',
        iclass: 'el-icon-location',
        submenus: [
          {
            subindex: '/system/user',
            subtitle: '用户管理'
          },
          {
            subindex: '/system/role',
            subtitle: '角色管理'
          },
          {
            subindex: '/system/menu',
            subtitle: '菜单管理'
          },
          {
            subindex: '/system/department',
            subtitle: '部门管理'
          }
        ]
      },
      {
        index: 'log',
        title: '日志管理',
        iclass: 'el-icon-document',
        submenus: [
          {
            subindex: '/log/login',
            subtitle: '登录日志'
          },
          {
            subindex: '/log/operate',
            subtitle: '操作日志'
          }
        ]
      }
    ],
    activeIndex: '1',
  },
  mutations: {
    // 添加tabs
    add_tabs(state, data) {
      let name = this.state.tabs.length + 1 + ''
      data['name'] = name
      this.state.tabs.push(data);
      this.state.activeIndex = name
    },
    // 删除tabs
    delete_tabs(state, name) {
      let index = 0;
      for (let tab of state.tabs) {
        if (tab.name === name) {
          break;
        }
        index++;
      }
      this.state.tabs.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      this.state.activeIndex = index;
    },
    set_is_login(state, isLogin) {
      this.state.isLogin = isLogin;
      sessionStorage.setItem("isLogin", isLogin);
    },
    set_user(state, user) {
      this.state.user = user;
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    delete_user(state){
      this.state.user = {}
      sessionStorage.removeItem("user")
    }
  },
  getters: {},
  actions: {},
  modules: {}
})
