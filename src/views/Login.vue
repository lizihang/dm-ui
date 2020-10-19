<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <!-- 功能暂放
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      -->
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        codeUrl: "",
        cookiePassword: "",
        loginForm: {
          username: '',
          password: '',
          code: '',
          uuid: ""
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        loginRules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: "验证码不能为空", trigger: "blur"}
          ]
        },
        loading: false,
        redirect: undefined,
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      // this.getCode();
      // this.getCookie();
    },
    methods: {
      getCode() {
        this.getCodeImg().then(res => {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        });
      },
      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const rememberMe = Cookies.get('rememberMe')
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password: password === undefined ? this.loginForm.password : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        };
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.loginForm.rememberMe) {
              Cookies.set("username", this.loginForm.username, {expires: 30});
              Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
              Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove('rememberMe');
            }
            this.$store
                .dispatch("Login", this.loginForm)
                .then(() => {
                  this.$router.push({path: this.redirect || "/"});
                })
                .catch(() => {
                  this.loading = false;
                  // this.getCode();
                });
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/login-background.jpg");
    background-size: cover;
  }

  .login-box {
    background: #ffffff;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 6px;
    box-shadow: 0 0 25px #909399;

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

  /*.login-box {*/
  /*  border: 1px solid #DCDFE6;*/
  /*  width: 350px;*/
  /*  margin: 180px auto;*/
  /*  padding: 35px 35px 15px 35px;*/
  /*  border-radius: 5px;*/
  /*  -webkit-border-radius: 5px;*/
  /*  -moz-border-radius: 5px;*/
  /*  box-shadow: 0 0 25px #909399;*/
  /*}*/

  .login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .login-code-img {
    height: 38px;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>