import Taro from '@tarojs/taro'

let systemInfo

export const copy = (data) => {
  Taro.setClipboardData({ data })
}

export function rpx2px(size) {
  const screenWidth = getWinWidth()
  return (size * screenWidth) / 750
}

export function getWinWidth() {
  const { screenWidth = 750 } = getSystemInfo()
  return screenWidth
}

export function getWinHeight() {
  const { windowHeight = 1000 } = getSystemInfo()
  return windowHeight
}

// custom 获取距离头部高度
export function getCustomHeight() {
  const cachet = Taro.getMenuButtonBoundingClientRect()
  return cachet.top + cachet.height + 5
}

export function getSystemInfo() {
  if (systemInfo) return systemInfo
  systemInfo = Taro.getSystemInfoSync()
  return systemInfo
}

// 判断是否是iphoneX
export function isPhoneX() {
  const { model } = Taro.getSystemInfoSync()
  const brandList = ["iPhone X", "iPhone 10", "iPhone11", "iPhone12", "iPhone13"]
  return brandList.some(it => model.includes(it))
}
// 返回iphone距离底部高度
export function isPhoneXBottom() {
  return isPhoneX() ? Taro.pxTransform(30) : 0
}

export function copy(content, title = "复制成功") {
  Taro.setClipboardData({
    data: content,
    complete: () => {
      toast({
        title
      })
    },
  })
}