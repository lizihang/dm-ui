<template>
  <div class="dm-header">
    <div class="header-top">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px;font-size: 25px"></i>
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
      aaa
    </div>
  </div>
</template>

<script>
  export default {
    name: "DmHeader",
    data() {
      return {
        username: '翔宝大毛团',
        src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
    }
  }
</script>

<style scoped>
  .header-top {
    height: 36px;
    width: 100%;
    border-bottom: 1px solid black;
    text-align: right;
    font-size: 16px;
  }

  .header-bottom {
    height: 29px;
    width: 100%;
  }
</style>