import instance from "@/api/index";

let MODEL_PREFIX = "dm-framework-penetration";

export function queryRecords(param) {
  return instance.post(MODEL_PREFIX + '/nmap/queryRecordPage', param)
}

// 查询
export function startScan(param) {
  return instance.post(MODEL_PREFIX + '/nmap/startScan', param)
}