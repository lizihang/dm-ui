import instance from "@/api/index";

let MODEL_PREFIX = "dm-user";

/*-------------------- 用户相关方法 --------------------*/

// 注册
export function register(user) {
  return instance.post(MODEL_PREFIX + '/user/register', user)
}

// 查询
export function queryUsers(param) {
  return instance.post(MODEL_PREFIX + '/user/queryUserPage', param)
}

// 查询用户信息，不需要参数，因为请求带token，后台从token中取user
export function queryUserInfo() {
  let data = new FormData();
  data.append('id', 1);
  return instance.post(MODEL_PREFIX + '/user/queryUserInfo', data)
}

export function updateUser(user) {
  return instance.post(MODEL_PREFIX + '/user/updateUser', user)
}

// 用户头像上传
export function uploadAvatar(data) {
  return instance({
    url: MODEL_PREFIX + '/user/updateAvatar',
    method: 'post',
    data: data
  })
}

export function deleteUser(id) {
  let data = new FormData();
  data.append('id', id);
  return instance({
    url: MODEL_PREFIX + '/user/deleteUserById',
    method: 'post',
    data: data
  })
}

/*-------------------- 角色相关方法 --------------------*/

// 查询角色列表
export function queryRoles(param) {
  return instance.post(MODEL_PREFIX + '/role/queryRoleList', param)
}

// 新增角色
export function addRole(role) {
  return instance.post(MODEL_PREFIX + '/role/addRole', role)
}

// 新增角色
export function updateRole(role) {
  return instance.post(MODEL_PREFIX + '/role/updateRole', role)
}

// 新增角色
export function deleteRole(roleId) {
  return instance({
    url: MODEL_PREFIX + '/role/deleteRole',
    method: 'post',
    data: {
      id: roleId
    }
  })
}

/*-------------------- 菜单相关方法 --------------------*/

// 获取菜单
export function getMenus(param) {
  return instance.post(MODEL_PREFIX + '/menu/queryMenuList', param)
}


