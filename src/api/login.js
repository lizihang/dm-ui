import axios from "axios";

// 获取验证码
export function getCodeImg() {
  return axios({
    url: 'http://127.0.0.1:8081/system/getCodeImg',
    method: 'get'
  })
}

// 登录方法
export function login(user) {
  let data = new FormData();
  data.append('username', user.username);
  data.append('password', user.password);
  return axios({
    url: 'http://127.0.0.1:8081/login',
    method: 'post',
    data: data
  })
}

// 登出
export function logout() {
  return axios({
    url: 'http://127.0.0.1:8081/logout',
    method: 'post'
  })
}

export function register(user) {
  return axios({
    url: 'http://127.0.0.1:8081/user/register',
    method: 'post',
    data: user
  })
}
