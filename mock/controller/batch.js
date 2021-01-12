const data = [
  {
    key: 'batchCode',
    label: '批次代码(通配)',
    width: '150',
  },
  {
    key: 'batchName',
    label: '批次名称(通配)',
    width: '250',
  },
  {
    key: 'exchangeFlag',
    label: '导入导出标识',
    width: '100',
  },
  {
    key: 'judgeOkFile',
    label: 'OK文件(通配)',
    width: '400',
  },
  {
    key: 'filePath',
    label: '文件根路径(通配)',
    width: '400',
  },
  {
    key: 'indexFileName',
    label: '索引文件名称(通配)',
    width: '400',
  },
  {
    key: 'indexFileTmpPath',
    label: '索引文件模板地址(通配)',
    width: '400',
  },
]
module.exports = [
  {
    url: '/tableHeader/batch',
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
