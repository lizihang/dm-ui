import axios from "axios";

// 获取验证码
export function getMenus() {
  return axios({
    url: 'http://127.0.0.1:8081/system/getMenus',
    method: 'get'
  })
}
