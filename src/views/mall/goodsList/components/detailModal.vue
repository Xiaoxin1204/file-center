<template>
  <div class="tableModal-container">
    <el-row>
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <el-dialog
          :title="tableDetail.fileName"
          :visible.sync="isVisible"
          width="80%"
          @close="close"
        >
          <el-table :data="tableDetail.fileData">
            <el-table-column
              v-for="(item, index) in tableDetail.tableHeader"
              :key="index"
              :property="item.key"
              :label="item.label"
              :width="item.width"
            ></el-table-column>
          </el-table>
          <el-pagination
            background
            :current-page="queryForm.pageNo"
            :page-size="queryForm.pageSize"
            :layout="layout"
            :total="total"
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
  import { getTableDetail, getHeaderNav } from '@/api/tableDetail'
  import { getFileDetail } from '@/api/getData'
  export default {
    name: 'DetailModal',
    data() {
      return {
        tableDetail: {},
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
        this.getData()
      },
      async getData(params) {
        const res = await getHeaderNav()
        if (res) {
          const tableDetail = res.data
          console.log(res)
        }
        getFileDetail(item.dataSource).then((res) => {
          console.log(res)
        })
      },
      openModal(item) {
        this.isVisible = true
        this.fileData = Object.assign({}, item)
        this.getData(item.id)
      },
      close() {
        this.isVisible = false
      },
    },
  }
</script>

<style scoped></style>
