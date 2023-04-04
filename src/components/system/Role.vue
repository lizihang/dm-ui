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
      <el-button type="primary" @click="openInsertDialog" size="mini">新增</el-button>
      <el-button type="success" @click="openUpdateDialog" size="mini">修改</el-button>
      <el-button type="danger" @click="deleteRole" size="mini">删除</el-button>
    </el-row>
    <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px" :highlight-current-row="true" @current-change="handleRowChange" :height="550">
      <!--<el-table-column type="selection" width="50"></el-table-column>-->
      <el-table-column label="" width="35" fixed="left">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model="radioId">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
      <el-table-column prop="roleCode" label="角色编码" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="80"></el-table-column>
      <el-table-column prop="createUser" label="创建人" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="modifyUser" label="修改人" width="120"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="180"></el-table-column>
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
    <!--新增form-->
    <el-dialog title="新增" :visible.sync="insertFormVisible">
      <el-form ref="form" :model="insertForm" label-width="80px">
        <el-form-item label="角色编码">
          <el-input v-model="insertForm.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="insertForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRole">确 定</el-button>
        <el-button @click="cancelAdd">取 消</el-button>
      </div>
    </el-dialog>
    <!--更新form-->
    <el-dialog title="修改" :visible.sync="updateFormVisible">
      <el-form ref="form" :model="updateForm" label-width="80px">
        <el-form-item label="角色编码">
          <el-input v-model="updateForm.roleCode" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="updateForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateRole">确 定</el-button>
        <el-button @click="cancelUpdate">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {queryRoles, addRole, updateRole, deleteRole} from "@/api/user";

export default {
  name: "Role",
  data() {
    return {
      radioId: '',
      // 分页数据
      total: 0,
      // 查询条件
      param: {
        roleName: '',
        pageNum: 1,
        pageSize: 10,
      },
      // 列表数据
      tableData: [],
      // 当前选中行的数据
      currentRow: {},
      // 新增dialog标记
      insertFormVisible: false,
      insertForm: {},
      // 更新dialog标记
      updateFormVisible: false,
      updateForm: {}
    }
  },
  methods: {
    findAll() {
      queryRoles(this.param).then(res => {
        this.tableData = res.data.data.records
        this.total = res.data.data.total
        // 处理单选radio
        if (this.tableData) {
          this.currentRow = res.data.data.records[0]
          this.radioId = this.currentRow.id
        }
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
    openInsertDialog() {
      this.insertFormVisible = true;
      this.insertForm = {};
    },
    openUpdateDialog() {
      this.updateFormVisible = true;
      this.updateForm = this.currentRow;
    },
    addRole() {
      console.log(this.insertForm);
      //1 发送请求
      addRole(this.insertForm).then(res => {
        console.log(res.data);
        if (res.data.status) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          // 隐藏表单
          this.insertFormVisible = false;
          // 刷新数据
          this.findAll()
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    cancelAdd() {
      this.insertFormVisible = false;
      this.insertForm = {};
    },
    updateRole() {
      console.log(this.updateForm);
      //1 发送请求
      updateRole(this.updateForm).then(res => {
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
    cancelUpdate() {
      this.updateFormVisible = false;
    },
    deleteRole() {
      deleteRole(this.currentRow.id).then(res => {
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
    },
    // 处理table行改变
    handleRowChange(val) {
      // 切换分页的时候，val为空，所以判断一下
      if (val == null) {
        this.currentRow = this.tableData[0];
        this.radioId = this.currentRow.id;
      } else {
        this.currentRow = val;
        this.radioId = val.id;
      }
    }
  },
  created() {
    this.findAll()
  }
}
</script>

<style scoped>

</style>