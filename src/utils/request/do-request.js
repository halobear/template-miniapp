import Taro from '@tarojs/taro'
import qs from '@halobear/utils/qs'

import { apiUrl, haloApp } from '@/constants/config' // 配置文件
import authority from '../authority'
import encrypt from './encrypt' // 加密对接

export default ({
  baseUrl = apiUrl,
  url,
  data = {},
  params = {},
  method = 'get',
  header: defaultHeader = {}
}) => {
  // console.log(url)
  const now = ~~(new Date().getTime() / 1000)
  const header = {
    'content-type': 'application/json',
    'X-Halo-App': haloApp,
    'X-Http-Request-Halo-Time': now,
    'X-Http-Request-Halo-Sign': encrypt({ ...params, ...data, time: now }),
    ...defaultHeader
  }

  const { token } = authority.get() || {}
  if (token) header.Authorization = `Bearer ${token}`

  return new Promise(async (resolve, reject) => {
    let search = qs.stringify(params)
    const finalUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
    const options = {
      url: finalUrl + (search ? `?${search}` : search),
      data,
      method: method.toUpperCase(),
      header
    }
    Taro.request({
      ...options,
      success(result) {
        const { iRet, data: res, info } = result.data
        if (iRet !== 1) {
          const e = new Error(info)
          e.response = result
          e.statusCode = result.statusCode
          e.info = info
          reject(e)
        } else {
          resolve(res)
        }
      },
      fail(e) {
        reject(e)
      }
    })
  })
}
