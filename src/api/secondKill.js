import request from '@/utils/request'

// 秒杀商品
export function secondKillGoodsList(params) {
  return request({
    url: 'seckill/findSeckillByPage',
    method: 'get',
    params
  })
}

export function secondKillGoodsAdd(data) {
  return request({
    url: 'seckill/createSeckill',
    method: 'post',
    data
  })
}

export function secondKillGoodsUpdate(data) {
  return request({
    url: 'seckill',
    method: 'put',
    data
  })
}

export function secondKillGoodsDelete(params) {
  return request({
    url: 'seckill',
    method: 'delete',
    params
  })
}

export function secondKillGoodsDetailById(params) {
  return request({
    url: 'seckill/getById',
    method: 'get',
    params
  })
}

// 秒杀订单
export function secondKillOrderList(params) {
  return request({
    url: 'order/getOrderBySeckill',
    method: 'get',
    params
  })
}
