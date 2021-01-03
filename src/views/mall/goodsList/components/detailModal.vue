<template>
  <el-dialog
    :title="tableDetail.fileName"
    :visible.sync="isVisible"
    width="900px"
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getTableDetail } from '@/api/tableDetail'
  export default {
    name: 'DetailModal',
    data() {
      return {
        tableDetail: {},
        tableData: [],
        fileData: {}, // 选中的文件的数据
        isVisible: false,
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
      async getData(params) {
        const res = await getTableDetail()
        if (res) {
          this.tableDetail = res.data
          console.log(res)
        }
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
