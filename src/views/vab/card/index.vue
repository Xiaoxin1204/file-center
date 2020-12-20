<template>
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
</template>

<script>
  import { getList } from '@/api/table'
  import VabImage from '@/components/VabImage'

  export default {
    name: 'Card',
    components: {
      VabImage,
    },
    data() {
      return {
        value: true,
        currentDate: new Date(),
        list: null,
        listLoading: true,
        pageNo: 1,
        pageSize: 10,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        height: 0,
        elementLoadingText: '正在加载...',
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
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        this.list = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-card__header {
      text-align: center;
    }
    .el-card__body {
      padding: 15px 20px 40px;
    }
  }
</style>
