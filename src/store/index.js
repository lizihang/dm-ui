import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      nickname: '',
      status: '',
      email: '',
      createuser: '',
      createtime: '',
      modifyuser: '',
      modifytime: '',
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
        name: '基础资料',
        router: 'base',
        icon_class: 'el-icon-help',
        submenus: [
          {
            name: '',
            router: '',
            icon_class: ''
          }
        ]
      }
    ],
    activeIndex: '1',
  },
  mutations: {
    // 添加菜单
    add_menus(state, data) {
      this.state.menus = data;
    },
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
    set_user(state, data) {
      this.state.user = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("Authorization", data.token);
    },
    delete_user(state) {
      this.state.user = {}
      localStorage.removeItem("user")
      localStorage.removeItem("Authorization");
    }
  },
  getters: {},
  actions: {},
  modules: {}
})
