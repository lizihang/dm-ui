import axios from "axios";

// 获取验证码
export function getCodeImg() {
  return axios({
    url: 'http://127.0.0.1:8081/getCodeImg',
    method: 'get'
  })
}

// 登录方法
export function login(user) {
  return axios({
    url: 'http://127.0.0.1:8081/user/login',
    method: 'post',
    data: user
  })
}

export function register(user) {
  return axios({
    url: 'http://127.0.0.1:8081/user/register',
    method: 'post',
    data: user
  })
}
