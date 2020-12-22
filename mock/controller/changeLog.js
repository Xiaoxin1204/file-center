const data = [
  {
    content: '首次提交',
    timestamp: '2020-11-23',
  },
  {
    content: '增加更换主题功能',
    timestamp: '2020-11-25',
  },
  {
    content: '增加首页文件处理流程',
    timestamp: '2020-12-10',
  },
  {
    content: '增加配置表的CRUD',
    timestamp: '2020-12-15',
  },
  {
    content: '修改已发现的bug',
    timestamp: '2020-12-17',
  },
  {
    content: '文件初始化，批次执行成功，项目大体完成，细节待处理',
    timestamp: '2020-12-17',
  },
]

module.exports = [
  {
    url: '/changeLog/getList',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        totalCount: 999,
        data: data,
      }
    },
  },
]
