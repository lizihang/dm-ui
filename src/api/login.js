import request from "@/api/index";

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/system/getCodeImg',
    method: 'get'
  })
}

// 登录方法
export function login(user) {
  let data = new FormData();
  data.append('username', user.username);
  data.append('password', user.password);
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 登出
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 注册
export function register(user) {
  return request({
    url: '/user/register',
    method: 'post',
    data: user
  })
}


// 检查token
export function checkToken() {
  return request({
    url: '/system/checkToken',
    method: 'get'
  })
}
