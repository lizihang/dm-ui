import request from "@/api/index";
// 获取字典

// 获取字典列表
export function queryDictList(param) {
  return request({
    url: '/system/queryDictList',
    method: 'get',
    params: param
  })
}

// 根据字典ID获取字典详情
export function queryDictInfo(dictId) {
  return request({
    url: '/system/queryDictInfo',
    method: 'get',
    params: {
      dictId: dictId
    }
  })
}

export function addDict(dict) {
  return request({
    url: '/system/addDict',
    method: 'post',
    data: dict
  })
}

export function updateDict(dict) {
  return request({
    url: '/system/updateDict',
    method: 'post',
    data: dict
  })
}

export function deleteDict(dictId) {
  return request({
    url: '/system/deleteDict/' + dictId,
    method: 'delete'
  })
}

