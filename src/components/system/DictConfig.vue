<template>
  <div>
    <el-form :inline="true" :model="param" class="demo-form-inline" size="mini">
      <el-form-item label="字典号">
        <el-input v-model="param.dictId"></el-input>
      </el-form-item>
      <el-form-item label="字典名称">
        <el-input v-model="param.dictName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="param.status" placeholder="">
          <el-option
                  v-for="state in dict_status"
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
      <el-button type="primary" @click="openAddDialog" size="mini">新增</el-button>
      <el-button type="success" @click="openUpdateDialog" size="mini">修改</el-button>
      <el-button type="danger" @click="deleteDict" size="mini">删除</el-button>
      <el-button type="warning" @click="openDetail" size="mini">详情</el-button>
    </el-row>
    <el-table ref="dataTable" :data="tableData" border stripe style="width: 100%; margin-top: 20px" :highlight-current-row="true" @current-change="handleRowChange" :height="550">
      <el-table-column label="" width="35">
        <template slot-scope="scope">
          <el-radio :label="scope.row.dictId" v-model="radioId">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="dictId" label="字典号" width="160" sortable></el-table-column>
      <el-table-column prop="dictName" label="字典名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="80" :formatter="statusFormatter">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.status"
                  active-value="70"
                  inactive-value="10"
                  @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180"></el-table-column>
      <el-table-column prop="createUser" label="创建人" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="modifyUser" label="修改人" width="180"></el-table-column>
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

    <!-- 新增，修改dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form ref="form" :model="dialogForm" :rules="rules" label-width="80px">
        <el-form-item label="字典号" prop="dictId">
          <el-input v-model="dialogForm.dictId"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="dialogForm.dictName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dialogForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="dialogForm.status" label="10">未启用</el-radio>
          <el-radio v-model="dialogForm.status" label="70">启用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--
      <el-dialog title="详细信息" :visible.sync="detailFormVisible" width="600px">
        <el-table :data="detailList" border stripe style="width: 100%; margin-top: 20px" :highlight-current-row="true" :height="550">
          <el-table-column prop="id" label="主键" width="120"></el-table-column>
          <el-table-column prop="dictId" label="字典号" width="160"></el-table-column>
          <el-table-column prop="dictKey" label="字典值" width="180"></el-table-column>
          <el-table-column prop="dictValue" label="字典名称" width="80"></el-table-column>
        </el-table>
      </el-dialog>
    -->
    <!--<el-dialog title="详细信息" :visible.sync="detailFormVisible" width="800px">
      <editTable
              ref="editTable"
              :show-index="false"
              :tableData="detailList"
              :height="tableHeight"
              :disabled="disabled"
              :tableHeader="tableHeader"
              :main-primary="mainPrimary"
              @addRecord="addRecord"
              @deleteRecord="deleteRecord"
              @updateRecord="updateRecord"/>
    </el-dialog>-->

    <edit-table-dialog
            :visible="detailFormVisible"
            :show-index="false"
            :table-header="tableHeader"
            :main-primary="mainPrimary"
            @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
  import {queryDictList, queryDictInfo, addDict, updateDict, deleteDict} from "@/api/system";
  import {selectDictValue} from "@/utils";
  import EditTable from "@/components/table/EditTable";
  import EditTableDialog from "@/components/table/EditTableDialog";

  export default {
    name: "DictConfig",
    data() {
      return {
        radioId: '',
        // 分页数据
        total: 0,
        // 查询条件
        param: {
          dictID: '',
          dictName: '',
          pageNum: 1,
          pageSize: 10,
        },
        // 列表数据
        tableData: [],
        // 当前选中行的数据
        currentRow: {},
        // 状态字典
        dict_status: [],
        // dialog相关
        dialogTitle: '',
        dialogVisible: false,
        // flag = true 表单为新增，flag = false
        dialogFlag: '',
        dialogForm: {
          remark: '',
          status: '70'
        },
        // 表单校验
        rules: {
          dictId: [
            {required: true, message: "字典号不能为空", trigger: "blur"}
          ],
          dictName: [
            {required: true, message: "字典名称不能为空", trigger: "blur"}
          ]
        },
        // 详情相关
        detailFormVisible: false,
        detailList: [{
          dictKey: '',
          dictValue: '',
        }],
        // editTable
        tableHeight: 500,
        disabled: false,
        editTableData: [],
        mainPrimary: {},
        tableHeader: [
          {name: 'id', title: '主键', width: '150', type: "text", disabled: true, primary: true},
          {name: 'dictId', title: '字典号', width: '150', type: "text", disabled: true},
          {name: 'dictKey', title: '字典值', width: '150', type: "text", disabled: false, require: true},
          {name: 'dictValue', title: '字典名', width: '150', type: "text", disabled: false, require: true},
          {name: 'operate', title: '操作', width: '100', type: "operate", disabled: true, flag: 4},
        ],
      }
    },
    methods: {
      closeDialog() {
        this.detailFormVisible = false
      },
      // 查询数据
      findAll() {
        queryDictList(this.param).then(res => {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          // 处理单选radio
          this.currentRow = res.data.data.list[0]
          this.radioId = this.currentRow.dictId
          this.mainPrimary.dictId = this.currentRow.dictId
          // 处理单选表高亮
          this.$refs.dataTable.setCurrentRow(this.currentRow);
        })
      },
      //
      queryDetail() {
        console.log("queryDetail")
        return Object.assign([], this.currentRow.dictInfoList);
      },
      //
      saveDetail() {

      },
      // 查询状态字典
      getStatus() {
        queryDictInfo("dict_status").then(res => {
          this.dict_status = res.data.data
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
      // 字典状态字典翻译
      statusFormatter(row, column) {
        return selectDictValue(this.dict_status, row.status);
      },
      // 处理table行改变
      handleRowChange(val) {
        // 切换分页的时候，val为空，所以判断一下
        if (val == null) {
          this.$refs.dataTable.setCurrentRow(this.tableData[0]);
          this.currentRow = this.tableData[0];
          this.radioId = this.currentRow.dictId;
          this.mainPrimary.dictId = this.currentRow.dictId;
        } else {
          this.$refs.dataTable.setCurrentRow(val);
          this.currentRow = val;
          this.radioId = val.dictId;
          this.mainPrimary.dictId = val.dictId;
        }
      },
      // 打开新建界面
      openAddDialog() {
        this.dialogTitle = '新增';
        this.dialogVisible = true;
        this.dialogFlag = true;
        this.dialogForm = {
          status: '70'
        }
      },
      // 打开修改界面
      openUpdateDialog() {
        this.dialogTitle = '修改';
        this.dialogVisible = true;
        this.dialogFlag = false;
        // Object.assign()解决双向绑定问题：在修改dialog修改数据后点击取消，主界面table数据改变的问题
        this.dialogForm = Object.assign({}, this.currentRow);
      },
      // 表单提交，新增或修改
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            // true 新增
            if (this.dialogFlag) {
              addDict(this.dialogForm).then(res => {
                if (res.data.status === 200) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                  // 隐藏表单
                  this.dialogVisible = false;
                  // 刷新数据
                  this.findAll()
                } else {
                  this.$message.error(res.data.msg);
                }
              })
            } else {
              updateDict(this.dialogForm).then(res => {
                if (res.data.status === 200) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                  // 隐藏表单
                  this.dialogVisible = false;
                  // 刷新数据
                  this.findAll()
                } else {
                  this.$message.error(res.data.msg);
                }
              })
            }
            //  清空form
            this.dialogForm = {
              status: '70'
            };
          }
        });
      },
      // 表单取消按钮
      cancel() {
        this.$refs['form'].clearValidate();
        this.dialogVisible = false;
      },
      // 删除字典
      deleteDict() {
        this.$confirm('确定删除字典<' + this.currentRow.dictId + '>吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDict(this.currentRow.dictId).then(res => {
            if (res.data.status === 200) {
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
      openDetail() {
        this.detailFormVisible = true;
        this.detailList = Object.assign([], this.currentRow.dictInfoList);
      },
      // 子组edit-table件返回的时间
      addRecord(index, row) {   //按钮返回的事件
      },
      deleteRecord(index, row) {   //单元格中数据改变 返回的事件
      },
      updateRecord(row) {
      },
      handleStatusChange(row){

      }
    },
    created() {
      this.findAll();
      this.getStatus();
    },
    components: {
      EditTable,
      EditTableDialog
    }
  }
</script>

<style>
  .detail-input {
    width: 120px;
  }

  .detail-toolbar {
    padding-bottom: 10px;
  }

  .el-dialog__body {
    padding-top: 0px;
  }

  .detail-form-inline {
    height: 40px;
  }
</style>