import request from "@/api/index";

let MODEL_PREFIX = "dm-user";

// 注册
export function register(user) {
  return request({
    url: MODEL_PREFIX + '/user/register',
    method: 'post',
    data: user
  })
}

// 查询
export function queryUsers(param) {
  return request({
    url: MODEL_PREFIX + '/user/queryUserList',
    method: 'get',
    params: param
  })
}

// 查询用户信息，不需要参数，因为请求带token，后台从token中取user
export function queryUserInfo() {
  return request({
    url: MODEL_PREFIX + '/user/queryUserInfo',
    method: 'get'
  })
}

export function updateUser(user) {
  return request({
    url: MODEL_PREFIX + '/user/updateUser',
    method: 'post',
    data: user
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: MODEL_PREFIX + '/user/updateAvatar',
    method: 'post',
    data: data
  })
}

export function deleteUser(id) {
  let data = new FormData();
  data.append('id', id);
  return request({
    url: MODEL_PREFIX + '/user/deleteUserById',
    method: 'post',
    data: data
  })
}

/*--------------------------------------------------*/

// 角色相关方法
export function queryRoles(param) {
  return request({
    url: MODEL_PREFIX + '/role/queryRoleList',
    method: 'get',
    params: param
  })
}

/*--------------------------------------------------*/

// 获取菜单
export function getMenus(param) {
  return request({
    url: MODEL_PREFIX + '/menu/queryMenuList',
    method: 'get',
    params: param
  })
}


