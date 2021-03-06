<template>
  <div class="roleManagement-container">
    <el-divider content-position="left"></el-divider>
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.permission"
              placeholder="请输入查询条件"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table :data="tableData" height="400">
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :property="item.key"
        :label="item.label"
        :width="item.width"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="totalPage"
      :page-size="size"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/roleManagement'
  import Edit from './components/batchManagementEdit'
  import { getBatchTableData, getFileDetail } from '@/api/getData'
  import { getTableHeader } from '@/api/tableDetail'

  export default {
    name: 'BatchManagement',
    components: { Edit },
    data() {
      return {
        tableHeader: [],
        tableDetail: [],
        tableData: [],
        list: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        size: 0,
        total: 0,
        totalPage: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          permission: '',
        },
      }
    },
    created() {
      this.fetchData()
      this.getData()
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
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
        this.fetchData()
      },
      async getData() {
        const res = await getTableHeader('batch')
        if (res) {
          this.tableHeader = res.data
        }
        getBatchTableData().then((data) => {
          if (data) {
            this.tableDetail = data.data
            this.tableData = this.tableDetail.items
            this.total = this.tableDetail.total
            this.size = this.tableDetail.size
            this.totalPage = this.tableDetail.totalPage
          }
        })
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>
