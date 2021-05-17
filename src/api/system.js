// 获取字典
import axios from "axios";

// 获取字典列表
export function queryDictList(param) {
  return axios({
    url: 'http://127.0.0.1:8081/system/queryDictList',
    method: 'get',
    params: param
  })
}

// 根据字典ID获取字典详情
export function queryDictInfo(dictId) {
  return axios({
    url: 'http://127.0.0.1:8081/system/queryDictInfo',
    method: 'get',
    params: {
      dictId: dictId
    }
  })
}

export function addDict(dict) {
  return axios({
    url: 'http://127.0.0.1:8081/system/addDict',
    method: 'post',
    data: dict
  })
}

export function updateDict(dict) {
  return axios({
    url: 'http://127.0.0.1:8081/system/updateDict',
    method: 'post',
    data: dict
  })
}