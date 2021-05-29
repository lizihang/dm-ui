import axios from "axios";

// 用户相关方法
export function queryUsers(param) {
  return axios({
    url: 'http://127.0.0.1:8081/user/queryUserList',
    method: 'get',
    params: param
  })
}

// 查询用户信息，不需要参数，因为请求带token，后台从token中取user
export function queryUserInfo() {
  return axios({
    url: 'http://127.0.0.1:8081/user/queryUserInfo',
    method: 'get'
  })
}

export function updateUser(user) {
  return axios({
    url: 'http://127.0.0.1:8081/user/updateUser',
    method: 'post',
    data: user
  })
}

export function deleteUser(id) {
  return axios({
    url: 'http://127.0.0.1:8081/user/deleteUserById',
    method: 'delete',
    params: {
      id: id
    }
  })
}

// 角色相关方法
export function queryRoles(param) {
  return axios({
    url: 'http://127.0.0.1:8081/role/queryRoleList',
    method: 'get',
    params: param
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return axios({
    url: 'http://127.0.0.1:8081/system/updateAvatar',
    method: 'post',
    data: data
  })
}
