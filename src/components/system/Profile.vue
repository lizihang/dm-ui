<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <user-avatar/>
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                用户名称
                <div class="pull-right">{{ user.username }}</div>
              </li>
              <li class="list-group-item">
                用户昵称
                <div class="pull-right">{{ user.nickname }}</div>
              </li>
              <li class="list-group-item">
                用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                手机号
                <div class="pull-right">{{ user.phone }}</div>
              </li>
              <li class="list-group-item">
                创建日期
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card class="box-card">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="user-info">
              <user-info :user="user" @updateInfo="queryUserInfo"/>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="reset-password">修改密码</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserAvatar from "@/components/system/UserAvatar";
import UserInfo from "@/components/system/UserInfo";
import {queryUserInfo} from "@/api/user";

export default {
  name: "Profile",
  components: {
    UserAvatar,
    UserInfo
  },
  data() {
    return {
      user: {},
      activeTab: 'user-info',
    }
  },
  methods: {
    queryUserInfo() {
      queryUserInfo().then(res => {
        if (res.data.status === 200) {
          this.user = res.data.data;
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created() {
    this.queryUserInfo()
  }
}
</script>

<style>
.text-center {
  text-align: center
}

.pull-right {
  float: right !important;
}

.list-group-striped > .list-group-item {
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
}

.list-group {
  padding-left: 0px;
  list-style: none;
}

.list-group-item {
  border-bottom: 1px solid #e7eaec;
  border-top: 1px solid #e7eaec;
  margin-bottom: -1px;
  padding: 11px 0px;
  font-size: 13px;
}
</style>