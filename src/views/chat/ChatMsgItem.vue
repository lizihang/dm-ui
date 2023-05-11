<template>
  <div class="chat-msg-item" :class="{'chat-msg-item-mine':msgData.mine}">
    <!-- 消息用户信息 -->
    <div class="chat-msg-info">
      <img :src="require('@/assets/image/timg.jpg')"/>
    </div>
    <!-- 消息内容 -->
    <div class="chat-msg-content">
       <!-- <pre  v-highlight>
          <code class="html"> -->
            <span v-text="msgData.content" style="white-space: pre-wrap"/>
          <!-- </code>
        </pre> -->
<!--      <div class="chat-msg-content-arrow"></div>-->
     
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMsgItem",
  props: {
    msgData: {
      type: Object,
      // 是否为自己发送的消息
      mine: Boolean,
      // 发送人
      fromName: String,
      // 发送人头像
      avatar: String,
      // 发送时间
      date: String,
      // 内容
      content: String,
      require: true
    }
  },
  methods:{
    showDefaultImg() {
      this.codeUrl = require('@/assets/image/timg.jpg')
    },
  }
}
</script>

<style scoped lang="scss">
.chat-msg-item {
  margin-left: 5px;
  //border: 1px solid greenyellow;
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  width: 98%;
  overflow: hidden;
  /* Prevent native touch events on Windows */
  touch-action: none;
  /* Prevent text resize on orientation change, useful for web-apps */
  text-size-adjust: none;
  margin-bottom: 5px;
  background: #efefef;
  padding: 30px 10px 20px 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  cite {
    position: absolute;
    left: 60px;
    top: -2px;
    /* width: 500px; */
    line-height: 24px;
    font-size: 14px;
    white-space: nowrap;
    color: #999;
    text-align: left;
    font-style: normal;

    i {
      padding-left: 15px;
      font-style: normal;
    }

  }

  .chat-msg-content {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    margin-left: 50px;
    margin-top: -45px;
    // max-width: 75%;
    position: relative;
    line-height: 22px;
    padding: 8px 15px;
    //background-color: #f3f3f3;
    //border-radius: 3px;
    //border: 1px solid #f0f0f0;
    color: #000;
    word-break: break-all;
    border-right-width: 0;
  }

  .chat-msg-content-arrow {
    top: 6px;
    left: -8px;
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 8px;
    border-left-width: 0;
    border-right-color: #ebeef5;

    &::after {
      content: " ";
      top: -7px;
      left: 1px;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 7px;
      border-left-width: 0;
      border-right-color: #ebeef5;
    }
  }
}
</style>