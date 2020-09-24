<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/login">Login</router-link>
    </div>-->
    <!--<router-view/>-->
    <home></home>
  </div>
</template>

<style>
  app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import Home from "./views/Home";

  export default {
    components: {
      Home
    }
  };
</script>
