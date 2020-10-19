import axios from "axios";

// 获取验证码
export function getCodeImg() {
  return axios({
    url: 'http://127.0.0.1:8081/getCodeImg',
    method: 'get'
  })
}

// 登录方法
export function login(username, password, code) {
  const data = {
    username,
    password,
    code,
  }
  return axios({
    url: 'http://127.0.0.1:8081/login',
    method: 'post',
    data: data
  })
}
