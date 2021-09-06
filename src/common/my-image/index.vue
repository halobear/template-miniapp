<template>
  <view class="my-image">
    <image :src="src" :class="{ loaded }" :mode="mode" @load="onLoad" />
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'aspectFill',
    },
  },
  data() {
    return {
      loaded: false,
    }
  },
  computed: {},
  methods: {
    onLoad() {
      this.loaded = true
    },
  },
}
</script>

<style lang="less">
.my-image {
  position: relative;
  width: 100%;
  height: 100%;
  image {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    opacity: 0;
    &.loaded {
      opacity: 1;
      transition: opacity 0.18s;
    }
  }
}
</style>
