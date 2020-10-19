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
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" type="text" auto-complete="off" placeholder="验证码" style="width: 63%">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" @error="showDefaultImg"/>
        </div>
      </el-form-item>
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
  import {getCodeImg} from "@/api/login";
  import {login} from "@/api/login";

  export default {
    name: "Login",
    data() {
      return {
        // 验证码图片base64
        codeUrl: '',
        // 验证码
        validCode: '',
        // 登录表单
        loginForm: {
          username: '',
          password: '',
          code: ''
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
      }
    },
    created() {
      this.getCode();
    },
    methods: {
      getCode() {
        getCodeImg().then(res => {
          console.log(res.data.data);
          this.validCode = res.data.data.validCode
          this.codeUrl = "data:image/gif;base64," + res.data.data.validStr
        });
      },
      showDefaultImg() {
        this.codeUrl = require('@/assets/image/timg.jpg');
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            console.log(this.loginForm);
            this.loading = true;
            login(this.loginForm).then(res => {
              console.log(res.data);
              if (res.data.status) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                location.href = '/home/main'
              } else {
                this.loading = false;
                this.$message.error(res.data.msg);
              }
            })

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
    height: 100vh;
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
    margin: 0 auto 20px auto;
    color: #303133;
  }
</style>