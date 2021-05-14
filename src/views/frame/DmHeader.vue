<template>
  <div class="dm-header">
    <div class="header-top">
      <el-dropdown trigger="click" @command="handleCommand">
        <div>
          <el-avatar :src="src" style="margin: 4px 10px" size="small"></el-avatar>
          <span>{{ getNickName }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人资料</el-dropdown-item>
          <el-dropdown-item command="changePWD">修改密码</el-dropdown-item>
          <el-dropdown-item command="handleLogout">退出登录</el-dropdown-item>
          <!--调用方法的两种方式-->
          <!--<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="header-bottom">
      <el-tabs v-model="activeIndex" type="card" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in $store.state.tabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="item.closable">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {logout} from "@/api/login";

export default {
  name: "DmHeader",
  data() {
    return {
      src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    }
  },
  computed: {
    tabs() {
      return this.$store.state.tabs;
    },
    //动态设置及获取当前激活的tab页
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit('set_active_index', val);
      }
    },
    getNickName() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      return user.nickname;
    }
  },
  methods: {
    tabRemove(targetName) {
      this.$store.commit('delete_tabs', targetName);
      // 如果激活的关闭的tab就是激活的tab
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        this.$store.commit('set_active_index', '1');
        this.$router.push({path: '/home'});
      }
    },
    tabClick(targetName) {
      const selectId = targetName.paneName;
      let val = this.$store.state.tabs.filter(item => selectId === item.name)
      this.$router.push({
        path: val[0].path
      })
    },
    // 1.下拉菜单直接绑定@click.native="logout"，可以直接调用此方法
    // 2.下拉菜单也可以用command方式，直接在handleCommand方法中处理
    handleLogout() {
      this.$confirm('确定退出系统吗？', '退出系统', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then(res => {
          if (res.data.status === 200) {
            this.$store.commit("set_is_login", false)
            this.$store.commit("delete_user")
            this.$router.replace('/login')
            this.$message({
              type: 'success',
              message: '退出登录!'
            });
          }
        })
      }).catch(() => {
      });
    },
    handleCommand(command) {
      console.log(command);
      if (command === 'profile') {
        // TODO
      }
      if (command === 'changePWD') {
        // TODO
      }
      if (command === 'handleLogout') {
        this.handleLogout()
      }
    }
  }
}
</script>

<!--style中有scoped时，.is-active的属性不管用-->
<!--<style scoped>-->
<style>
.header-top {
  height: 36px;
  width: 100%;
  border-bottom: 1px solid black;
  text-align: right;
  font-size: 16px;
  background-color: #409EFF;
  display: inline-table;
}

.header-bottom {
  height: 29px;
  width: 100%;
}

.el-tabs__item {
  height: 29px !important;
  line-height: 29px !important;
}
</style>