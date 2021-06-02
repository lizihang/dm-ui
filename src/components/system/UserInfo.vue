<template>
  <el-form ref="form" :model="userinfo" :rules="rules" label-width="80px">
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="userinfo.nickname"/>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userinfo.email" maxlength="50"/>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="userinfo.phone" maxlength="50"/>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="userinfo.gender">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {updateUser} from "@/api/user";

export default {
  name: "UserInfo",
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      userinfo: {},
      // 表单校验
      rules: {
        nickname: [
          {required: true, message: "用户昵称不能为空", trigger: "blur"}
        ],
        email: [
          {required: true, message: "邮箱地址不能为空", trigger: "blur"},
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    user: {
      handler(val) {
        this.userinfo = Object.assign({}, val)
      }
    }
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUser(this.userinfo).then(res => {
            if (res.data.status === 200) {
              this.$emit("updateInfo")
              this.$message.success(res.data.msg)
            }
          });
        }
      });
    },
    reset() {
      this.userinfo = Object.assign({}, this.user)
    }
  }
}
</script>

<style>

</style>