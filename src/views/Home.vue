<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <dm-menu></dm-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <dm-header></dm-header>
        </el-header>
        <el-main>
          <dm-main></dm-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-aside {
    background-color: #409EFF;
    height: 100vh;
  }

  .el-header {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }
</style>

<script>
  import DmMenu from "./frame/DmMenu";
  import DmHeader from "./frame/DmHeader";
  import DmMain from "./frame/DmMain";

  export default {
    components: {
      DmMenu,
      DmHeader,
      DmMain
    }
  };
</script>
