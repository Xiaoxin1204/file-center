<template>
  <div class="goods-list-container">
    <div>
      <div class="card-container">
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in list"
            :key="index"
            :xs="24"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="4"
          >
            <el-card shadow="hover">
              <div slot="header">
                <span>{{ item.title }}</span>
              </div>
              <div style="width: 100%; height: 200px">
                <vab-image
                  :big-src="item.img"
                  :percent="item.percent"
                  :small-src="item.smallImg"
                  :file-type="item.fileType"
                  @clickBig="bigClick(item)"
                  @clickSmall="smallClick(item)"
                  @showData="showData(item)"
                ></vab-image>
              </div>
              <el-progress
                :text-inside="true"
                :stroke-width="8"
                :percentage="70"
                :show-text="false"
              ></el-progress>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
  // import { getList } from '@/api/goodsList'
  import Card from '../../vab/card/index'
  import { getList } from '@/api/table'
  import VabImage from '@/components/VabImage'

  export default {
    name: 'Goods',
    components: {
      VabImage,
    },
    data() {
      return {
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        list: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        elementLoadingText: '正在加载...',

        value: true,
        currentDate: new Date(),
        // list: null,
        // listLoading: true,
        pageNo: 1,
        pageSize: 10,
        // layout: 'total, sizes, prev, pager, next, jumper',
        // total: 0,
        background: true,
        height: 0,
        // elementLoadingText: '正在加载...',
        dialogFormVisible: false,
      }
    },
    created() {
      this.fetchData()
      this.height = this.$baseTableHeight(1)
    },
    methods: {
      bigClick(val) {
        console.log('11')
        this.$baseAlert('点击了大图')
      },
      smallClick(val) {
        this.$baseAlert('点击了小图')
      },
      showData(val) {
        this.$baseAlert('123')
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
