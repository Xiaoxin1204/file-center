<template>
  <div class="menuManagement-container">
    <vab-query-form>
      <vab-query-form-top-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-plus" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      :element-loading-text="elementLoadingText"
      height="350px"
    >
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

    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { getRouterList as getList } from '@/api/router'
  import { getTree, doDelete } from '@/api/menuManagement'
  import Edit from './components/MenuManagementEdit'
  import { getTableHeader } from '@/api/tableDetail'
  import { getWildTableData } from '@/api/getData'

  export default {
    name: 'WildcardManagement',
    components: { Edit },
    data() {
      return {
        data: [],
        tableHeader: [],
        tableDetail: [],
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        list: [],
        listLoading: true,
        elementLoadingText: '正在加载...',
      }
    },
    async created() {
      const roleData = await getTree()
      this.data = roleData.data
      this.fetchData()
      this.getData()
    },
    methods: {
      handleEdit(row) {
        if (row.path) {
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
      async getData() {
        const res = await getTableHeader('wild')
        if (res) {
          this.tableHeader = res.data
        }
        getWildTableData().then((data) => {
          if (data) {
            this.tableDetail = data.data
            this.tableData = this.tableDetail.items
          }
        })
      },
      async fetchData() {
        this.listLoading = true

        const { data } = await getList()
        this.list = data
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
      handleNodeClick(data) {
        this.fetchData()
      },
    },
  }
</script>
