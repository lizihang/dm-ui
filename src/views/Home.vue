<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <dm-menu></dm-menu>
      </el-aside>
      <el-container>
        <el-header height="65px" style="padding: 0">
          <dm-header></dm-header>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-aside {
    background-color: #545c64;
    height: 100vh;
  }

  .el-header {
    background-color: #409EFF;
    color: #333;
    /*line-height: 30px;*/
    /*text-align: right;*/
    /*font-size: 16px*/
  }
</style>

<script>
  import DmMenu from "./frame/DmMenu";
  import DmHeader from "./frame/DmHeader";
  import DmMain from "./frame/DmMain";

  export default {
    name: "Home",
    components: {
      DmMenu,
      DmHeader,
      DmMain
    }
  };
</script>
