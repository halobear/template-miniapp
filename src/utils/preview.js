import Taro from '@tarojs/taro'

export const preview = (list, current) => {
  Taro.previewImage({
    current: current,
    urls: [...list]
  })
}