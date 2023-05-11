<template>
  <el-upload
    class="upload-demo"
    drag
    action="http://127.0.0.1:8000/uploadfile/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-remove="beforeRemove"
    :before-upload="beforeUpload"
    multiple
    :data="data"
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>

<script>export default {
  data() {
    return {
      data: {},
      fileList: [
        /*{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }*/
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log("handleRemove", file, fileList);
    },
    handlePreview(file) {
      console.log("handlePreview", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleSuccess(response, file, fileList) {
      console.log("上传成功！", response, file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
    ,
    beforeUpload(file) {
      console.log("beforeUpload");
      console.log(file);
      console.log(file.name);
      this.data.userid = "a12345"
    }
  }
}
</script>

<style scoped lang="scss">
</style>