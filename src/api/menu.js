import request from "@/api/index";
// 获取菜单

export function getMenus() {
  return request({
    url: '/system/getMenus',
    method: 'get'
  })
}