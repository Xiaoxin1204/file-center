const data = [
  {
    key: 'id',
    label: 'ID',
    width: '150',
  },
  {
    key: 'batchCode',
    label: '批次代码(通配)',
    width: '150',
  },
  {
    key: 'fileCode',
    label: '文件代码',
    width: '250',
  },
  {
    key: 'fileDescription',
    label: '文件描述(通配)',
    width: '100',
  },
  {
    key: 'fileName',
    label: '文件名(通配，不带路径)',
    width: '100',
  },
  {
    key: 'fileType',
    label: '文件类型(根据文件类型、文件代码可以确定文件)',
    width: '100',
  },
  {
    key: 'commonType',
    label: '文件基础类型: TXT、EXCEL、XML、DBF',
    width: '250',
  },
  {
    key: 'fileVersion',
    label: '文件版本',
    width: '250',
  },
  {
    key: 'fileTemplatePath',
    label: '文件模板路径(通配)',
    width: '250',
  },
  {
    key: 'storageTableType',
    label: '数据源类型，如数据库或缓存',
    width: '250',
  },
  {
    key: 'storageTableDefinition',
    label: '数据源表名',
    width: '250',
  },
  {
    key: 'handleSql',
    label: '执行用SQL',
    width: '250',
  },
  {
    key: 'batchDefinitionId',
    label: '批次定义ID',
    width: '250',
  },
]
module.exports = [
  {
    url: '/tableHeader/file',
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
