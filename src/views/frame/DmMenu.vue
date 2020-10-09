<template>
  <div class="dm-menu">
    <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened=true
             router
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu v-for="menu in menus" :key="menu.index" :index="menu.index">
        <template slot="title">
          <i :class="menu.iclass"></i>
          <span>{{menu.title}}</span>
        </template>
        <el-menu-item v-for="sub in menu.submenus" :key="sub.subindex" :index="sub.subindex">{{sub.subtitle}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "DmMenu",
    data() {
      return {
        menus: [
          {
            index: '1',
            title: '导航一',
            iclass: 'el-icon-location',
            submenus: [
              {
                subindex: 'table',
                subtitle: '表格'
              },
              {
                subindex: 'tab2',
                subtitle: 'tab2'
              }
            ]
          }, {
            index: '2',
            title: '导航二',
            iclass: 'el-icon-document',
            submenus: [
              {
                subindex: '2-1',
                subtitle: '2-1'
              }
            ]
          }
        ]
      }
    },
    watch: {
      '$route': function (to) {
        console.log(to);
        //1.判断是否需要新增页面
        let flag = true
        let name = to.name
        if (name === 'main') {
          flag = false;
        }
        for (let i = 0; i < this.$store.state.tabs.length; i++) {
          if (name === this.$store.state.tabs[i].title) {
            //设置为当前活跃tab
            this.$store.commit('set_active_index', this.$store.state.tabs[i].name);
            return false;
          }
        }
        //2.新增页面
        if (flag) {
          //获得路由元数据的name和组件名
          const thisName = to.name
          //动态双向追加tabs
          const tabData = {
            title: thisName,
            closable: true
          }
          console.log(tabData)
          this.$store.commit('add_tabs', tabData)
        }
      }
    }
  }
</script>

<style scoped>

</style>