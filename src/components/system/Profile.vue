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
              <userAvatar :user="user"/>
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                用户名称
                <div class="pull-right">{{ user.username }}</div>
              </li>
              <li class="list-group-item">
                用户名称
                <div class="pull-right">{{ user.nickname }}</div>
              </li>
              <li class="list-group-item">
                用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                创建日期
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import userAvatar from "./userAvatar";

  export default {
    name: "Profile",
    components: { userAvatar},
    data() {
      return {
        user: {
          username: 'admin',
          nickname: '管理员',
          email: 'admin@dm.com',
          createTime: 'aa'
        }
      }
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