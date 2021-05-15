<template>
  <div class="block">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="image in images" :key="image.id">
        <!--<img :src="image.src" class="image">-->
        <el-image :src="image.src" fit="cover" style="width: 100%;height: 100%"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "DmMain",
  data() {
    return {
      images: [
        // 图片地址属性名不能用url！！！src可以
        {id: 1, src: require('@/assets/image/carousel/lunbo1.jpg')},
        {id: 2, src: require('@/assets/image/carousel/lunbo2.jpg')},
        {id: 3, src: require('@/assets/image/carousel/lunbo1.jpg')},
        {id: 4, src: require('@/assets/image/carousel/lunbo2.jpg')}
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>