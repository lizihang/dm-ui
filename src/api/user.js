import axios from "axios";

// 登录方法
export function queryUsers(param) {
  return axios({
    url: 'http://127.0.0.1:8081/user/queryList',
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

