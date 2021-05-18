<template>
  <el-table ref="editTable"
            :data="tData"
            class="tb-edit"
            border
            stripe
            :height="height"
            :highlight-current-row="!disabled"
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
                  :disabled="disabled"
                  :value="option.name"
                  :key="option.name"
                  :label="option.name"/>
        </el-select>
        <div v-else-if="item.type==='operate'">
          <el-button type="text" size="small" @click.stop="onAdd(scope.$index,scope.row)">新增</el-button>
          <el-button type="text" size="small" @click.stop="onDelete(scope.$index,scope.row)">删除</el-button>
        </div>
        <el-input v-else size="small" :disabled="item.disabled || disabled" v-model="scope.row[item.name]" placeholder="请输入内容"
                  @change="inputChange(scope.$index, scope.row)"/>
        <span>{{ scope.row[item.name] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "EditTable",
    props: {
      "tableData": Array,
      // 主表主键
      "mainPrimary": {},
      // 是否显示首列 index
      "showIndex": {
        type: Boolean,
        default: true
      },
      "tableHeader": Array,
      "height": Number,
      //是否为斑马纹table
      "stripe": {
        type: Boolean,
        default: true
      },
      "disabled": Boolean
    },
    computed: {
      tData() {
        if (this.tableData.length === 0) {
          this.tableData.push(Object.assign({}, this.mainPrimary))
        }
        return this.tableData
      }
    },
    methods: {
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
      onAdd: function (index, row) {
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
      onDelete: function (index, row) {
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
        })
      },
      // input框输入事件
      inputChange(index, row) {
        console.log("input change")
        row.model = "modify"
      },
      // 判断所有必录项是否有值
      checkRowInput(row) {
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
        let model;
        if (this.checkPrimaryIsNull(row)) {
          model = "insert";
        } else {
          model = "update";
        }
        return model;
      }
    },
    // 初始化之前，清空旧数据
    beforeCreate() {

    },
    // 挂在完成后，设置表第一行为选中状态
    mounted() {
      this.$refs.editTable.setCurrentRow(this.tableData[0]);
    }
  }
</script>

<style>
  /*当表格选中的时候 会自动添加  .current-row  这些代码很好理解了*/
  .tb-edit .el-input, .tb-edit .el-select {
    display: none
  }

  .tb-edit .current-row .el-input, .tb-edit .current-row .el-select {
    display: block
  }

  .tb-edit .current-row .el-input + span, .tb-edit .current-row .el-select + span {
    display: none
  }
</style>

