import request from '@/utils/request'

export function home() {
  return request({
    url: `/api/app-travel-image/v1/home`,
  })
}

// 图片列表
export function images(params) {
  return request({
    url: `/api/app-crm-api/licheng/v1/customer/images`,
    params,
  })
}

// 提交审核
export function submit({ id, md5 }) {
  return request({
    url: `/api/app-crm-api/licheng/v1/customer/images`,
    method: 'post',
    data: { id, md5 },
  })
}
