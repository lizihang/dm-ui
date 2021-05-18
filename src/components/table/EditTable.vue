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
        <!--
        <el-button v-else-if="item.type === 'btn'" :disabled="disabled" @click="onSelected(scope.$index,scope.row)" type="primary" size="small">
          {{ item.text }}
        </el-button>
        -->
        <div v-else-if="item.type==='operate'">
          <el-button type="text" size="small" @click.stop="onAdd(scope.$index,scope.row)">新增</el-button>
          <el-button type="text" size="small" @click="onDelete(scope.$index,scope.row)">删除</el-button>
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
        this.tableData.push(this.mainPrimary)
      }
      return this.tableData
    }
  },
  methods: {
    handleRowClick(row, event, column) {
      //console.log(row, event, column, event.currentTarget)
    },
    // 处理table行改变
    handleRowChange(currentRow, oldCurrentRow) {
      console.log("行移动 currentRow:" + JSON.stringify(currentRow) + ";oldCurrentRow:" + JSON.stringify(oldCurrentRow))
      if (oldCurrentRow != null) {
        this.$emit("updateRecord", oldCurrentRow)
      }
    },
    // select选择改变
    selectChange(index, row) {
      this.$emit("handleEdit", {index: index, row: row})
    },
    onAdd: function (index, row) {
      // TODO 有BUG
      console.log("新增按钮 index=" + index + ";row=" + JSON.stringify(row));
      let lastRow = this.tableData[this.tableData.length - 1];
      let check = true;
      this.tableHeader.forEach(head => {
        if (head.require) {
          if (lastRow[head.name] == null) {
            check = false;
          }
        }
      })
      if (check) {
        this.tableData.push(this.mainPrimary);
        this.$refs.editTable.setCurrentRow(this.tableData[this.tableData.length - 1]);
      }
    },
    onDelete: function (index, row) {
      console.log("删除按钮 index=" + index + ";row=" + JSON.stringify(row))
      console.log("onDelete method");
      this.$emit("deleteRecord", {index: index, row: row})
    },
    inputChange() {
    
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

