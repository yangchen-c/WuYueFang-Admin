import request from '@/utils/request'

// 提现管理
export function commissionList(params) {
  return request({
    url: 'commission_way',
    method: 'get',
    params
  })
}

export function commissionUpdate(data) {
  return request({
    url: 'commission_way',
    method: 'put',
    data
  })
}
