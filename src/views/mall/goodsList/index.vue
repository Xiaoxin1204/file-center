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
              <el-card shadow="hover" @click.native="openClick(item, obj)">
                <div slot="header">
                  <span>{{ item.fileName }}</span>
                </div>
                <div style="width: 100%; height: 200px">
                  <vab-image
                    :big-src="item.img"
                    :percent="item.status === '2' ? 100 : item.percent"
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
    <detailModal
      ref="detail"
      :data-source="dataSource"
      :file-name="fileName"
    ></detailModal>
    <el-dialog title="提示" :visible.sync="confirmVisible" width="30%">
      <span>
        是否执行该
        <span v-if="executeType === 'I'">导入</span>
        <span v-if="executeType === 'O'">导出</span>
        项?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import VabImage from '@/components/VabImage'
  import DetailModal from './components/detailModal'
  import { getBatchData, getFileDetail, doExecute } from '@/api/getData'
  const { handleRandomImage } = require('../../../utils')

  export default {
    name: 'Goods',
    components: {
      VabImage,
      DetailModal,
    },
    data() {
      return {
        currentData: {},
        confirmVisible: false,
        executeType: '',
        dataSource: '',
        activeName: '',
        fileName: '',
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
      openClick(item, obj) {
        this.executeType = obj.exchangeFlag
        this.dataSource = item.dataSource
        this.fileName = item.fileName
        if (item.status === '2' && obj.exchangeFlag === 'I') {
          getFileDetail(item.dataSource).then((res) => {
            console.log(res)
          })
          if (item) {
            this.$refs['detail'].openModal(item)
          } else {
            this.$refs['detail'].openModal()
          }
        } else if (item.status === '0') {
          console.log('111')
          this.confirmVisible = true
          this.currentData = item
        }
      },
      confirmClick() {
        const data = {
          sysDate: '20200413',
          idList: this.currentData.id,
        }
        doExecute(data).then((res) => {
          if (res.data) {
            this.confirmVisible = false
            for (let i = 0; i < this.listData.length; i++) {
              const fileList = this.listData[i].fileList
              for (let j = 0; j < fileList.length; j++) {
                if (fileList[j].id === this.currentData.id) {
                  let interval = setInterval(() => {
                    fileList[j].percent += 10
                    if (fileList[j].percent === 100) {
                      fileList[j].status = '2'
                      clearInterval(interval)
                    }
                  }, 100)
                }
              }
            }
          }
        })
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
          for (let i = 0; i < this.listData.length; i++) {
            const fileList = this.listData[i].fileList
            for (let j = 0; j < fileList.length; j++) {
              fileList[j].img = handleRandomImage(200, 200)
              fileList[j].smallImg = handleRandomImage(40, 40)

              if (fileList[j].status === '2') {
                fileList[j].percent = 100
              }
            }
          }
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
