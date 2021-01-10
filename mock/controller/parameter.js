const tableHeader = [
  {
    key: 'id',
    label: 'ID',
    width: '150',
  },
  {
    key: 'code',
    label: 'code',
    width: '150',
  },
  {
    key: 'name',
    label: '参数名',
    width: '150',
  },
  {
    key: 'type',
    label: '参数类型',
    width: '150',
  },
  {
    key: 'value',
    label: '参数值',
    width: '150',
  },
  {
    key: 'valueDomain',
    label: '参数定义',
    width: '150',
  },
  {
    key: 'description',
    label: '参数描述',
    width: '150',
  },
]
module.exports = [
  {
    url: '/tableHeader/nav',
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
