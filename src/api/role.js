import request from "@/api/index";

// 角色相关方法
export function queryRoles(param) {
  return request({
    url: '/role/queryRoleList',
    method: 'get',
    params: param
  })
}