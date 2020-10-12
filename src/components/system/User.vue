<template>
  <div class="dm-main">
    <el-button type="primary" @click="show = !show">新增用户</el-button>
    <el-button type="primary" @click="dialogFormVisible = true">新增用户弹窗</el-button>
    <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="birth" label="生日" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别" width="180"></el-table-column>
      <el-table-column prop="addr" label="地址"></el-table-column>
    </el-table>
    <div style="margin-top: 20px; height: 200px;">
      <el-collapse-transition>
        <div v-show="show">
          <div class="transition-box">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birth"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="地址">
                <el-input type="textarea" v-model="form.addr"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">新增</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "User",
    data() {
      return {
        tableData: [],
        show: false,
        dialogFormVisible: false,
        form: {
          name: '',
          birth: '',
          gender: '男',
          addr: ''
        }
      }
    },
    methods: {
      onSubmit() {
        //1 发送请求
        axios({
          url: 'http://127.0.0.1:8081/user/save',
          method: 'post',
          data: this.form
        }).then(res => {
          console.log(res.data);
          if (res.data.status) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            // 清空表单信息
            this.form = {gender: '男'};
            // 隐藏表单
            this.dialogFormVisible = false;
            // 刷新数据
            this.findAll()
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      findAll() {
        axios({
          url: 'http://127.0.0.1:8081/user/findAll'
        }).then(res => {
          this.tableData = res.data
        })
      }
    },
    created() {
      this.findAll()
    }
  }
</script>

<style scoped>
  .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 450px;
    border-radius: 4px;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>