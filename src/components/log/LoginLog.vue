<template>
  <el-col class="paper">
    <el-row :gutter="24">
      <!--  左侧   -->
      <el-col :span="4" :xs="24">
        <el-card class="type_list">
          <div style="padding-bottom: 25px;">
            <p class="type_name"> 单选题 </p>
            <el-divider></el-divider>
            <p>共 <span style="color: #1890ff">5 </span> 题,
              共 <span style="color: #1890ff">100</span> 分</p>
            <el-row>
              <el-tag v-for="index in 5" :type="index === quIndex ? 'success':''"
                      @click="handleTag(index)" class="type_tag">
                {{ index }}
              </el-tag>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <!-- 中间题目 -->
      <el-col :span="16" :xs="24">
        <el-card class="qu_list">
          <div>
            <template v-for="index in 5">
              <div :class="'index' + index">
                <el-row :gutter="24">
                  <el-col :span="20" style="text-align: left">
                    <!-- 题目: 序号、类型、题干 -->
                    <div>
                      <div class="qu_num">{{ index }}</div>
                      【 单选题 】
                      <div class="qu_content"> 这里是单选的题干信息  </div>
                    </div>

                    <!-- 选项 -->
                    <el-radio-group class="qu_choose_group">
                      <el-radio v-for="item in ['A', 'B', 'C', 'D']"
                                border class="qu_choose">
                        <!-- 选项flex浮动 -->
                        <div class="qu_choose_tag">
                          <div class="qu_choose_tag_type">
                            {{ item }}.
                          </div>
                          <!-- 选项内容和图片 -->
                          <div class="qu_choose_tag_content">
                            这里是选项内容的
                          </div>
                        </div>
                        <div class="qu_choose_answer">
                          <i class="el-icon-success"
                             style="color:#1aac1a;">
                            答案
                          </i>
                        </div>
                      </el-radio>
                    </el-radio-group>

                    <!-- 题目解析 -->
                    <div class="qu_analysis">
                      <el-card>
                        <span>试题解析：</span><br/>
                        <div class="qu_analysis_content">这里是试题解析部分</div>
                      </el-card>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <el-row class="qu_assign_score">
                      本题
                      <el-input-number :controls="false" :min="0" :precision="2" disabled
                                       value="20" class="qu_assign_score_content"/>
                      分
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </template>
          </div>
          <el-divider/>
        </el-card>
      </el-col>

      <!-- 右侧试卷信息 -->
      <el-col :span="4" :xs="24">
        <el-card class="paper_base">
          <p class="paper_base_content">试卷标题</p>
          <p class="paper_base_content">这里是试卷标题</p>
          <el-divider></el-divider>
          <p class="paper_base_content">试卷总分</p>
          <p class="paper_base_score">100分</p>
          <el-divider></el-divider>
        </el-card>
      </el-col>
    </el-row>
  </el-col>

</template>

<script>
export default {
  name: 'ExamProcess',
  data() {
    return {
      quIndex: -1,
    }
  },
  methods: {
    // 点击答题卡题号, 右侧题目滑动
    handleTag(index) {
      // 高亮选中的题目index标签
      this.quIndex = index;
      // 题目滑动到锚定点
      let page = document.querySelector(".index" + index);
      page.scrollIntoView();
    },
  },
}
</script>

<style scoped lang="scss">
.paper {
  line-height: 25px;
  width: 100%;

  // 左侧题目总菜单
  .type_list{
    height: 780px;
    overflow: auto;
    text-align: left;
    line-height: 10px;

    .type_name{
      color: #1890ff;
      font-weight: bold;
    }
    .type_tag{
      margin-right: 10px;
      margin-top: 10px;
    }
  }

  // 试题内容样式
  .qu_list{
    height: 780px;
    overflow: auto;
    page-break-after:always;

    .qu_num {
      display: inline-block;
      //background: url(~@/assets/images/tkxl/btbj.png) no-repeat 100% 100%;
      background-size: contain;
      height: 30px;
      width: 30px;
      line-height: 25px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .qu_content{
      padding-left: 10px;
    }

    // 选项组
    .qu_choose_group{
      width: 100%;

      // 单个选项
      .qu_choose{
        display: block;
        margin: 10px;

        // 去除前面的radio
        ::v-deep .el-radio__input .el-radio__inner {
          display: none;
        }

        // 单个选项内容样式
        .qu_choose_tag {
          display: inline-flex;
          width: 90%;
          // 选项标签
          .qu_choose_tag_type {
            font-weight: bold;
            color: #0a84ff;
            width: 10px;
          }
          // 选项内容
          .qu_choose_tag_content{
            padding: 0 10px 10px 10px;
          }
          .qu_choose_tag_img {
            height: auto;
            display: block;
            margin: 10px;
          }

          .qu_choose_tag_el_image {
            clear: both;
            padding-top: 10px;
          }
        }
        // 选项答案
        .qu_choose_answer{
          float: right;
        }
      }
    }


    // 试题解析
    .qu_analysis{
      padding: 10px;

      .qu_analysis_content{
        padding-top: 10px;
      }
    }

    // 试题赋分
    .qu_assign_score{
      background: #f5f5f5;
      height: 100px;
      padding-top: 35px;

      .qu_assign_score_content{
        width: 80px
      }
    }
  }

  // 右侧试卷基本信息
  .paper_base{
    height: 780px;
    overflow: auto;
    text-align: center;

    .paper_base_content{
      font-weight: bold;
    }
    .paper_base_score{
      font-weight: bold;
      color: #0a76a4;
    }
  }
}
</style>