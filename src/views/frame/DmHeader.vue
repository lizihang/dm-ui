<template>
  <div class="dm-header">
    <div class="header-top">
      <el-dropdown>
        <i class="el-icon-setting" style="font-size: 25px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar :src="src" style="margin: 4px 10px" size="small"></el-avatar>
      <span style="margin-right: 10px">{{username}}</span>
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
  export default {
    name: "DmHeader",
    data() {
      return {
        username: '翔宝大毛团',
        src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        editableTabsValue: '1'
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
      }
    },
    methods: {
      tabRemove(targetName) {
        this.$store.commit('delete_tabs', targetName);
        // 如果激活的关闭的tab就是激活的tab
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          this.$store.commit('set_active_index', '1');
          this.$router.push({path: '/main'});
        }
      },
      tabClick(targetName) {
        const selectId = targetName.paneName;
        console.log(selectId);
        let val = this.$store.state.tabs.filter(item => selectId === item.name)
        this.$router.push({
          path: val[0].path
        })
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