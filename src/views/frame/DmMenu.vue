<template>
  <div class="dm-menu">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :unique-opened=true
             router
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/home/main">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu v-for="menu in menus" :key="menu.router" :index="menu.router">
        <template slot="title">
          <i :class="menu.icon_class"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item v-for="sub in menu.subMenus" :key="sub.router" :index="sub.router">{{ sub.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {getMenus} from "@/api/user";

export default {
  name: "DmMenu",
  data() {
    return {}
  },
  computed: {
    menus: function () {
      return this.$store.state.menus
    }
  },
  methods: {},
  watch: {
    '$route': function (to) {
      console.log(to);
      //1.判断是否需要新增页面
      let flag = true
      let title = to.meta.title
      if (title === '首页') {
        flag = false;
      }
      for (let i = 0; i < this.$store.state.tabs.length; i++) {
        if (title === this.$store.state.tabs[i].title) {
          //设置为当前活跃tab
          this.$store.commit('set_active_index', this.$store.state.tabs[i].name);
          return false;
        }
      }
      //2.新增页面
      if (flag) {
        //动态双向追加tabs
        const tabData = {
          title: title,
          closable: true,
          path: to.path
        }
        this.$store.commit('add_tabs', tabData)
      }
    }
  },
  created() {
    getMenus().then(res => {
      let menus = res.data.data
      this.$store.commit('add_menus', menus);
    })
  }
}
</script>

<style scoped>

</style>