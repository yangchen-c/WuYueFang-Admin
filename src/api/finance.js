import request from '@/utils/request'

// 财务管理
export function financeList(params) {
  return request({
    url: 'finance_list/byPage',
    method: 'get',
    params
  })
}

export function financeAdd(data) {
  return request({
    url: 'finance_list/createFinanceList',
    method: 'post',
    data
  })
}

export function financeUpdate(data) {
  return request({
    url: 'finance_list',
    method: 'put',
    data
  })
}

export function financeDelete(params) {
  return request({
    url: 'finance_list',
    method: 'delete',
    params
  })
}

export function financeSum(params) {
  return request({
    url: 'finance_list/findFinanceListTotalCount',
    method: 'get',
    params
  })
}
