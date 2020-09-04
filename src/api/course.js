import request from '@/utils/request'

// 课程管理
// export function courseAll(params) {
//   return request({
//     url: 'curriculum/getByPage',
//     method: 'get',
//     params
//   })
// }
export function courseByClassTypeId(params) {
  return request({
    url: 'curriculum/get_all_curriculum',
    method: 'get',
    params
  })
}

export function courseList(params) {
  return request({
    url: 'curriculum/getByPage',
    method: 'get',
    params
  })
}

export function courseAdd(data) {
  return request({
    url: 'curriculum',
    method: 'post',
    data
  })
}

export function courseUpdate(data) {
  return request({
    url: 'curriculum',
    method: 'put',
    data
  })
}

export function courseDelete(params) {
  return request({
    url: 'curriculum',
    method: 'delete',
    params
  })
}

// 章节管理
export function chapterList(params) {
  return request({
    url: 'details/getByPage',
    method: 'get',
    params
  })
}

export function chapterAdd(data) {
  return request({
    url: 'details',
    method: 'post',
    data
  })
}

export function chapterUpdate(data) {
  return request({
    url: 'details',
    method: 'put',
    data
  })
}

export function chapterDelete(params) {
  return request({
    url: 'details',
    method: 'delete',
    params
  })
}
