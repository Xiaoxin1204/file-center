const totalCount = 3
const List = [
  {
    id: '@id',
    username: 'admin',
    password: 'admin',
    email: 'lijianxin@longshare.com',
    permissions: ['admin'],
    datatime: '@datetime',
  },
  {
    id: '@id',
    username: '小新',
    password: '小新',
    email: '718949661@qq.com',
    permissions: ['editor'],
    datatime: '@datetime',
  },
  {
    id: '@id',
    username: 'test',
    password: 'test',
    email: 'lijianxin@longshare.com',
    permissions: ['admin', 'editor'],
    datatime: '@datetime',
  },
]
module.exports = [
  {
    url: '/userManagement/getList',
    type: 'post',
    response(config) {
      const { title = '', pageNo = 1, pageSize = 20 } = config.body
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount,
        data: pageList,
      }
    },
  },
  {
    url: '/userManagement/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/userManagement/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
