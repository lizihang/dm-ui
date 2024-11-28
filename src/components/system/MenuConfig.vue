<template>
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
      <el-button type="primary" @click="openAddDialog" size="mini">新增</el-button>
      <el-button type="success" @click="" size="mini">修改</el-button>
      <el-button type="danger" @click="" size="mini">删除</el-button>
    </el-row>
    <el-table
        :data="tableData" border tyle="width: 100%; margin-top: 20px"
        :highlight-current-row="true"
        row-key="id"
        :tree-props="{children: 'subMenus', hasChildren: 'hasChildren'}">
      <!--<el-table-column prop="id" label="id" width="80"></el-table-column>-->
      <el-table-column prop="name" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="idx" label="排序" width="180"></el-table-column>
      <el-table-column prop="router" label="路由" width="180"></el-table-column>
      <el-table-column prop="level" label="级别" width="180"></el-table-column>
      <el-table-column v-if="show" prop="parentId" label="父菜单" width="180"></el-table-column>
      <el-table-column v-if="show" prop="createUser" label="创建人" width="180"></el-table-column>
      <el-table-column v-if="show" prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column v-if="show" prop="modifyUser" label="修改人" width="180"></el-table-column>
      <el-table-column v-if="show" prop="modifyTime" label="修改时间" width="180"></el-table-column>
      <el-table-column v-if="show" prop="modifyTime" label="修改时间" width="180"></el-table-column>
    </el-table>

    <!-- 新增form -->
    <el-dialog title="添加菜单" :visible.sync="addFormVisible">
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="上级菜单">
          <treeselect
              v-model="addForm.parentId"
              :options="tableData"
              :normalizer="normalizer"
              :show-count="true"
              placeholder="选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="addForm.type">
            <el-radio label="M">目录</el-radio>
            <el-radio label="C">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="addForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序">
          <el-input v-model="addForm.idx"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由">
          <el-input v-model="addForm.router"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMenu">确 定</el-button>
        <el-button @click="addFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getMenus, addMenu, addRole} from "@/api/user";
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: "MenuConfig",
  components: {Treeselect},
  data() {
    return {
      show: false,
      // 查询条件
      param: {
        menuName: ''
      },
      // 列表数据
      tableData: [],
      addFormVisible: false,
      addForm: {
        id: '',
        name: '',
        idx: '',
        router: '',
        level: '',
        parentId: '',
        createUser: '',
        createTime: '',
        modifyUser: '',
        modifyTime: '',
      },
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
    },
    openAddDialog() {
      this.addForm = {};
      this.addFormVisible = true;
    },
    addMenu() {
      console.log(this.addForm);
      //1 发送请求
      addMenu(this.addForm).then(res => {
        console.log(res.data);
        if (res.data.status) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          // 隐藏表单
          this.addFormVisible = false;
          // 刷新数据
          this.findAll()
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.subMenus && !node.subMenus.length) {
        delete node.subMenus;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.subMenus
      };
    },
  },
  created() {
    this.findAll()
  }
}
</script>

<style scoped>

</style>