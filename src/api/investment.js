import request from '@/utils/request'

// 招商专员审核管理
export function investmentList(params) {
  return request({
    url: 'staff/byPage',
    method: 'get',
    params
  })
}

export function investmentCheck(data) {
  return request({
    url: 'staff/auditStatus',
    method: 'put',
    data
  })
}
