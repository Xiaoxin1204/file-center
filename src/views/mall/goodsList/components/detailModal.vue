<template>
  <div class="tableModal-container">
    <el-row>
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <el-dialog
          :title="fileName"
          :visible.sync="isVisible"
          width="80%"
          @close="close"
        >
          <el-table :data="tableData" height="350px">
            <el-table-column
              v-for="(item, index) in tableHeader"
              :key="index"
              :property="item.key"
              :label="item.label"
              :width="item.width"
            ></el-table-column>
          </el-table>
          <el-pagination
            background
            :current-page="tableDetail.totalPage"
            :page-size="tableDetail.size"
            :layout="layout"
            :total="tableDetail.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getTableDetail, getTableHeader } from '@/api/tableDetail'
  import { getFileDetail } from '@/api/getData'
  export default {
    name: 'DetailModal',
    props: {
      dataSource: {
        type: String,
        default: '',
      },
      fileName: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        tableHeader: [],
        tableData: [],
        fileData: {}, // 选中的文件的数据
        isVisible: false,
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          permission: '',
        },
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
      }
    },
    created() {
      // this.getData()
    },
    methods: {
      submit() {
        // 点击确定
        this.isVisible = false
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNo = 1
        // this.getData()
      },
      async getData(data) {
        const res = await getTableHeader(data)
        if (res) {
          this.tableHeader = res.data
        }
        getFileDetail(this.dataSource).then((data) => {
          if (data) {
            this.pageData = data.page
            this.tableDetail = data.data
            this.tableData = this.tableDetail.items
          }
        })
      },
      openModal(item) {
        this.isVisible = true
        this.fileData = Object.assign({}, item)
        // switch (this.dataSource) {
        //   case 'nav':
        //     break;
        //     case 'account_request':
        //       break;
        //
        //   data = 'nav'
        // } else if (t)
        this.getData(item.dataSource)
      },
      close() {
        this.isVisible = false
      },
    },
  }
</script>

<style scoped></style>
