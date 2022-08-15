import request from "@/api/index";

let MODEL_PREFIX = "dm-security";

// 获取验证码
export function getCodeImg() {
  return request({
    url: MODEL_PREFIX + '/login/getCodeImg',
    method: 'get'
  })
}

// 登录方法
export function security(user) {
  let data = new FormData();
  data.append('username', user.username);
  data.append('password', user.password);
  return request({
    url: MODEL_PREFIX + '/login',
    method: 'post',
    data: data
  })
}

// 登出
export function logout() {
  return request({
    url: MODEL_PREFIX + '/logout',
    method: 'post'
  })
}
