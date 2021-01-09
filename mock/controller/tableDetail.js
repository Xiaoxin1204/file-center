const data = {
  id: '000001',
  fileName: '份额明细',
  fileType: 'excel',
  fileData: [
    {
      importDate: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      sex: '男',
      abc: 'we',
      age: '24',
      phone: '13456543234',
      installDate: '2020-12-24',
      bb: 'qq',
    },
    {
      importDate: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      sex: '男',
      abc: 'we',
      age: '24',
      phone: '13456543234',
      installDate: '2020-12-24',
    },
    {
      importDate: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      sex: '男',
      abc: 'we',
      age: '24',
      phone: '13456543234',
      installDate: '2020-12-24',
    },
    {
      importDate: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      sex: '男',
      abc: 'we',
      age: '24',
      phone: '13456543234',
      installDate: '2020-12-24',
    },
    {
      importDate: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      sex: '男',
      abc: 'we',
      age: '24',
      phone: '13456543234',
      installDate: '2020-12-24',
    },
  ],
  tableHeader: [
    {
      key: 'name',
      label: '姓名',
      width: '150',
    },
    {
      key: 'importDate',
      label: '导入时间',
      width: '150',
    },
    {
      key: 'address',
      label: '地址',
      width: '250',
    },
    {
      key: 'sex',
      label: '性别',
      width: '100',
    },
    {
      key: 'age',
      label: '年龄',
      width: '100',
    },
    {
      key: 'phone',
      label: '联系电话',
      width: '250',
    },
    {
      key: 'installDate',
      label: '注册时间',
      width: '250',
    },
  ],
}
module.exports = [
  {
    url: '/tableDetail/getTableDetail',
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
