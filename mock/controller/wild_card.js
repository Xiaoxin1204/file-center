const data = [
  {
    key: 'sequenceNo',
    label: '顺序号',
    width: '250',
  },
  {
    key: 'wildcardCode',
    label: '通配符',
    width: '250',
  },
  {
    key: 'usedType',
    label: '使用类型',
    width: '250',
  },
  {
    key: 'typeValue',
    label: '类型具体值',
    width: '800',
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
