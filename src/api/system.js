import axios from "axios";

//配置请求时带上token
axios.interceptors.request.use(config => {
  if ( sessionStorage.getItem("Authorization")) {
    config.headers.common['Authorization'] = sessionStorage.getItem("Authorization")
  }
  return config;
})

// 获取验证码
export function getMenus() {
  return axios({
    url: 'http://127.0.0.1:8081/system/getMenus',
    method: 'get'
  })
}
