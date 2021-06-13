<template>
  <div>
    <el-form :inline="true" :model="param" class="demo-form-inline" size="mini">
      <el-form-item label="角色名称">
        <el-input v-model="param.roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="" size="mini">新增</el-button>
      <el-button type="success" @click="" size="mini">修改</el-button>
      <el-button type="danger" @click="" size="mini">删除</el-button>
    </el-row>
    <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px" :highlight-current-row="true" :height="550">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
      <el-table-column prop="roleCode" label="角色编码" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180"></el-table-column>
      <el-table-column prop="createUser" label="创建人" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="modifyUser" label="修改人"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
    </el-table>
    <el-pagination
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :total="total"
      :current-page="param.pageNum"
      :page-size="param.pageSize"
      :page-sizes="[1, 5, 10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import {queryRoles} from "@/api/role";

export default {
  name: "Role",
  data() {
    return {
      // 分页数据
      total: 0,
      // 查询条件
      param: {
        roleName: '',
        pageNum: 1,
        pageSize: 10,
      },
      // 列表数据
      tableData: []
    }
  },
  methods: {
    findAll() {
      queryRoles(this.param).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    handleSizeChange(val) {
      this.param.pageSize = val;
      this.findAll();
    },
    handleCurrentChange(val) {
      this.param.pageNum = val;
      this.findAll();
    },
    onSubmit() {
      this.findAll();
    },
    onReset() {
      this.param = {
        pageNum: 1,
        pageSize: 10
      };
      this.findAll();
    },
    openUpdateDialog(index, row) {
      this.updateFormVisible = true;
      this.updateForm = row;
    },
    updateUser() {
      console.log(this.updateForm);
      //1 发送请求
      updateUser(this.updateForm).then(res => {
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
      deleteUser(row.id).then(res => {
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

</style>