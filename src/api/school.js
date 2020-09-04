import request from '@/utils/request'

// 校区课时统计
export function schoolCourseSum(params) {
  return request({
    url: 'course_scheduling/findCampusTotalAndRemainTimes',
    method: 'get',
    params
  })
}

// 校区管理
export function schoolAllByRegionId(params) {
  return request({
    url: 'campus/getAll',
    method: 'get',
    params
  })
}

export function schoolList(params) {
  return request({
    url: 'campus/getByPage',
    method: 'get',
    params
  })
}

export function schoolAdd(data) {
  return request({
    url: 'campus/createCampus',
    method: 'post',
    data
  })
}

export function schoolUpdate(data) {
  return request({
    url: 'campus/updateCampus',
    method: 'put',
    data
  })
}

export function schoolDelete(params) {
  return request({
    url: 'campus/deleteCampus',
    method: 'delete',
    params
  })
}

// 所有员工 6校长 7执行校长
export function employeeAll(params) {
  return request({
    url: 'staff/getAll',
    method: 'get',
    params
  })
}

// 班级列表
export function classAllBySchoolId(params) {
  return request({
    url: 'class/byCampusId',
    method: 'get',
    params
  })
}

export function classList(params) {
  return request({
    url: 'class/byPage',
    method: 'get',
    params
  })
}

export function classAdd(data) {
  return request({
    url: 'class',
    method: 'post',
    data
  })
}

export function classUpdate(data) {
  return request({
    url: 'class/updateClass',
    method: 'put',
    data
  })
}

export function classDelete(params) {
  return request({
    url: 'class/deleteClass',
    method: 'delete',
    params
  })
}

// 班级类型
export function classTypeAll() {
  return request({
    url: 'classification',
    method: 'get'
  })
}

export function classTypeList(params) {
  return request({
    url: 'classification/byPage',
    method: 'get',
    params
  })
}

export function classTypeAdd(data) {
  return request({
    url: 'classification',
    method: 'post',
    data
  })
}

export function classTypeUpdate(data) {
  return request({
    url: 'classification',
    method: 'put',
    data
  })
}

export function classTypeDelete(params) {
  return request({
    url: 'classification/deleteClassification',
    method: 'delete',
    params
  })
}

// 获取所有老师
export function teacherAll() {
  return request({
    url: 'staff/getAllTeacher',
    method: 'get'
  })
}

// 排课
export function assignClassList(params) {
  return request({
    url: 'course_scheduling/byPage',
    method: 'get',
    params
  })
}

export function assignClassAdd(data) {
  return request({
    url: 'course_scheduling/createCourseScheduling',
    method: 'post',
    data
  })
}

export function assignClassUpdate(data) {
  return request({
    url: 'course_scheduling/updateCourseScheduling',
    method: 'put',
    data
  })
}

export function assignClassDelete(params) {
  return request({
    url: 'course_scheduling',
    method: 'delete',
    params
  })
}

// 查询指定班级还未上的课程列表
export function noAssignClassList(params) {
  return request({
    url: 'course_scheduling/byPageGtNow',
    method: 'get',
    params
  })
}
