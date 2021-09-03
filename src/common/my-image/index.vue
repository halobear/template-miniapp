<template>
  <view class="my-image" :style="{ paddingTop: `${computedPadding}%` }">
    <image :src="src" mode="widthFix" />
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    width: {
      type: [String, Number],
      default: ""
    },
    height: {
      type: [String, Number],
      default: ""
    }
  },
  computed: {
    computedPadding() {
      return (this.height / this.width) * 100;
    }
  }
};
</script>

<style lang="less">
.my-image {
  position: relative;
  image {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
  }
}
</style>
