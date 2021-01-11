const data = [
  {
    key: 'id',
    label: '编号',
    width: '150',
  },
  {
    key: 'address',
    label: '通讯地址',
    width: '150',
  },
  {
    key: 'instReprIdCode',
    label: '法人代表身份证件代码',
    width: '250',
  },
  {
    key: 'instReprName',
    label: '法人代表姓名',
    width: '100',
  },
  {
    key: 'appSheetSerialNo',
    label: '申请单编号',
    width: '100',
  },
  {
    key: 'certificateNo',
    label: '投资人证件号码',
    width: '250',
  },
  {
    key: 'transactionDate',
    label: '交易发生日期',
    width: '250',
  },
  {
    key: 'investorName',
    label: '投资人户名',
    width: '250',
  },
  {
    key: 'transactorCertNo',
    label: '经办人证件号码',
    width: '250',
  },
  {
    key: 'transactorCertType',
    label: '经办人证件类型',
    width: '250',
  },
  {
    key: 'transactorName',
    label: '经办人姓名',
    width: '250',
  },
  {
    key: 'businessCode',
    label: '业务代码',
    width: '250',
  },
  {
    key: 'acctNoOfFm',
    label: '基金管理人在资金清算机构的交收账号',
    width: '250',
  },
  {
    key: 'distributorCode',
    label: '销售人代码',
    width: '250',
  },
  {
    key: 'educationLevel',
    label: '投资人学历',
    width: '250',
  },
  {
    key: 'emailAddress',
    label: '投资人E-MAIL地址',
    width: '250',
  },
  {
    key: 'homeTelNo',
    label: '投资人住址电话',
    width: '250',
  },
  {
    key: 'mobileTelNo',
    label: '投资人手机号码',
    width: '250',
  },
  {
    key: 'sex',
    label: '投资人性别',
    width: '250',
  },
  {
    key: 'acctNameOfInvestor',
    label: '投资人收款银行账户户名',
    width: '250',
  },
  {
    key: 'nationality',
    label: '投资者国籍',
    width: '250',
  },
  {
    key: 'corpoProperty',
    label: '企业性质',
    width: '250',
  },
]
module.exports = [
  {
    url: '/tableHeader/account_request',
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
