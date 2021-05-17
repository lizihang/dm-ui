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
    <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px" :highlight-current-row="true" @current-change="handleRowChange" :height="550">
      <el-table-column label="" width="35">
        <template slot-scope="scope">
          <el-radio :label="scope.row.dictId" v-model="radioId">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="dictId" label="字典号" width="160" sortable></el-table-column>
      <el-table-column prop="dictName" label="字典名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="80" :formatter="statusFormatter"></el-table-column>
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
    <!-- 新增form -->
    <el-dialog title="新增" :visible.sync="addFormVisible">
      <el-form ref="form" :model="addForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="updateForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="updateForm.status" placeholder="">
            <el-option
              v-for="state in dict_status"
              :key="state.dictKey"
              :label="state.dictValue"
              :value="state.dictKey">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="">确 定</el-button>
        <el-button @click="updateFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--更新form-->
    <el-dialog title="修改" :visible.sync="updateFormVisible">
      <el-form ref="form" :model="updateForm" label-width="80px">
        <el-form-item label="字典名称">
          <el-input v-model="updateForm.dictName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="updateForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="updateForm.status" label="10">未启用</el-radio>
          <el-radio v-model="updateForm.status" label="70">启用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="">确 定</el-button>
        <el-button @click="updateCancel">取 消</el-button>
      </div>
    </el-dialog>
  
    <!--详情form-->
    <el-dialog title="详细信息" :visible.sync="detailFormVisible">
      <el-form ref="form" :model="detailList[0]" label-width="80px">
        <el-form-item label="字典名称">
          <el-input v-model="detailList[0].dictKey"></el-input>
        </el-form-item>
        <el-form-item label="字典值">
          <el-input v-model="detailList[0].dictValue"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {queryDictList, queryDict} from "@/api/system";
import {selectDictValue} from "@/utils";

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
      oldCurrentRow: {},
      // 状态字典
      dict_status: [],
      // 更新dialog相关
      addFormVisible: false,
      addForm: {},
      // 更新dialog相关
      updateFormVisible: false,
      updateForm: {
        remark: '',
      },
      isEnable: false,
      detailFormVisible: false,
      detailList: [{
        dictKey: '',
        dictValue: '',
      }],
    }
  },
  methods: {
    // 查询数据
    findAll() {
      queryDictList(this.param).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        // 处理单选radio
        this.currentRow = res.data.data.list[0]
        this.radioId = this.currentRow.dictId
      })
    },
    // 查询状态字典
    getStatus() {
      queryDict("dict_status").then(res => {
        console.log(res.data.data)
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
        this.currentRow = this.tableData[0];
        this.radioId = this.currentRow.dictId;
      } else {
        this.currentRow = val;
        this.radioId = val.dictId;
      }
    },
    openAddDialog() {
      this.addFormVisible = true;
    },
    // 新增字典
    addDict() {
    
    },
    // 打开修改界面
    openUpdateDialog() {
      this.updateFormVisible = true;
      this.updateForm = this.currentRow;
      this.oldCurrentRow = this.currentRow;
    },
    // 修改字典
    editDict() {
      this.updateFormVisible = true;
    },
    updateCancel(){
      this.currentRow = this.oldCurrentRow;
      this.updateFormVisible = false;
    },
    // 删除字典
    deleteDict() {
    
    },
    openDetail(){
      this.detailFormVisible =true;
      console.log(this.currentRow);
      this.detailList = this.currentRow.dictInfoList;
    }
  },
  created() {
    this.findAll();
    this.getStatus();
  }
}
</script>

<style scoped>

</style>