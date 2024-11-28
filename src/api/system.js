import instance from "@/api/index";

let MODEL_PREFIX = "dm-user";

// 对象的方式传参，那么Content-Type: application/json;charset=UTF-8

// 获取字典列表
export function queryDictPage(param) {
  return instance.post(MODEL_PREFIX + '/dict/queryDictPage', param)
}

// 根据字典ID获取字典详情
export function queryDictDetail(dictId) {
  let data = {
    "dictId": dictId
  }
  return instance.post(MODEL_PREFIX + '/dict/queryDictDetail', data)
}

export function addDict(dict) {
  return instance.post(MODEL_PREFIX + '/dict/addDict', dict)
}

export function updateDict(dict) {
  return instance.post(MODEL_PREFIX + '/dict/updateDict', dict)
}

export function deleteDict(id) {
  let data = {
    "id": id
  }
  return instance.post(MODEL_PREFIX + '/dict/deleteDict', data)
}

