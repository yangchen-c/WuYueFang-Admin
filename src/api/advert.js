import request from '@/utils/request'

// 广告管理
export function advertList(params) {
  return request({
    url: 'adver/byPage',
    method: 'get',
    params
  })
}

export function advertAdd(data) {
  return request({
    url: 'advertisement',
    method: 'post',
    data
  })
}

export function advertUpdate(data) {
  return request({
    url: 'advertisement',
    method: 'put',
    data
  })
}

export function advertDelete(params) {
  return request({
    url: 'advertisement',
    method: 'delete',
    params
  })
}
