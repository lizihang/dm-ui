import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabs: [
      {
        title: '首页',
        name: '1',
        closable: false,
        path: '/main'
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
      console.log(name)
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
    }
  },
  actions: {},
  modules: {}
})
