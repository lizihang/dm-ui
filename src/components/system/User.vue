<template>
  <div class="dm-main">
    <el-form :inline="true" :model="param" class="demo-form-inline" size="mini">
      <el-form-item label="姓名">
        <el-input v-model="param.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="param.nickname"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="param.status" placeholder="">
          <el-option
            v-for="state in dict_user_status"
            :key="state.dictKey"
            :label="state.dictValue"
            :value="state.dictKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="success" @click="openUpdateDialog" size="mini">修改</el-button>
      <el-button type="danger" @click="deleteUser" size="mini">删除</el-button>
    </el-row>
    <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px" :highlight-current-row="true" @current-change="handleRowChange" :height="550">
      <!-- 暂时不用这种在行中放操作按钮，样式没调比较丑
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
      -->
      <el-table-column label="" width="35" fixed="left">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model="radioId">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="80" sortable fixed="left"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180" fixed="left"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180" fixed="left"></el-table-column>
      <el-table-column prop="status" label="状态" width="80" :formatter="statusFormatter" fixed="left"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
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
    <!--更新form-->
    <el-dialog title="修改" :visible.sync="updateFormVisible">
      <el-form ref="form" :model="updateForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="updateForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="updateForm.status" placeholder="">
            <el-option
              v-for="state in dict_user_status"
              :key="state.dictKey"
              :label="state.dictValue"
              :value="state.dictKey">
            </el-option>
          </el-select>
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
import {queryUsers, updateUser, deleteUser} from "@/api/user";
import {queryDictInfo} from "@/api/system";
import {selectDictValue} from "@/utils";

export default {
  name: "User",
  data() {
    return {
      radioId: '',
      // 分页数据
      total: 0,
      // 查询条件
      param: {
        username: '',
        nickname: '',
        pageNum: 1,
        pageSize: 10,
      },
      // 列表数据
      tableData: [],
      // 当前选中行的数据
      currentRow: {},
      // 用户状态字典
      dict_user_status: [],
      // 更新用户record
      updateFormVisible: false,
      updateForm: {}
    }
  },
  methods: {
    // 查询数据
    findAll() {
      queryUsers(this.param).then(res => {
        this.tableData = res.data.data.records
        this.total = res.data.data.total
        // 处理单选radio
        if (this.tableData) {
          this.currentRow = res.data.data.records[0]
          this.radioId = this.currentRow.id
        }
      })
    },
    // 查询状态字典
    getStatus() {
      queryDictInfo("dict_user_status").then(res => {
        this.dict_user_status = res.data.data
      })
    },
    // 查询按钮
    onSubmit() {
      this.findAll();
    },
    // 重置按钮
    onReset() {
      this.param = {
        pageNum: 1,
        pageSize: 10
      };
      this.findAll();
    },
    // 处理分页，当前页大小改变
    handleSizeChange(val) {
      this.param.pageSize = val;
      this.findAll();
    },
    // 处理分页，当前页数改变
    handleCurrentChange(val) {
      this.param.pageNum = val;
      this.findAll();
    },
    // 打开修改界面
    openUpdateDialog() {
      this.updateFormVisible = true;
      this.updateForm = this.currentRow;
    },
    // 修改用户
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
    // 删除用户
    deleteUser() {
      this.$confirm('确定删除用户<' + this.currentRow.username + '>吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(this.currentRow.id).then(res => {
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
      })
    },
    // 字典状态字典翻译
    statusFormatter(row, column) {
      // TODO 字典暂不实现
      // return selectDictValue(this.dict_user_status, row.status);
      return row.status;
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
    this.findAll();
    // this.getStatus();
  }
}
</script>

<style scoped>

</style>