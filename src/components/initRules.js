export default (fieldList) => {
  const obj = {}
  // 循环字段列表
  for (const item of fieldList) {
    const type = item.type === 'Radio' ? '选择' : '输入'
    if (item.required) {
      if (item.validator) {
        obj[item.value] = {
          required: item.required,
          validator: item.validator,
          trigger: 'change'
        }
      } else {
        obj[item.value] = {
          required: item.required,
          message: '请' + type + item.label,
          trigger: 'change'
        }
      }
    } else if (item.validator) {
      obj[item.value] = {
        validator: item.validator,
        trigger: 'change'
      }
    }
  }
  // formInfo.rules = obj
  return obj
}
