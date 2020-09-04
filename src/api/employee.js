import request from '@/utils/request'

// 教师管理
export function employeeList(params) {
  return request({
    url: 'staff/byPage',
    method: 'get',
    params
  })
}

export function employeeAdd(data) {
  return request({
    url: 'staff/createStaff',
    method: 'post',
    data
  })
}

export function employeeUpdate(data) {
  return request({
    url: 'staff/updateStaff',
    method: 'put',
    data
  })
}

export function employeeDelete(params) {
  return request({
    url: 'staff',
    method: 'delete',
    params
  })
}

export function teacherCourseSum(params) {
  return request({
    url: 'eliminate_class/findTeacherEliminateClassTimes',
    method: 'get',
    params
  })
}
