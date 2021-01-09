<template>
  <div class="goods-list-container">
    <el-collapse v-model="activeName" style="position: relative" accordion>
      <el-collapse-item
        v-for="(obj, i) in listData"
        :key="i"
        :title="obj.batchName"
        :name="obj.batchCode"
      >
        <el-button
          type="primary"
          style="position: absolute; right: 40px; top: 9px"
          @click="handleBatchImport"
        >
          批次导入
        </el-button>
        <div class="card-container">
          <el-row :gutter="20">
            <el-col
              v-for="(item, index) in obj.fileList"
              :key="index"
              :xs="24"
              :sm="8"
              :md="8"
              :lg="8"
              :xl="4"
            >
              <el-card shadow="hover" @click.native="openClick(item)">
                <div slot="header">
                  <span>{{ item.fileName }}</span>
                </div>
                <div style="width: 100%; height: 200px">
                  <vab-image
                    :big-src="item.img"
                    :percent="item.percent"
                    :small-src="item.smallImg"
                    :file-type="item.fileType"
                    :file-status="item.status"
                    :batch-flag="obj.exchangeFlag"
                  ></vab-image>
                </div>
                <el-progress
                  :stroke-width="8"
                  :percentage="item.percent"
                  :show-text="false"
                ></el-progress>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
    <detailModal ref="detail"></detailModal>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import VabImage from '@/components/VabImage'
  import DetailModal from './components/detailModal'
  import { getBatchData, getFileDetail } from '@/api/getData'

  export default {
    name: 'Goods',
    components: {
      VabImage,
      DetailModal,
    },
    data() {
      return {
        activeName: '',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        list: null,
        listData: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        elementLoadingText: '正在加载...',
        value: true,
        currentDate: new Date(),
        pageNo: 1,
        pageSize: 10,
        background: true,
        height: 0,
        dialogFormVisible: false,
      }
    },
    created() {
      this.fetchData()
      this.height = this.$baseTableHeight(1)
    },
    methods: {
      handleBatchImport() {
        console.log('123')
      },
      openClick(item) {
        getFileDetail(item.dataSource).then((res) => {
          console.log(res)
        })
        if (item) {
          this.$refs['detail'].openModal(item)
        } else {
          this.$refs['detail'].openModal()
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
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        getBatchData().then((res) => {
          this.listData = res.data
          this.activeName = this.listData[0].batchCode
        })
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        this.total = totalCount
      },
    },
  }
</script>
<style lang="scss" scoped>
  .goods-list-container {
    ::v-deep {
      .el-card__header {
        text-align: center;
      }
      .el-card__body {
        padding: 15px 20px 40px;
      }
    }
    .goods-list-card-body {
      position: relative;
      text-align: center;
      cursor: pointer;

      .goods-list-tag-group {
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 9;
      }

      .goods-list-image-group {
        height: 400px;
        overflow: hidden;

        .goods-list-image {
          width: 100%;
          height: 400px;
          transition: all ease-in-out 0.3s;

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .goods-list-title {
        margin: 8px 0;
        font-size: 16px;
        font-weight: bold;
      }

      .goods-list-description {
        font-size: 14px;
        color: #808695;
      }

      .goods-list-price {
        margin: 8px 0;
        font-size: 14px;
        color: $base-color-orange;

        s {
          color: #c5c8ce;
        }
      }
    }
  }
</style>
