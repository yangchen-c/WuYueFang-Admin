import request from '@/utils/request'

// 区域管理
export function areaAll() {
  return request({
    url: 'region',
    method: 'get'
  })
}

export function areaList(params) {
  return request({
    url: 'region/getRegionByPage',
    method: 'get',
    params
  })
}

export function areaAdd(data) {
  return request({
    url: 'region',
    method: 'post',
    data
  })
}

export function areaUpdate(data) {
  return request({
    url: 'region',
    method: 'put',
    data
  })
}

export function areaDelete(params) {
  return request({
    url: 'region',
    method: 'delete',
    params
  })
}
