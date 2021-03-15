<template>
  <div class="index">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>DM管理系统</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="changeForm">{{buttonTitle}}</el-button>
        <el-button style="float: right; padding: 3px 50px" type="text" @click="changeLang">中英切换</el-button>
      </div>
      <login-form v-if="isLoginCard"></login-form>
      <register-form v-else></register-form>
    </el-card>
  </div>
</template>

<script>
  import LoginForm from "@/components/login/LoginForm";
  import RegisterForm from "@/components/login/RegisterForm";

  export default {
    name: "Login",
    data() {
      return {
        isLoginCard: true,
        buttonTitle: '注册'
      }
    },
    methods: {
      changeForm() {
        this.isLoginCard = !this.isLoginCard;
        this.buttonTitle = this.buttonTitle === '注册' ? '登录' : '注册'
      },
      changeLang() {
        if (this.$i18n.locale === "en") {
          this.$i18n.locale = 'zh';
        } else if (this.$i18n.locale === 'zh') {
          this.$i18n.locale = 'en';
        }
      }
    },
    components: {
      LoginForm,
      RegisterForm
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .index {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../assets/image/login-background.jpg");
    background-size: cover;
  }

  .form-box {
    background: #ffffff;
    width: 350px;
    margin: auto;
    padding: 5px 35px 5px 35px;
    border-radius: 6px;

    .el-input {
      height: 38px;

      input {
        height: 38px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  .valid-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .valid-code-img {
    height: 38px;
  }

  .form-title {
    text-align: center;
    margin: 0 auto 20px auto;
    color: #303133;
  }
</style>