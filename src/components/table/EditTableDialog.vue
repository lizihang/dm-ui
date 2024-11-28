<template>
  <el-dialog title="详细信息" :visible.sync="isShow" width="800px" @close="handleClose" @open="handleOpen" :before-close="beforeClose" @opened="handleOpened">
    <el-row style="padding-bottom: 10px">
      <el-button type="primary" size="mini" @click="button_save">保存</el-button>
      <el-button size="mini" @click="button_refresh">刷新</el-button>
    </el-row>
    <el-table ref="editTable"
              :data="tableData"
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
    data() {
      return {
        isShow: false,
        // table数据
        tableData: [],
        // 最终返回给父组件的存盘数据
        saveData: []
      }
    },
    props: {
      // 显示-隐藏，子组件需要watch
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
      "mainPrimary": String,
    },
    methods: {
      // 刷新按钮，如果有未保存的数据，弹框提示，仍然删除就刷新界面
      button_refresh() {
        console.log("点击刷新按钮")
        // 1.检查是否有未保存的数据，如果有，弹框提示
        if (!this.checkSaved()) {
          this.$confirm('还有未存盘的数据，是否刷新？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getData()
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 保存按钮，将整个table数据返回，发一次请求
      button_save() {
        console.log("点击存盘按钮")
        // 需要父类实现
        this.$parent.saveDetail(this.saveData).then(res => {
          if (res.data.status === 1) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(err => {
          this.$message.error(err);
        })
      },
      // 新增一行
      button_newRow(index, row) {
        console.log("新增按钮 index=" + index + ";row=" + JSON.stringify(row));
        let lastRow = this.tableData[this.tableData.length - 1];
        if (this.checkRowInput(lastRow)) {
          this.tableData.push(Object.assign({}, this.mainPrimary));
          this.tableData[this.tableData.length - 1].model = "new";
          this.$refs.editTable.setCurrentRow(this.tableData[this.tableData.length - 1]);
        } else {
          this.$message.error("当前行有必录项未填！");
        }
      },
      // 删除一行
      button_delete(index, row) {
        console.log("删除按钮 index=" + index + ";row=" + JSON.stringify(row))
        this.$confirm('确定删除当前行吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.model = "delete";
          // 焦点先跳到上一行
          this.$refs.editTable.setCurrentRow(this.tableData[index - 1]);
          // 删除数据
          this.tableData.splice(index, 1)
          // 如果主键不为空，触发删除方法
          if (!this.checkPrimaryIsNull(row)) {
            this.$emit("deleteRecord", row)
          }
        }).catch(err => {
          console.log(err);
        })
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
      inputChange(index, row) {
        console.log("input change")
        row.model = "modify"
        this.saveData.push(row)
      },
      // 关闭前检查是否有未保存的数据
      beforeClose(done) {
        // 1.检查是否有未保存的数据，如果有，弹框提示
        console.log("beforeClose:" + this.checkSaved());
        if (!this.checkSaved()) {
          this.$confirm('还有未存盘的数据，是否关闭？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // TODO
            if (!this.checkRowInput(this.tableData[this.tableData.length - 1])) {
              this.tableData.splice(this.tableData.length - 1, 1)
            }
            done()
          }).catch(err => {
            console.log(err)
          })
        } else {
          done()
        }
      },
      // dialog关闭事件
      handleClose() {
        console.log("关闭dialog")
        // 清空数据
        this.tableData = []
        this.saveData = []
        // 通知父组件关闭
        this.$emit("closeDialog")
      },
      // dialog打开事件
      handleOpen() {
        console.log("open")
        this.getData()
      },
      handleOpened() {
        console.log("opened")
        this.$refs.editTable.setCurrentRow(this.tableData[0]);
      },
      getData() {
        console.log("getData")
        let data = this.$parent.queryDetail(this.mainPrimary);
        console.log("data",data)
        if (data == null || data.length === 0) {
          // let record = Object.assign({}, this.mainPrimary)
          let record = {
            "dictId": this.mainPrimary
          }
          record.model = "new"
          data.push(record)
        } else {
          data.forEach(record => {
            record.model = "saved"
          })
        }
        this.tableData = data
        console.log("this tableData ",this.tableData)
      },
      // 检查是否有未存盘数据，如果没有未存盘数据，返回true
      checkSaved() {
        console.log("checkSaved")
        if (this.saveData == null || this.saveData.length === 0) {
          return true;
        }
        return false;
      },
      // 判断所有必录项是否有值
      checkRowInput(row) {
        console.log("checkRowInput")
        let check = true;
        this.tableHeader.forEach(head => {
          if (head.require) {
            if (row[head.name] == null || row[head.name] === "") {
              check = false;
            }
          }
        })
        return check;
      },
      // 判断主键是否为空，true为空
      checkPrimaryIsNull(row) {
        console.log("checkPrimaryIsNull")
        let check = false;
        this.tableHeader.forEach(head => {
          if (head.primary) {
            if (row[head.name] == null || row[head.name] === "") {
              check = true;
            }
          }
        })
      },
      // 判断存盘模式，插入或者更新
      getSaveModel(row) {
        console.log("getSaveModel")
        let model;
        if (this.checkPrimaryIsNull(row)) {
          model = "insert";
        } else {
          model = "update";
        }
        return model;
      }
    },
    watch: {
      visible() {
        this.isShow = this.visible;
      }
    },
    created() {
      console.log("created");
    },
    mounted() {
      console.log("mounted");
    }
  }
</script>

<style scoped>

</style>