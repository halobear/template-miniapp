import md5 from 'blueimp-md5'
import { sha256 } from 'js-sha256'
import { apiKey } from '@/constants/config'

export default (params = {}) => {
  if (!apiKey) return ''
  const keys = Object.keys(params).sort()
  const sign = keys
    .reduce((collect, key) => {
      let item = params[key]
      if (['number', 'string'].includes(typeof item)) {
        item = (item + '').trim()
      }
      collect.push(item)
      return collect
    }, [])
    .join('')
  return sha256(`${md5(rawurlencode(sign))}${apiKey}`)
}

function rawurlencode(str = "") {
  const replaceList = [
    { reg: /\!/g, value: "%21" },
    { reg: /\*/g, value: "%2A" },
    { reg: /\(/g, value: "%28" },
    { reg: /\)/g, value: "%29" },
    { reg: /\'/g, value: "%21" }
  ]
  let resStr = encodeURIComponent(str)
  replaceList.forEach(({ reg, value }) => {
    resStr = resStr.replace(reg, value)
  })
  return resStr
}
