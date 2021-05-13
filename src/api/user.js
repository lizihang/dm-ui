import axios from "axios";

// 用户相关方法
export function queryUsers(param) {
  return axios({
    url: 'http://127.0.0.1:8081/user/queryUserList',
    method: 'get',
    params: param
  })
}

export function addUser(user) {
  return axios({
    url: 'http://127.0.0.1:8081/user/register',
    method: 'post',
    data: user
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
