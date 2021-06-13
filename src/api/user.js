import request from "@/api/index";

// 用户相关方法
export function queryUsers(param) {
  return request({
    url: '/user/queryUserList',
    method: 'get',
    params: param
  })
}

// 查询用户信息，不需要参数，因为请求带token，后台从token中取user
export function queryUserInfo() {
  return request({
    url: '/user/queryUserInfo',
    method: 'get'
  })
}

export function updateUser(user) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data: user
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/user/updateAvatar',
    method: 'post',
    data: data
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/deleteUserById',
    method: 'delete',
    params: {
      id: id
    }
  })
}



