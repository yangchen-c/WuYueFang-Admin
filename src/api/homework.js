import request from '@/utils/request'

// 作业管理
export function homeworkList(params) {
  return request({
    url: 'releaseHomework/byPage',
    method: 'get',
    params
  })
}

export function homeworkDetail(params) {
  return request({
    url: 'releaseHomework/getById',
    method: 'get',
    params
  })
}

export function homeworkDelete(params) {
  return request({
    url: 'releaseHomework/deleteReleaseHomeword',
    method: 'delete',
    params
  })
}
