const data = [
  {
    key: 'wildcardCode',
    label: '通配符',
    width: '150',
  },
  {
    key: 'usedType',
    label: '使用类型 0：值1：SQL语句 2：URL地址 3:自定义方法',
    width: '150',
  },
  {
    key: 'sequenceNo',
    label: '顺序号',
    width: '150',
  },
  {
    key: 'typeValue',
    label: '类型具体值',
    width: '150',
  },
]
module.exports = [
  {
    url: '/tableHeader/wild',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
]
