<template>
  <view class="logo-wrap center-flex">
    <image class="my-logo" :src="src" />
    <view class="logo-text">logo</view>
  </view>
</template>

<script>
export default {
  computed: {
    src() {
      return 'https://img1.halobear.com/upload_page/Fh07LeB8uoa-h5ARDMQWzUX3GOd3.png'
    },
  },
}
</script>

<style lang="less">
.logo-wrap {
  margin-bottom: 60px;
  text-align: center;
  .my-logo {
    width: 44px;
    height: 44px;
  }
  .logo-text {
    margin-left: 12px;
    font-size: 20px;
    color: #939ca8;
    line-height: 28px;
  }
}
</style>
