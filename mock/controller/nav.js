const data = [
  {
    key: 'id',
    label: '编号',
    width: '350',
  },
  {
    key: 'sequenceNo',
    label: '当日净值排序',
    width: '150',
  },
  {
    key: 'netValueDate',
    label: '净值日期',
    width: '250',
  },
  {
    key: 'fundCode',
    label: '基金代码',
    width: '100',
  },
  {
    key: 'fundName',
    label: '基金代码',
    width: '100',
  },
  {
    key: 'fundSize',
    label: '昨日总资产',
    width: '250',
  },
  {
    key: 'totalFundVol',
    label: '昨日总份额',
    width: '250',
  },
  {
    key: 'nav',
    label: '基金净值',
    width: '250',
  },
  {
    key: 'accumulativeNav',
    label: '基金累计净值',
    width: '250',
  },
  {
    key: 'fundDayIncomeFlag',
    label: '基金今日收益正负',
    width: '250',
  },
  {
    key: 'totalFundVol',
    label: '昨日总份额',
    width: '250',
  },
  {
    key: 'totalFundVol',
    label: '昨日总份额',
    width: '250',
  },
  {
    key: 'totalFundVol',
    label: '昨日总份额',
    width: '250',
  },
  {
    key: 'totalFundVol',
    label: '昨日总份额',
    width: '250',
  },
  {
    key: 'totalFundVol',
    label: '昨日总份额',
    width: '250',
  },
  {
    key: 'totalFundVol',
    label: '昨日总份额',
    width: '250',
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
