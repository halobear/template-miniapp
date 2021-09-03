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


export function getSystemInfo() {
  if (systemInfo) return systemInfo
  systemInfo = Taro.getSystemInfoSync()
  return systemInfo
}