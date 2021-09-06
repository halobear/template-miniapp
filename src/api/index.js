import request from '@/utils/request'

export function home() {
  return request({
    url: ``,
  })
}

export function get(param) {
  return request({
    url: ``,
    param
  })
}


export function post(data) {
  return request({
    url: ``,
    method: 'POST',
    data
  })
}

