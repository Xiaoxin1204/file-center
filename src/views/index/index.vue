<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <el-card shadow="never">
          <div slot="header">
            <span>今日导入</span>
          </div>
          <div>
            <div class="batchprocess-init">
              <div style="position: relative">
                <h4>日初始化</h4>
                <i
                  v-if="initData.initStatus === 2"
                  class="status-icon"
                  nzIconfont="icon-success"
                  style="color: #45d29c; font-size: 15px"
                ></i>
                <i
                  v-if="initData.initStatus === 1"
                  class="status-icon loading-icon"
                ></i>
                <div v-if="initData.initStatus === 3" class="show-error">
                  <span>错误</span>
                  <i
                    nzIconfont="icon-sousuo"
                    style="margin-left: 5px; color: #41b8ff; cursor: pointer"
                    @click="dayInitError()"
                  ></i>
                </div>
                <i class="batchprocess-init-step1">1</i>
              </div>
              <p>
                <label>系统日期</label>
                <span>{{ sysDate }}</span>
              </p>
              <div class="init-status">
                <div
                  v-if="initData.initStatus === 0"
                  class="unstart-circle1"
                  style="cursor: pointer"
                  @click="startInit(initData.id)"
                >
                  <div class="unstart-circle2">
                    <span>初始化</span>
                  </div>
                </div>
                <div v-if="initData.initStatus === 1" class="executing-circle">
                  <div class="executing-circle1"></div>
                  <div class="executing-circle2">
                    <div class="executing-circle3"></div>
                    <span>运行中</span>
                  </div>
                </div>
                <div v-if="initData.initStatus === 2" class="finish-circle1">
                  <div class="finish-circle2">
                    <span>完成</span>
                  </div>
                </div>
                <div
                  v-if="initData.initStatus === 3"
                  class="error-circle1"
                  style="cursor: pointer"
                  @click="startInit(initData.id)"
                >
                  <div class="error-circle2">
                    <span>错误</span>
                    <i nzIconfont="icon-lujing1"></i>
                    <span class="reload">重做</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="batchprocess-deal">
              <div style="position: relative">
                <h4>全量导入</h4>
                <i
                  v-if="initData && initData.importStatus === 3"
                  class="status-icon error-icon"
                  iconfont="icon-yichang"
                ></i>
                <i
                  :class="initData.importStatus !== 2 ? 'start-unfinished' : ''"
                  class="batchprocess-init-step2"
                >
                  2
                </i>
              </div>
              <div class="init-status">
                <div v-if="initData.importStatus === 0" class="unstart-circle1">
                  <div
                    :class="initData.importStatus === 3 ? 'can-executing' : ''"
                    class="unstart-circle2"
                    @click="openLayer(initData)"
                  >
                    <span>导入</span>
                  </div>
                </div>
                <div
                  v-if="initData && initData.importStatus === 1"
                  class="executing-circle"
                >
                  <div class="executing-circle1"></div>
                  <div class="executing-circle2">
                    <div class="executing-circle3"></div>
                    <span>运行中</span>
                  </div>
                </div>
                <div
                  v-if="initData.importStatus === 2"
                  class="finish-circle1"
                  style="cursor: default"
                >
                  <div
                    v-if="initData.importStatus === '2'"
                    class="finish-circle2"
                    @click="openLayer()"
                  >
                    <span>完成</span>
                  </div>
                </div>
                <div v-if="initData.importStatus === 3" class="error-circle1">
                  <div class="error-circle2">
                    <span>错误</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="start-auto">
              <div style="position: relative">
                <h4>处理数据</h4>
                <i
                  :class="{
                    'start-unfinished': !initData || initData.dealStatus !== 2,
                  }"
                  class="batchprocess-init-step2"
                >
                  3
                </i>
              </div>
              <div class="init-status">
                <div v-if="openAutoStatus === '0'" class="unstart-circle1">
                  <div
                    :class="
                      initData &&
                      initData.dealStatus === 0 &&
                      initData.importStatus === '2'
                        ? 'can-executing'
                        : ''
                    "
                    class="unstart-circle2"
                    @click="openAuto()"
                  >
                    <span>处理</span>
                  </div>
                </div>
                <div
                  v-if="openAutoStatus === '1' && !complete"
                  class="executing-circle"
                  @click="stopAuto()"
                >
                  <div class="executing-circle1"></div>
                  <div class="executing-circle2">
                    <div class="executing-circle3"></div>
                    <span>运行中</span>
                    <span class="stopAuto">暂停</span>
                  </div>
                </div>
                <div
                  v-if="
                    initData.dealStatus === '2' && initData.dealStatus === '0'
                  "
                  class="error-circle1"
                  style="cursor: pointer"
                  @click="openAuto()"
                >
                  <div class="stop-circle2">
                    <span>已暂停</span>
                    <span class="setAuto">启动</span>
                  </div>
                </div>
                <div v-if="complete" class="finish-circle1">
                  <div class="finish-circle2">
                    <span>完成</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="start-auto">
              <div style="position: relative">
                <h4>批量导出</h4>
                <i
                  :class="{
                    'start-unfinished':
                      !initData || initData.exportStatus !== 0,
                  }"
                  class="batchprocess-init-step2"
                >
                  3
                </i>
              </div>
              <div class="init-status">
                <div
                  v-if="openAutoStatus === '0' && !complete"
                  class="unstart-circle1"
                >
                  <div
                    :class="
                      initData.exportStatus === 0 && initData.dealStatus === 2
                        ? 'can-executing'
                        : ''
                    "
                    class="unstart-circle2"
                    @click="openAuto()"
                  >
                    <span>导出</span>
                  </div>
                </div>
                <div
                  v-if="openAutoStatus === '1' && !complete"
                  class="executing-circle"
                  @click="stopAuto()"
                >
                  <div class="executing-circle1"></div>
                  <div class="executing-circle2">
                    <div class="executing-circle3"></div>
                    <span>运行中</span>
                    <span class="stopAuto">暂停</span>
                  </div>
                </div>
                <div
                  v-if="openAutoStatus === '2' && !complete"
                  class="error-circle1"
                  style="cursor: pointer"
                  @click="openAuto()"
                >
                  <div class="stop-circle2">
                    <span>已暂停</span>
                    <span class="setAuto">启动</span>
                  </div>
                </div>
                <div v-if="complete" class="finish-circle1">
                  <div class="finish-circle2">
                    <span>完成</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-card shadow="never">
              <div slot="header">
                <span>访问量</span>
              </div>
              <vab-chart
                :autoresize="true"
                theme="vab-echarts-theme"
                :options="fwl"
              />
              <div class="bottom">
                <span>
                  日均访问量:

                  <vab-count
                    :start-val="config1.startVal"
                    :end-val="config1.endVal"
                    :duration="config1.duration"
                    :separator="config1.separator"
                    :prefix="config1.prefix"
                    :suffix="config1.suffix"
                    :decimals="config1.decimals"
                  />
                </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-card class="card" shadow="never">
              <div slot="header">
                <span>更新日志</span>
              </div>
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp"
                  :color="activity.color"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts'
  import { dependencies, devDependencies } from '../../../package.json'
  import { getList } from '@/api/changeLog'
  import { getNoticeList } from '@/api/notice'
  import { getRepos, getStargazers } from '@/api/github'
  export default {
    name: 'Index',
    components: {
      VabChart,
    },
    data() {
      return {
        confirmDate: '',
        sysDate: '',
        openAutoStatus: '0',
        initData: {
          initStatus: 1, // 0--未开始  1--进行中  2--完成 3--错误
          importStatus: 0,
          dealStatus: 0,
          exportStatus: 0,
        },
        step: 1,
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        config1: {
          startVal: 0,
          endVal: this.$baseLodash.random(20000, 60000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config2: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config3: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },

        //访问量
        fwl: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '访问量',
              type: 'line',
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },
        //授权数
        sqs: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              /*boundaryGap: false,*/
              data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '授权数',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 20, 33, 39, 33, 22],
            },
          ],
        },
        //词云
        cy: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
          },
          series: [
            {
              type: 'wordCloud',
              gridSize: 15,
              sizeRange: [12, 40],
              rotationRange: [0, 0],
              width: '100%',
              height: '100%',
              textStyle: {
                normal: {
                  color() {
                    const arr = [
                      '#1890FF',
                      '#36CBCB',
                      '#4ECB73',
                      '#FBD437',
                      '#F2637B',
                      '#975FE5',
                    ]
                    let index = Math.floor(Math.random() * arr.length)
                    return arr[index]
                  },
                },
              },
              data: [
                {
                  name: 'vue-admin-beautiful',
                  value: 15000,
                },
                {
                  name: 'element',
                  value: 10081,
                },
                {
                  name: 'beautiful',
                  value: 9386,
                },

                {
                  name: 'vue',
                  value: 6500,
                },
                {
                  name: 'chuzhixin',
                  value: 6000,
                },
                {
                  name: 'good',
                  value: 4500,
                },
                {
                  name: 'success',
                  value: 3800,
                },
                {
                  name: 'never',
                  value: 3000,
                },
                {
                  name: 'boy',
                  value: 2500,
                },
                {
                  name: 'girl',
                  value: 2300,
                },
                {
                  name: 'github',
                  value: 2000,
                },
                {
                  name: 'hbuilder',
                  value: 1900,
                },
                {
                  name: 'dcloud',
                  value: 1800,
                },
                {
                  name: 'china',
                  value: 1700,
                },
                {
                  name: '1204505056',
                  value: 1600,
                },
                {
                  name: '972435319',
                  value: 1500,
                },
                {
                  name: 'young',
                  value: 1200,
                },
                {
                  name: 'old',
                  value: 1100,
                },
                {
                  name: 'vuex',
                  value: 900,
                },
                {
                  name: 'router',
                  value: 800,
                },
                {
                  name: 'money',
                  value: 700,
                },
                {
                  name: 'qingdao',
                  value: 800,
                },
                {
                  name: 'yantai',
                  value: 9000,
                },
                {
                  name: 'author is very cool',
                  value: 9200,
                },
              ],
            },
          ],
        },
        //中国地图
        zgdt: {
          title: {
            text: '2099年全国GDP分布',
            subtext: '数据来自vue-admin-beautiful杜撰',
          },
          tooltip: {
            trigger: 'item',
          },
          dataRange: {
            orient: 'horizontal',
            min: 0,
            max: 55000,
            text: ['高', '低'],
            splitNumber: 0,
          },
          series: [
            {
              name: '2099年全国GDP分布',
              type: 'map',
              roam: false,
              zoom: 1.25,
              mapType: 'china',
              mapLocation: {
                x: 'center',
              },
              selectedMode: 'multiple',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },
              data: [
                { name: '西藏', value: 605.83 },
                { name: '青海', value: 1670.44 },
                { name: '宁夏', value: 2102.21 },
                { name: '海南', value: 2522.66 },
                { name: '甘肃', value: 5020.37 },
                { name: '贵州', value: 5701.84 },
                { name: '新疆', value: 6610.05 },
                { name: '云南', value: 8893.12 },
                { name: '重庆', value: 10011.37 },
                { name: '吉林', value: 10568.83 },
                { name: '山西', value: 11237.55 },
                { name: '天津', value: 11307.28 },
                { name: '江西', value: 11702.82 },
                { name: '广西', value: 11720.87 },
                { name: '陕西', value: 12512.3 },
                { name: '黑龙江', value: 12582 },
                { name: '内蒙古', value: 14359.88 },
                { name: '安徽', value: 15300.65 },
                { name: '北京', value: 16251.93 },
                { name: '福建', value: 17560.18 },
                { name: '上海', value: 19195.69 },
                { name: '湖北', value: 19632.26 },
                { name: '湖南', value: 19669.56 },
                { name: '四川', value: 21026.68 },
                { name: '辽宁', value: 22226.7 },
                { name: '河北', value: 24515.76 },
                { name: '河南', value: 26931.03 },
                { name: '浙江', value: 32318.85 },
                { name: '山东', value: 45361.85, selected: true },
                { name: '江苏', value: 49110.27 },
                { name: '广东', value: 53210.28 },
              ],
            },
          ],
        },

        //更新日志
        reverse: true,
        activities: [],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,
      }
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {
      let today = new Date()
      const month = today.getMonth() + 1
      const day = today.getDate() + 1
      this.sysDate = today.getFullYear() + '-' + month + '-' + day
      let base = +new Date(2020, 1, 1)
      let oneDay = 24 * 3600 * 1000
      let date = []

      let data = [Math.random() * 1500]
      let now = new Date(base)

      const addData = (shift) => {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        date.push(now)
        data.push(this.$baseLodash.random(20000, 60000))

        if (shift) {
          date.shift()
          data.shift()
        }

        now = new Date(+new Date(now) + oneDay)
      }

      for (let i = 1; i < 6; i++) {
        addData()
      }
      addData(true)
      this.fwl.xAxis[0].data = date
      this.fwl.series[0].data = data
      this.timer = setInterval(() => {
        addData(true)
        this.fwl.xAxis[0].data = date
        this.fwl.series[0].data = data
      }, 3000)
    },
    methods: {
      startInit() {},
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
      async fetchData() {
        const { data } = await getList()
        data.map((item, index) => {
          if (index === data.length - 1) {
            item.color = '#0bbd87'
          }
        })
        this.activities = data
        const res = await getNoticeList()
        this.noticeList = res.data
        /* getRepos({
        token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
      }).then((res) => {
        const per_page = Math.ceil(res.data.stargazers_count / 100);
        alert(per_page);
        getStargazers({
          token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
          page: 1,
          per_page: res.per_page,
        }).then((res) => {
          alert(JSON.stringify(res));
        });
      }); */
      },
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    .step-bar {
      height: 400px;
    }
    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }

      .el-card__body {
        .echarts {
          width: 100%;
          height: 115px;
        }
      }
    }

    .card {
      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 305px;
          }
        }
      }
    }

    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }

    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        min-height: 20px;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }

    .icon-panel {
      height: 117px;
      text-align: center;
      cursor: pointer;

      svg {
        font-size: 40px;
      }

      p {
        margin-top: 10px;
      }
    }

    .bottom-btn {
      button {
        margin: 5px 10px 15px 0;
      }
    }

    .batchprocess-init {
      margin-top: 20px;
      border-left: 1.5px solid #bdbdbd;
      padding-left: 14px;
      padding-bottom: 27px;
    }
    .batchprocess-init > div h4,
    .batchprocess-deal h4,
    .start-auto h4 {
      margin-bottom: 10px;
      position: relative;
      top: -3px;
    }
    .start-auto h4 {
      margin-bottom: 0;
    }
    .batchprocess-init p {
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .batchprocess-init p label {
      margin-right: 8px;
    }
    .batchprocess-init .status-icon {
      top: -2px;
    }
    .init-status {
      text-align: center;
      margin-top: 14px;
      position: relative;
      right: 6px;
    }
    .init-status .executing-circle2 {
      left: 6px;
    }
    .error-circle1 {
      cursor: pointer;
    }
    .batchprocess-init .error-circle1:hover .error-circle2 {
      background: linear-gradient(340.82deg, #f5a623 0.61%, #fae2bf 109.27%);
      position: relative;
    }
    .batchprocess-init .error-circle1:hover .error-circle2 span {
      display: none;
    }
    .batchprocess-init .error-circle1:hover .error-circle2 span.reload {
      display: inline-block;
      height: 14px;
      line-height: 14px;
      position: relative;
      top: 5px;
      font-size: 10px;
    }
    .error-circle1:hover .error-circle2 i {
      display: inline-block;
      position: absolute;
      left: 17px;
      top: 8px;
    }
    .batchprocess-deal .init-status,
    .start-auto .init-status {
      margin-top: 24px;
    }
    .init-status .error-circle2 {
      background: linear-gradient(343.48deg, #f07641 -16.56%, #f1ae5f 121.7%);
    }
    .init-status .stop-circle2 {
      background: linear-gradient(343.48deg, #f04141 -16.56%, #f15f5f 121.7%);
      cursor: pointer;
    }
    .batchprocess-init .unstart-circle2 {
      background: linear-gradient(343.48deg, #02a0ff -16.56%, #02fff0 121.7%);
      border: 0.5px solid #63d5fa;
      box-sizing: border-box;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
    }
    .batchprocess-deal .status-icon {
      top: 0;
      font-size: 15px;
      color: #fa541c;
      background: none;
    }
    .batchprocess-init .start-icon {
      display: inline-block;
      cursor: pointer;
      color: #1890ff;
      font-size: 16px;
    }
    .batchprocess-init-step1,
    .batchprocess-init-step2 {
      background: url('../../assets/home_circle/Group 1828bz.png') no-repeat 2px;
      display: inline-block;
      width: 18px;
      height: 18px;
      position: absolute;
      left: -23px;
      top: -3px;
      background-size: contain;
      color: #ffffff;
      text-align: center;
      line-height: 18px;
      font-size: 10px;
    }
    .fund-btn {
      display: inline-block;
      padding-left: 9px;
      height: 20px;
      line-height: 20px;
      color: #02a0ff;
      margin-bottom: 33px;
    }
    .batchprocess-deal .start-unfinished,
    .start-auto .start-unfinished {
      background: url('../../assets/home_circle/Group 1831bz.png') no-repeat 2px;
      background-size: contain;
    }
    .batchprocess-deal {
      border-left: 1.5px solid #bdbdbd;
      padding-left: 14px;
      padding-bottom: 23px;
    }
    .batchprocess-deal .can-executing,
    .start-auto .can-executing {
      background: linear-gradient(343.48deg, #02a0ff -16.56%, #02fff0 121.7%);
      cursor: pointer;
    }
    .start-auto {
      padding-left: 14px;
      text-align: center;
    }

    .start-auto {
      border-left: 1.5px solid #bdbdbd;
      padding-left: 14px;
      padding-bottom: 23px;
    }
    .start-auto h4 {
      text-align: left;
    }
    .start-auto .executing-circle {
      cursor: pointer;
    }
    .start-auto .executing-circle:hover .executing-circle1 {
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(243, 243, 243, 0) 0%,
        #f1f1f1 100%
      );
      animation: none;
    }
    .start-auto .executing-circle:hover .executing-circle2 {
      background: linear-gradient(343.48deg, #f04141 -16.56%, #f15f5f 121.7%);
      border: 0.5px solid #ffffff;
    }
    .start-auto .executing-circle:hover .executing-circle3 {
      display: none;
    }
    .executing-status {
      text-align: center;
      padding-top: 25px;
    }
    .start-auto .executing-circle:hover span,
    .start-auto .error-circle1:hover span {
      display: none;
    }
    .start-auto .executing-circle:hover span.stopAuto,
    .start-auto .error-circle1:hover span.setAuto {
      display: inline-block;
    }
    .start-auto .error-circle1:hover .stop-circle2 {
      background: linear-gradient(343.48deg, #02a0ff -16.56%, #02fff0 121.7%);
      border: 0.5px solid #63d5fa;
    }
    .unstart-circle1,
    .finish-circle1,
    .executing-circle1,
    .error-circle1 {
      display: inline-block;
      width: 58px;
      height: 58px;
      line-height: 58px;
      border-radius: 58px;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(243, 243, 243, 0) 0%,
        #f1f1f1 100%
      );
    }
    .executing-circle {
      position: relative;
      display: inline-block;
    }
    .executing-circle1 {
      background: url('../../assets/home_circle/Frame 2.png') no-repeat;
      background-size: contain;
      animation: circle 1s linear infinite;
    }
    .start-auto .init-status .executing-circle2 {
      left: 6px;
    }
    .stopAuto,
    .setAuto {
      display: none;
    }
    @-webkit-keyframes circle {
      from {
        -webkit-transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    .executing-status a {
      display: block;
      background: #2196f3;
      border-radius: 3px;
      height: 31px;
      text-align: center;
      line-height: 31px;
      color: #ffffff;
      margin-top: 20px;
    }
    .unstart-circle2,
    .finish-circle2,
    .executing-circle2,
    .error-circle2,
    .stop-circle2 {
      display: inline-block;
      width: 44px;
      height: 44px;
      border-radius: 44px;
      background: linear-gradient(340.26deg, #bbbdbe -14.67%, #e6e6e6 108.99%);
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
      line-height: 44px;
      text-align: center;
      color: #f8f8f8;
      font-size: 11px;
    }
    .executing-circle2 {
      position: absolute;
      top: 7px;
      left: 46px;
      background: linear-gradient(343.48deg, #02a0ff -16.56%, #02fff0 121.7%);
      border: 0.5px solid #63d5fa;
      box-sizing: border-box;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
    }
    .executing-circle3 {
      position: absolute;
      width: 52px;
      height: 52px;
      border-radius: 44px;
      background: url('../../assets/home_circle/Frame 2.2.png');
      left: -7px;
      background-size: contain;
      top: -3px;
      animation: circle2 2s linear infinite;
    }
    @-webkit-keyframes circle2 {
      0% {
        -webkit-transform: rotate(0deg);
      }
      50% {
        -webkit-transform: rotate(90deg);
      }
      100% {
        -webkit-transform: rotate(0deg);
      }
    }
    .finish-circle2 {
      background: linear-gradient(343.48deg, #4ac74d -16.56%, #5ff163 121.7%);
      border: 0.5px solid #ffffff;
      box-sizing: border-box;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    }
    .error-circle2 > i {
      display: none;
    }
    .error-circle2 .reload {
      display: none;
    }
  }
</style>
