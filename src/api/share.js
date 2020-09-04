import request from '@/utils/request'

// 模板
export function shareTemplateList() {
  return request({
    url: 'template',
    method: 'get'
  })
}

export function shareTemplateAdd(data) {
  return request({
    url: 'template',
    method: 'post',
    data
  })
}

export function shareTemplateUpdate(data) {
  return request({
    url: 'template',
    method: 'put',
    data
  })
}

export function shareTemplateDelete(params) {
  return request({
    url: 'template',
    method: 'delete',
    params
  })
}
