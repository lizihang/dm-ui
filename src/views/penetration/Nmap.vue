<template>
  <div>
    <el-form ref="form" label-position="right" :inline=false :model="dialogForm"
             :rules="rules" label-width="80px">
      <el-form-item label="IP地址" prop="ipAddress">
        <el-input type="textarea"
                  :rows="5"
                  v-model="dialogForm.ipAddress"
                  :placeholder=ipPlaceholder>
        </el-input>
      </el-form-item>
      <el-form-item label="端口策略" prop="portType">
        <el-radio-group v-model="dialogForm.portType" @change="radioChange">
          <el-radio label="1">Web端口</el-radio>
          <el-radio label="2">Top100端口</el-radio>
          <el-radio label="3">Top1000端口</el-radio>
          <el-radio label="4">常见RCE端口</el-radio>
          <el-radio label="5">精简端口</el-radio>
          <el-radio label="6">全部端口</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="端口编辑">
        <el-input type="textarea"
                  :rows="5"
                  v-model="dialogForm.portList">
        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="4">
          <el-form-item label="线程" class="itemLeft">
            <el-input v-model="dialogForm.threadNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="Ping扫描">
            <el-switch v-model="dialogForm.pingScan">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="密码破解">
            <el-switch v-model="dialogForm.pwdCracking">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="POC检测">
            <el-switch v-model="dialogForm.poc">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="开启代理">
            <el-switch v-model="dialogForm.useProxy">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button size="medium" type="primary" @click.native.prevent="startScan">扫描</el-button>
        <el-button size="medium" type="primary" @click.native.prevent="startScanSSE">扫描sse</el-button>
        <el-button size="medium" type="danger" @click.native.prevent="stopScan">停止</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="1">
        <span>进度</span>
      </el-col>
      <el-col :span="23">
        <el-progress :text-inside="true" :stroke-width="20" :percentage=percentage></el-progress>
      </el-col>
    </el-row>
    <!--  扫描记录  -->
    <el-table :data="tableData" border stripe
              style="width: 100%; margin-top: 20px" :highlight-current-row="true"
              :height="540"
              :header-cell-style="{ textAlign: 'center' }">
      <el-table-column prop="id" label="id" width="80" fixed="left"></el-table-column>
      <el-table-column prop="outFile" label="文件名" width="180"></el-table-column>
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
  </div>
</template>

<script>
import {queryRecords, startScan} from "@/api/nmap";
import {fetchEventSource} from "@microsoft/fetch-event-source";

export default {
  name: "nmap",
  data() {
    return {
      // 列表数据
      tableData: [],
      // 分页数据
      total: 0,
      // 查询条件
      param: {
        pageNum: 1,
        pageSize: 10,
      },
      ipPlaceholder: 'IP支持换行分割，支持如下格式:192.168.1.1\n' +
        '192.168.1.1/24或192.168.1.1-255\n' +
        '192.168.1.1,192.168.1.3\n' +
        '排除IP可在可支持输入的IP格式前加!\n' +
        '!192.168.1.1/26',
      dialogForm: {
        ipAddress: '',
        portType: '1',
        portList: '443,1443,80,8080,8081,8090',
        threadNum: 200,
        pingScan: false,
        pwdCracking: false,
        poc: false,
        useProxy: false
      },
      portListArr: [
        // Web端口
        "443,1443,80,8080,8081,8090",
        // TOP 100
        "1-100",
        // TOP 1000
        "1-1000",
        // RCE
        "22,23,3389,5900,80,443,3306,6379,5432,1433",
        // 精简
        "22",
        // 全部
        "1-65535"
      ],
      percentage: 0,
      // 表单校验
      rules: {
        ipAddress: [
          {required: true, message: "IP地址不能为空", trigger: "blur"}
        ],
        portType: [
          {required: true, message: "端口策略不能为空", trigger: "blur"}
        ]
      },
      // sse
      ctrl: new AbortController(),
    }
  },
  methods: {
    // 查询数据
    findAll() {
      queryRecords(this.param).then(res => {
        this.tableData = res.data.data.records
        this.total = res.data.data.total
      })
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
    
    // 扫描
    radioChange(value) {
      console.log("radio value changed:", value)
      this.dialogForm.portList = this.portListArr[value-1]
    },
    startScan() {
      console.log(this.dialogForm)
      startScan(this.dialogForm).then(res => {
        if (res.data.status === 1) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    stopScan() {
      this.ctrl.abort();
    },
    startScanSSE() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let that = this;
          that.percentage = 0;
          that.ctrl = new AbortController();
          let url = "http://127.0.0.1:18000/dm-framework-penetration/nmap/sse/startScan"
          fetchEventSource(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Authorization": localStorage.getItem("Authorization")
            },
            body: JSON.stringify(this.dialogForm),
            onmessage(msg) {
              console.log("msg", msg);
              if (msg.event === "delta") {
                let data = JSON.parse(msg.data);
                console.log("finished:", data.finished);
                if (!data.finished) {
                  // delta方式拼接
                  // let delta = data.delta.replace(/(\n)+/, "\n");
                  let delta = data.delta;
                  that.percentage = data.percent;
                  console.log("delta:", delta)
                } else {
                  that.percentage = data.percent;
                  console.log("data.message:", data.message);
                }
              }
            },
            onerror(err) {
              console.log("报错了！" + err);
            },
            mode: "cors",
            signal: that.ctrl.signal,
          });
        }
      })
    },
  },
  created() {
    this.findAll();
  }
}
</script>

<style scoped lang="scss">
</style>