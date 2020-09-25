<template>
  <div class="dm-main">
    <el-button type="primary" @click="show = !show">新增用户</el-button>
    <el-button type="primary" @click="dialogFormVisible = true">新增用户弹窗</el-button>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px; height: 200px;">
      <el-collapse-transition>
        <div v-show="show">
          <div class="transition-box">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birth"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="地址">
                <el-input type="textarea" v-model="form.addr"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">新增</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "DmMain",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(5).fill(item),
        show: false,
        dialogFormVisible: false,
        form: {
          name: '',
          birth: '',
          gender: '男',
          addr: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        this.dialogFormVisible = false;
      }
    }
  }
</script>

<style scoped>
  .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 450px;
    border-radius: 4px;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>