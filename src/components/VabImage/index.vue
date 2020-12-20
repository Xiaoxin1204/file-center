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
      <span class="vab-image__outter__text" @click="showData">
        {{ percent }}%
      </span>
      <span class="vab-image__outter__text cursor-pointer">导入</span>
      <span class="vab-image__outter__text cursor-pointer">TXT</span>
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
      fileType: {
        type: String,
        default: 'excel',
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
      showData() {
        this.$emit('show-data')
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
        background-color: #1890ff;
        border-radius: $base-border-radius;
        margin-right: 10px;
      }
    }
  }
</style>
