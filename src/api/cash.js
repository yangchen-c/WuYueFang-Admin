import request from '@/utils/request'

// 提现管理
export function cashList(params) {
  return request({
    url: 'withdraw_deposit/byPage',
    method: 'get',
    params
  })
}

export function cashCheck(data) {
  return request({
    url: 'withdraw_deposit/auditWithdrawDeposit',
    method: 'put',
    data
  })
}
