import Taro from '@tarojs/taro'

// 确认
export function confirm(title = '请确认', content = '') {
  return new Promise((resolve, reject) => {
    Taro.showModal({
      title,
      content,
      success(res) {
        if (res.confirm) {
          resolve()
        } else {
          reject(res)
        }
      }
    })
  })
}

// 轻提示
export function toast(title, duration = 1500) {
  if (!title) return
  return Promise.all([
    Taro.showToast({
      title,
      icon: 'none',
      duration
    }),
    new Promise(resolve => setTimeout(resolve, duration))
  ])
}

export const loading = {
  show: Taro.showLoading,
  hide: Taro.hideLoading
}
