const data = [
  {
    content: '在github上获得了第一个star，感恩一位名叫Bequiet2014的github用户',
    timestamp: '2020-03-23',
  },
  {
    content: '增加更换主题功能',
    timestamp: '2020-04-10',
  },
  {
    content: '大幅精简代码',
    timestamp: '2020-04-14',
  },
  {
    content: '修复群友反馈的bug',
    timestamp: '2020-04-16',
  },
  {
    content: '剔除maptalks',
    timestamp: '2020-04-17',
  },
  {
    content:
      '换行符统一修改为lf 支持苹果 linux windows协同开发 强制开启最严格eslint规则 不要哭 严格是有好处的',
    timestamp: '2020-04-17',
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
