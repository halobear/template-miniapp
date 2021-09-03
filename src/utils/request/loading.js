import Taro from "@tarojs/taro";

export default {
  num: 0,
  show() {
    this.num += 1;
    if (this.num === 1) {
      Taro.showLoading({ title: "加载中" });
    }
  },
  hide(force = false) {
    if (force) {
      this.num = 0;
      Taro.hideLoading();
      return;
    }
    // 等待发出去的请求返回结果后结束loading
    if (this.num > 0) this.num -= 1;
    if (this.num === 0) {
      Taro.hideLoading();
    }
  }
};
