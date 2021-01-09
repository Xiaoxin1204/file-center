<template>
  <div class="vab-image__outter">
    <el-image
      :src="bigSrc"
      fit="cover"
      style="width: 100%; height: 100%"
      @click="clickBig"
    ></el-image>
    <el-image
      :src="smallSrc"
      class="vab-image__outter__small"
      fit="cover"
      @click="clickSmall"
    ></el-image>
    <div class="vab-image__outter__percent">
      <span
        v-if="fileStatus === '0' && batchFlag === 'I'"
        class="vab-image__outter__text vab-image__outter__deal cursor-pointer"
      >
        可导入
      </span>
      <span
        v-if="fileStatus === '2' && batchFlag === 'I'"
        class="vab-image__outter__text vab-image__outter__done cursor-pointer"
      >
        已导入
      </span>
      <span
        v-if="fileStatus === '0' && batchFlag === 'O'"
        class="vab-image__outter__text vab-image__outter__deal cursor-pointer"
      >
        可导出
      </span>
      <span
        v-if="fileStatus === '2' && batchFlag === 'O'"
        class="vab-image__outter__text vab-image__outter__done cursor-pointer"
      >
        已导出
      </span>
      <span
        class="vab-image__outter__text vab-image__outter__type cursor-pointer"
      >
        {{ fileType }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VabImage',
    components: {},
    props: {
      bigSrc: {
        type: String,
        default: '',
      },
      smallSrc: {
        type: String,
        default: '',
      },
      percent: {
        type: Number,
        default: 97,
      },
      batchFlag: {
        type: String,
        default: 'I',
      },
      fileStatus: {
        type: String,
        default: '0',
      },
      fileType: {
        type: String,
        default: '',
      },
    },
    data() {
      return {}
    },
    created() {},
    mounted() {},
    methods: {
      clickBig() {
        this.$emit('click-big')
      },
      clickSmall() {
        this.$emit('click-small')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vab-image {
    &__label {
      position: absolute;
    }
    &__outter {
      position: relative;
      width: 100%;
      height: 100%;

      ::v-deep {
        img {
          border-radius: $base-border-radius;
        }
      }

      &__small {
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 100px;
        border-bottom: 1px solid $base-color-white;
        border-left: 1px solid $base-color-white;
        border-radius: $base-border-radius;
      }

      &__percent {
        color: $base-color-white;
        text-align: center;
        margin-top: 10px;
      }

      &__text {
        padding: 7px 10px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        border-radius: $base-border-radius;
        margin-right: 10px;
      }
      &__deal {
        background-color: #1890ff;
      }
      &__done {
        background-color: #f5a623;
      }
      &__type {
        background-color: #66ccaa;
      }
    }
  }
</style>
