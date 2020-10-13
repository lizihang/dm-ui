<template>
  <div class="dm-main">
    <el-button type="primary" @click="addFormVisible = true">新增</el-button>
    <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px">
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="openUpdateDialog(scope.$index,scope.row)"></el-button>
            <el-popconfirm title="确定删除该用户吗？" @onConfirm="deleteUser(scope.$index,scope.row)">
              <el-button type="primary" icon="el-icon-delete" size="mini" slot="reference"></el-button>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="birth" label="生日" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别" width="180"></el-table-column>
      <el-table-column prop="addr" label="地址"></el-table-column>
    </el-table>
    <!--新增form-->
    <el-dialog title="新增" :visible.sync="addFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
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
        <el-button type="primary" @click="addUser">确 定</el-button>
        <el-button @click="addFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--更新form-->
    <el-dialog title="修改" :visible.sync="updateFormVisible">
      <el-form ref="form" :model="updateForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="updateForm.birth" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="updateForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="updateForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateUser">确 定</el-button>
        <el-button @click="updateFormVisible = false">取 消</el-button>
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
        addFormVisible: false,
        updateFormVisible: false,
        form: {
          name: '',
          birth: '',
          gender: '男',
          addr: ''
        },
        updateForm: {}
      }
    },
    methods: {
      findAll() {
        axios({
          url: 'http://127.0.0.1:8081/user/findAll'
        }).then(res => {
          this.tableData = res.data
        })
      },
      addUser() {
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
            this.addFormVisible = false;
            // 刷新数据
            this.findAll()
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      openUpdateDialog(index, row) {
        this.updateFormVisible = true;
        this.updateForm = row;
      },
      updateUser() {
        console.log(this.updateForm);
        //1 发送请求
        axios({
          url: 'http://127.0.0.1:8081/user/update',
          method: 'post',
          data: this.updateForm
        }).then(res => {
          console.log(res.data);
          if (res.data.status) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            // 隐藏表单
            this.updateFormVisible = false;
            // 刷新数据
            this.findAll()
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      deleteUser(index, row) {
        axios({
          method: 'delete',
          url: 'http://127.0.0.1:8081/user/deleteById',
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.data.status) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            // 刷新数据
            this.findAll()
          } else {
            this.$message.error(res.data.msg);
          }
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