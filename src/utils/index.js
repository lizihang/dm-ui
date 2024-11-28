// 回显数据字典
// TODO 看console打印很多，效率问题？
export function selectDictValue(dict, dictKey) {
  console.log("dictKey:" + dictKey)
  let actions = [];
  Object.keys(dict).some((key) => {
    // console.log("key:"+key)
    if (dict[key].dictKey === ('' + dictKey)) {
      actions.push(dict[key].dictValue);
      return true;
    }
  })
  return actions.join('');
}