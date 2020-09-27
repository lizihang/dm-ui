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
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
        <el-tab-pane label="首页" name="1" :key="0" :closable="false"></el-tab-pane>
        <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="index+1"
                :label="item.title"
                :name="item.name">
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
        editableTabsValue: '1',
        editableTabs: [{
          title: 'Tab 1',
          name: '2',
        }, {
          title: 'Tab 2',
          name: '3',
        }],
      }
    },
    methods: {
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      clickTab(targetName) {
        const selectId = targetName.paneName;
        console.log(selectId);

        if (selectId == 1) {
          this.$router.push("/main")
        } else if (selectId == 2) {
          this.$router.push("/table")
        } else if (selectId == 3) {
          this.$router.push("/tab2")
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