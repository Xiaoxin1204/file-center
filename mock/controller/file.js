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
    width: '150',
  },
  {
    key: 'fileDescription',
    label: '文件描述(通配)',
    width: '250',
  },
  {
    key: 'fileName',
    label: '文件名(通配，不带路径)',
    width: '400',
  },
  {
    key: 'fileType',
    label: '文件类型',
    width: '100',
  },
  {
    key: 'commonType',
    label: '文件基础类型',
    width: '100',
  },
  {
    key: 'fileVersion',
    label: '文件版本',
    width: '100',
  },
  {
    key: 'fileTemplatePath',
    label: '文件模板路径(通配)',
    width: '350',
  },
  {
    key: 'storageTableType',
    label: '数据源类型，如数据库或缓存',
    width: '350',
  },
  {
    key: 'storageTableDefinition',
    label: '数据源表名',
    width: '200',
  },
  {
    key: 'handleSql',
    label: '执行用SQL',
    width: '600',
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
