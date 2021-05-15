// 获取菜单
import axios from "./index";

export function getMenus() {
  return axios({
    url: 'http://127.0.0.1:8081/system/getMenus',
    method: 'get'
  })
}