import request from '@/utils/request'

// 上传文件
const uploadPath = process.env.VUE_APP_BASE_API + 'upload'
export { uploadPath }

export function uploadFile(data) {
  return request({
    url: 'upload',
    method: 'post',
    data
  })
}

// 积分商城--商品分类
export function creditsGoodsCategoryAll(params) {
  return request({
    url: 'category',
    method: 'get',
    params
  })
}

export function creditsGoodsCategoryList(params) {
  return request({
    url: 'category/findAll',
    method: 'get',
    params
  })
}

export function creditsGoodsCategoryAdd(data) {
  return request({
    url: 'category',
    method: 'post',
    data
  })
}

export function creditsGoodsCategoryUpdate(data) {
  return request({
    url: 'category',
    method: 'put',
    data
  })
}

export function creditsGoodsCategoryDelete(params) {
  return request({
    url: 'category',
    method: 'delete',
    params
  })
}

// 积分商城--商品列表
export function creditsGoodsDetailByGoodsId(params) {
  return request({
    url: 'trade/getById',
    method: 'get',
    params
  })
}

export function creditsGoodsSearch(params) {
  return request({
    url: 'trade/findLike',
    method: 'get',
    params
  })
}

export function creditsGoodsAll(params) {
  return request({
    url: 'trade',
    method: 'get',
    params
  })
}

export function creditsGoodsList(params) {
  return request({
    url: 'trade/getPaging',
    method: 'get',
    params
  })
}

export function creditsGoodsAdd(data) {
  return request({
    url: 'trade/add',
    method: 'post',
    data
  })
}

export function creditsGoodsUpdate(data) {
  return request({
    url: 'trade',
    method: 'put',
    data
  })
}

export function creditsGoodsDelete(params) {
  return request({
    url: 'trade',
    method: 'delete',
    params
  })
}

// 商品规格by商品id
export function creditsGoodsSpecList(params) {
  return request({
    url: 'commodityStocks/getStockTwo',
    method: 'get',
    params
  })
}

export function creditsGoodsSpecAdd(data) {
  return request({
    url: 'commodityStocks',
    method: 'post',
    data
  })
}

export function creditsGoodsSpecUpdate(data) {
  return request({
    url: 'commodityStocks',
    method: 'put',
    data
  })
}

export function creditsGoodsSpecDelete(params) {
  return request({
    url: 'commodityStocks',
    method: 'delete',
    params
  })
}

// 积分商品订单
export function creditsGoodsOrderList(params) {
  return request({
    url: 'ptOrder/findByPage',
    method: 'get',
    params
  })
}

// 领取
export function creditsGet(data) {
  return request({
    url: 'ptOrder/getTrade/' + data.id,
    method: 'put'
  })
}
