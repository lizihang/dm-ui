<template>
  <keep-alive>
    <div class="chat-page">
      <div class="chat-msg-div" ref="scrollDiv" style="overflow-y: auto">
        <div v-for="(msgData, index) in msgDataList" :key="index">
          <template v-if="msgData.sendName === 'bot'">
            <chat-msg-item :msg-data="msgData"/>
          </template>
          <template v-else>
            <chat-msg-item2 :msg-data="msgData"/>
          </template>
        </div>
      </div>
      <div class="btn-text">
        <el-button type="primary" @click="stopFetch">stopFetch</el-button>
      </div>
      <div class="chat-msg-input" @keyup.enter="handleSend">
        <div>
      <textarea
        class="chat-msg-input-content"
        v-model="input"
        rows="3"
        ref="msgBox"/>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import ChatMsgItem from "./ChatMsgItem";
import ChatMsgItem2 from "./ChatMsgItem2";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import request from "@/api";
import {v4 as uuid} from 'uuid';

export default {
  name: "Chat",
  components: {
    ChatMsgItem,
    ChatMsgItem2,
  },
  data() {
    return {
      input: "",
      msgDataList: [],
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      },
      ctrl: new AbortController(),
      uuid: '',
      content: '',
      es: null,
    };
  },
  watch: {
    msgDataList: function () {
      console.log("msg list 监听到msgDataList变化", this.msgDataList);
      this.handleScrollBottom();
    },
  },
  methods: {
    postChat(prompt) {
      let data = new FormData();
      data.append('id', this.uuid);
      data.append('prompt', prompt);
      data.append('stream', true);
      request({
        url: 'http://127.0.0.1:19001/stream/streamChat',
        method: 'post',
        data: data
      })
    },
    getMessage(prompt) {
      let that = this;
      let content = "";
      that.ctrl = new AbortController();
      // let url = "http://vpn1.rendersea.com:18501/botong/llm/chat"
      let url = "http://127.0.0.1:19001/stream/sse"
      fetchEventSource(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          // "prompt": '今天的日期是什么2？'
          prompt: prompt.replaceAll("\n", ""),
          stream: true,
        }),
        
        onmessage(msg) {
          console.log("msg", msg);
          if (msg.event === "delta") {
            let data = JSON.parse(msg.data);
            console.log("finished:", data.finished);
            let success = data.success;
            if (!data.finished) {
              /* response替换
              let content = data.response.replaceAll("\n\n", "<br/>");
              that.msgDataList[that.msgDataList.length - 1].content = content
              */
              // delta方式拼接
              let delta = data.delta.replace(/(\n)+/, "\n");
              // let delta = data.delta;
              content += delta;
              that.msgDataList[that.msgDataList.length - 1].content = content;
            } else {
              that.msgDataList[that.msgDataList.length - 1].content =
                data.message.replaceAll("\n\n", "\n");
              console.log(data.message);
            }
            that.handleScrollBottom();
          }
        },
        onerror(err) {
          console.log("报错了！" + err);
        },
        mode: "cors",
        signal: that.ctrl.signal,
      });
    },
    handleSend(e) {
      const shiftKey = e.shiftKey;
      if (shiftKey) {
        return;
      }
      // 1.处理自己的消息
      let msgData = {
        sendName: "me",
        receiveName: "ChatGPT",
        sendTime: new Date().toLocaleString("zh-CN", {
          timeZone: "Asia/Shanghai",
        }),
        content: this.input,
      };
      this.msgDataList.push(msgData);
      // 2.先放个空的返回消息
      let botData = {
        sendName: "bot",
        receiveName: "me",
        sendTime: new Date().toLocaleString("zh-CN", {
          timeZone: "Asia/Shanghai",
        }),
        content: "正在处理",
      };
      this.msgDataList.push(botData);
      // 清空输入
      this.$nextTick(() => {
        this.input = "";
      });
      // 发送消息
      this.postChat(this.input);
    },
    stopFetch() {
      this.ctrl.abort();
    },
    // 滚动到顶部
    handleScrollTop() {
      this.$nextTick(() => {
        let scrollElem = this.$refs.scrollDiv;
        scrollElem.scrollTo({top: 0, behavior: "smooth"});
      });
    },
    // 滚动到底部
    handleScrollBottom() {
      this.$nextTick(() => {
        let scrollElem = this.$refs.scrollDiv;
        scrollElem.scrollTo({
          top: scrollElem.scrollHeight,
          behavior: "smooth",
        });
      });
    },
    bottomScrollClick() {
      this.$nextTick(() => {
        let scrollEl = this.$refs.mianscroll;
        scrollEl.scrollTo({top: scrollEl.scrollHeight, behavior: "smooth"});
      });
    },
  },
  created() {
    this.uuid = uuid();
    this.msgDataList = [];
    console.log("created,uuid=" + this.uuid);
    let url = "http://127.0.0.1:19001/stream/subscribe?clientId=" + this.uuid;
    let es = new EventSource(url);
    es.addEventListener("message", e => {
      let data = JSON.parse(e.data)
      let dataStr = data[0].data + data[1].data + data[2].data
      let dataArr = dataStr.split('\n');
      let event = dataArr[0].split(":")[1]
      let testStr = dataArr[1].substring(dataArr[1].indexOf(":") + 1, dataArr[1].length)
      console.log("json", testStr)
      if (event === "delta") {
        let jsonData = JSON.parse(testStr);
        console.log("finished:", jsonData.finished);
        let success = jsonData.success;
        if (!jsonData.finished) {
          /* response替换
          let content = data.response.replaceAll("\n\n", "<br/>");
          that.msgDataList[that.msgDataList.length - 1].content = content
          */
          // delta方式拼接
          let delta = jsonData.delta.replace(/(\n)+/, "\n");
          // let delta = data.delta;
          this.content += delta;
          console.log("msgDataList:", this.msgDataList)
          this.msgDataList[this.msgDataList.length - 1].content = this.content;
        } else {
          this.msgDataList[this.msgDataList.length - 1].content = jsonData.message.replaceAll("\n\n", "\n");
          console.log(data.message);
          this.content = '';
        }
        this.handleScrollBottom();
      }
    }, false);
    this.es = es;
  }
};
</script>

<style scoped lang="scss">
.chat-page {
  //width: 1020px;
  height: 600px;
  //background: #13ce66;
  //margin-left: 200px;
  width: 100%;
  margin: 0 auto;
}

.chat-msg-div {
  //border: black solid 1px;
  height: 550px;
  max-height: 550px;
  width: 100%;
}

.btn-text {
  position: absolute;
  left: 50%;
  bottom: 100px;
}

.chat-msg-input {
  margin: 0 auto;
  border: 1px solid #666;
  margin-top: 20px;
  width: 85%;
  height: 60px;
  overflow: hidden;
  box-shadow: darkgrey -1px -1px 15px -5px;
  border-radius: 10px;
  position: fixed;
  bottom: 30px;
  // margin: 0 auto;
  &-content {
    display: block;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    resize: none;
    outline: 0;
    background-color: white;
    border: 0;
    word-break: break-all;
    font-size: 16px;
    line-height: 17px;
    -webkit-appearance: none;
  }
}
</style>