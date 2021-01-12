const data = [
  {
    key: 'code',
    label: 'code',
    width: '200',
  },
  {
    key: 'name',
    label: '参数名',
    width: '200',
  },
  {
    key: 'type',
    label: '参数类型',
    width: '150',
  },
  {
    key: 'value',
    label: '参数值',
    width: '250',
  },
  {
    key: 'valueDomain',
    label: '参数定义',
    width: '350',
  },
  {
    key: 'description',
    label: '参数描述',
    width: '300',
  },
]
module.exports = [
  {
    url: '/tableHeader/parameter',
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
