import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
  // strict: true,
  // 生产环境应该关闭，有性能损失
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      username: '',
      nickname: '',
      email: '',
      phone: '',
      gender: '',
      // avatar: "http://localhost:8081/image/avatar/admin/profile.jpg",
      avatar: '',
      status: '',
      createUser: '',
      createTime: '',
      modifyUser: '',
      modifyTime: '',
    },
    defaultTabs: [
      {
        title: '首页',
        name: '1',
        closable: false,
        path: '/home/main'
      }
    ],
    tabs: [],
    menus: [],
    activeIndex: '1',
  },
  mutations: {
    // 添加菜单
    add_menus(state, data) {
      state.menus = data;
    },
    // 添加tabs
    add_tabs(state, data) {
      let name = state.tabs.length + 1 + ''
      data['name'] = name
      state.tabs.push(data);
      state.activeIndex = name
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
      state.tabs.splice(index, 1);
    },
    // 清空tabs
    clean_tabs(state) {
      state.tabs = Object.assign([], state.defaultTabs)
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      state.activeIndex = index;
    },
    // 设置登录信息
    set_login_info(state, data) {
      // 1.设置user
      let user = data.user;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      // 2.设置token
      let token = data.token;
      localStorage.setItem("Authorization", token);
    },
    set_user(state) {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    delete_user(state) {
      state.user = {}
      localStorage.removeItem("user")
      localStorage.removeItem("Authorization");
    }
  },
  getters,
  actions: {},
  modules: {}
})
