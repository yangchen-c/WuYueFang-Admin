import request from '@/utils/request'

// 首页轮播图
export function bannerIndexList() {
  return request({
    url: 'banner_index/get_all',
    method: 'get'
  })
}

export function bannerIndexAdd(data) {
  return request({
    url: 'banner_index',
    method: 'post',
    data
  })
}

export function bannerIndexUpdate(data) {
  return request({
    url: 'banner_index',
    method: 'put',
    data
  })
}

export function bannerIndexDelete(params) {
  return request({
    url: 'banner_index',
    method: 'delete',
    params
  })
}

// 积分商城轮播图
export function bannerCreditsList() {
  return request({
    url: 'banner/get_all',
    method: 'get'
  })
}

export function bannerCreditsAdd(data) {
  return request({
    url: 'banner',
    method: 'post',
    data
  })
}

export function bannerCreditsUpdate(data) {
  return request({
    url: 'banner',
    method: 'put',
    data
  })
}

export function bannerCreditsDelete(params) {
  return request({
    url: 'banner',
    method: 'delete',
    params
  })
}

// 通知通告
export function noticeList(params) {
  return request({
    url: 'poster/byPage',
    method: 'get',
    params
  })
}

export function noticeAdd(data) {
  return request({
    url: 'poster',
    method: 'post',
    data
  })
}

export function noticeUpdate(data) {
  return request({
    url: 'poster',
    method: 'put',
    data
  })
}

export function noticeDelete(params) {
  return request({
    url: 'poster',
    method: 'delete',
    params
  })
}
