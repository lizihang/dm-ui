<template>
  <div>
    <div>
      <el-form :inline="true" :model="param" class="demo-form-inline" size="mini">
        <el-form-item label="菜单名称">
          <el-input v-model="param.menuName"></el-input>
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
      <el-table :data="tableData" border tyle="width: 100%; margin-top: 20px"
                :highlight-current-row="true"
                row-key="id"
                :tree-props="{children: 'subMenus', hasChildren: 'hasChildren'}">
        <!--<el-table-column prop="id" label="id" width="80"></el-table-column>-->
        <el-table-column prop="name" label="菜单名称" width="180"></el-table-column>
        <el-table-column prop="router" label="路由" width="180"></el-table-column>
        <el-table-column prop="group" label="分组" width="180"></el-table-column>
        <el-table-column prop="idx" label="排序号" width="180"></el-table-column>
        <el-table-column prop="level" label="级别" width="180"></el-table-column>
        <el-table-column prop="parent_id" label="父菜单" width="180"></el-table-column>
        <el-table-column prop="createUser" label="创建人" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="modifyUser" label="修改人"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getMenus} from "@/api/system";

  export default {
    name: "MenuConfig",
    data() {
      return {
        // 查询条件
        param: {
          menuName: ''
        },
        // 列表数据
        tableData: [],
        tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          subMenus: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    methods: {
      findAll() {
        getMenus().then(res => {
          this.tableData = res.data.data
          console.log(res.data.data)
        })
      },
      onSubmit() {
        this.findAll();
      },
      onReset() {
        this.param = {};
        this.findAll();
      }
    },
    created() {
      this.findAll()
    }
  }
</script>

<style scoped>

</style>