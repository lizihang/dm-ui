<template>
    <el-dialog title="详细信息" :visible.sync="visible" width="800px" >
      <el-row>
        <el-button @click="button_save">保存</el-button>
        <el-button @click="button_refresh">刷新</el-button>
      </el-row>
      <el-table ref="editTable"
                :data="getTableData"
                class="tb-edit"
                border
                stripe
                :height="600"
                :highlight-current-row="true"
                @current-change="handleRowChange">
        <el-table-column v-if="showIndex" type="index" width="50"></el-table-column>
        <el-table-column v-for="(item,index) in tableHeader"
                         :key="index"
                         :prop="item.name"
                         :headerAlign="'center'"
                         :align="item.align"
                         :label="item.title"
                         :fixed="item.fixed"
                         :width="item.width"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-select v-if="item.type === 'select'" size="small" v-model="scope.row[item.name]"
                       @change="selectChange(scope.$index, scope.row)"
                       placeholder="请选择内容"
                       value="">
              <el-option
                      v-for="option in item.data"
                      :value="option.name"
                      :key="option.name"
                      :label="option.name"/>
            </el-select>
            <div v-else-if="item.type==='operate'">
              <el-button type="text" size="small" @click.stop="button_newRow(scope.$index,scope.row)">新增</el-button>
              <el-button type="text" size="small" @click.stop="button_delete(scope.$index,scope.row)">删除</el-button>
            </div>
            <el-input v-else size="small" :disabled="item.disabled" v-model="scope.row[item.name]" placeholder="请输入内容"
                      @change="inputChange(scope.$index, scope.row)"/>
            <span>{{ scope.row[item.name] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
</template>

<script>
  export default {
    // 可编辑的弹出框
    name: "EditTableDialog",
    props: {
      // 显示-隐藏
      "visible": {
        type: Boolean,
        default: false
      },
      // 是否显示首列 index
      "showIndex": {
        type: Boolean,
        default: true
      },
      "tableHeader": Array,
      // 主表主键
      "mainPrimary": {},
    },
    computed: {
      // 获取数据
      getTableData() {
        let tdata = this.$parent.queryDetail();
        if (tdata == null || tdata.length === 0) {
          tdata.push(Object.assign({}, this.mainPrimary))
        }
        return tdata
      },
    },
    methods: {
      // 按钮
      button_save() {

      },
      button_newRow() {

      },
      button_refresh() {
      },
      button_delete() {

      },
      // 处理table行改变
      handleRowChange(currentRow, oldCurrentRow) {
        console.log("行移动 currentRow:" + JSON.stringify(currentRow) + ";oldCurrentRow:" + JSON.stringify(oldCurrentRow))
        if (oldCurrentRow != null) {
          // 如果oldRow的model=new说明是新增的行，并且没录入过数据
          if (oldCurrentRow.model === "new") {
            this.tableData.splice(this.tableData.length - 1, 1)
          }
          // 如果oldRow的model=modify说明修改过
          if (oldCurrentRow.model === "modify") {
            // 如果这行必录项都填了，那么出发存盘或者更新
            if (this.checkRowInput(oldCurrentRow)) {
              if (this.getSaveModel(oldCurrentRow) === "insert") {
                this.$emit("insertRecord", oldCurrentRow)
              }
              if (this.getSaveModel(oldCurrentRow) === "update") {
                this.$emit("updateRecord", oldCurrentRow)
              }
            } else {
              //如果没验证通过，焦点切回oldRow，并提示
              this.$refs.editTable.setCurrentRow(oldCurrentRow);
              this.$message.error("当前行有必录项未填！");
            }
          }
        }
      },
      // select选择改变
      selectChange(index, row) {
        row.model = "modify"
      },
      // input输入框改变
      inputChange() {

      },
      // dialog关闭前事件
      handleClose() {
        //  1.关闭前检查数据是否保存，没保存提示
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
      }
    }
  }
</script>

<style scoped>

</style>