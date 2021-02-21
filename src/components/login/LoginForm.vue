<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="form-box">
      <h3 class="form-title">欢迎登录</h3>
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
        <div class="valid-code">
          <img :src="codeUrl" @click="getCode" class="valid-code-img" @error="showDefaultImg"/>
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
  import {getCodeImg, login} from "@/api/login";

  export default {
    name: "LoginForm",
    data() {
      const validateCode = (rule, value, callback) => {
        if (value !== this.validCode) {
          callback(new Error('验证码输入错误'));
        } else {
          callback();
        }
      };
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
            {required: true, message: "验证码不能为空", trigger: "blur"},
            {validator: validateCode, trigger: "blur"},
          ]
        },
        loading: false,
      }
    },
    methods: {
      // 获取验证码
      getCode() {
        getCodeImg().then(res => {
          this.validCode = res.data.data.validCode
          console.log(this.validCode);
          this.codeUrl = "data:image/gif;base64," + res.data.data.validStr
        });
      },
      // 验证码获取失败时，默认显示图片
      showDefaultImg() {
        this.codeUrl = require('@/assets/image/timg.jpg')
      },
      // 用户登录
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 验证通过
            // console.log(this.loginForm)
            this.loading = true;
            login(this.loginForm).then(res => {
              // 控制台打印信息
              console.log(res.data);
              if (res.data.status===200) {
                // 登录成功，将user存到store中
                this.$store.commit("set_is_login", true);
                this.$store.commit("set_user", res.data.data);
                // 跳转页面
                this.$router.replace('/home/main')
                // location.href = '/home/main'
              } else {
                // 登录失败，弹出错误消息
                this.$message.error(res.data.msg);
                // 刷新验证码
                this.getCode()
              }
              this.loading = false;
            })
          }
        });
      }
    },
    created() {
      this.getCode();
    }
  }
</script>

<style>

</style>