import request from '@/utils/request'

// 拼团商品
export function groupbuyGoodsList(params) {
  return request({
    url: 'usergroup/findUserGroupByPage',
    method: 'get',
    params
  })
}

export function groupbuyGoodsAdd(data) {
  return request({
    url: 'usergroup/createUserGroup',
    method: 'post',
    data
  })
}

export function groupbuyGoodsUpdate(data) {
  return request({
    url: 'usergroup',
    method: 'put',
    data
  })
}

export function groupbuyGoodsDelete(params) {
  return request({
    url: 'usergroup/deleteUsergroup',
    method: 'delete',
    params
  })
}

export function groupbuyGoodsDetailById(params) {
  return request({
    url: 'usergroup/findUsergroupById',
    method: 'get',
    params
  })
}

// 拼团订单
export function groupbuyOrderList(params) {
  return request({
    url: 'order/getOrderByUserGroup',
    method: 'get',
    params
  })
}
