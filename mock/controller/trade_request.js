const data = [
  {
    key: 'appSheetSerialNo',
    label: '申请单编号',
    width: '150',
  },
  {
    key: 'fundCode',
    label: '基金代码',
    width: '150',
  },
  {
    key: 'transactionDate',
    label: '交易发生日期',
    width: '100',
  },
  {
    key: 'transactionAccountId',
    label: '投资人基金交易帐号',
    width: '100',
  },
  {
    key: 'distributorCode',
    label: '销售人代码',
    width: '250',
  },
  {
    key: 'applicationVol',
    label: '申请基金份数',
    width: '250',
  },
  {
    key: 'applicationAmount',
    label: '申请金额',
    width: '250',
  },
  {
    key: 'businessCode',
    label: '业务代码',
    width: '250',
  },
  {
    key: 'taAccountId',
    label: '投资人基金帐号',
    width: '250',
  },
  {
    key: 'branch_code',
    label: '网点号码',
    width: '250',
  },
]
module.exports = [
  {
    url: '/tableHeader/trade_request',
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
