import axios from "axios";
import {Notification, MessageBox, Message} from 'element-ui'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

//配置请求时带上token
instance.interceptors.request.use(config => {
  if (localStorage.getItem("Authorization")) {
    config.headers.common['Authorization'] = localStorage.getItem("Authorization")
  }
  return config;
})

// 拦截响应response，并做一些错误处理
instance.interceptors.response.use(res => {
    // console.log("拦截401")
    const status = res.data.status
    if (status === 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        localStorage.removeItem("user")
        localStorage.removeItem("Authorization");
        location.replace("/login")
      }).catch(err => {
      })
    } else if (status === 500) {
      Message({
        message: res.data.msg,
        type: 'error'
      })
      return Promise.reject(new Error(res.data.msg))
    } else if (status !== 200) {
      /*
      Notification.error({
        title: res.data.msg
      })
      return Promise.reject('error')
      */
      // TODO 除了错误码500之外的错误，暂时不统一处理，而是在各个方法中处理
      return res
    } else {
      return res
    }
  }, error => {
    console.log('err' + error)
    let {message} = error;
    if (message === "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default instance