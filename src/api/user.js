import request from '@/utils/request'

export function userNoAssignList(params) {
  return request({
    url: 'student/getByPageZong',
    method: 'get',
    params
  })
}

export function userList(params) {
  return request({
    url: 'student/getByPage',
    method: 'get',
    params
  })
}

// 分配校区、修改邀约状态、修改学生信息
export function userUpdate(data) {
  return request({
    url: 'student/updateStudent',
    method: 'put',
    data
  })
}

export function qianListByUserId(params) {
  return request({
    url: 'signin/getSignin',
    method: 'get',
    params
  })
}

// 缴费记录
export function paymentList(params) {
  return request({
    url: 'pay_the_fees/byPage',
    method: 'get',
    params
  })
}

export function paymentAdd(data) {
  return request({
    url: 'pay_the_fees/createPayTheFees',
    method: 'post',
    data
  })
}

export function paymentUpdate(data) {
  return request({
    url: 'pay_the_fees',
    method: 'put',
    data
  })
}

// 作业情况
export function studentHomeworkList(params) {
  return request({
    url: 'releaseHomeworkToStudent/byPage',
    method: 'get',
    params
  })
}

// 学生所属班级
export function studentClassAll(params) {
  return request({
    url: 'student_class/getStudentClassByStudentId',
    method: 'get',
    params
  })
}

export function studentClassList(params) {
  return request({
    url: 'student_class/byPage',
    method: 'get',
    params
  })
}

export function studentClassAdd(data) {
  return request({
    url: 'student_class/createStudentClass',
    method: 'post',
    data
  })
}

export function studentClassUpdate(data) {
  return request({
    url: 'student_class',
    method: 'put',
    data
  })
}

export function studentClassDelete(params) {
  return request({
    url: 'student_class',
    method: 'delete',
    params
  })
}

// 积分记录
export function studentCreditsList(params) {
  return request({
    url: 'student_integral/byPage',
    method: 'get',
    params
  })
}

// 消课记录
export function studentXiaokeList(params) {
  return request({
    url: 'eliminate_class/findByStudentId',
    method: 'get',
    params
  })
}

// 佣金管理
export function cashMgmtList(params) {
  return request({
    url: 'commission_record/byPage',
    method: 'get',
    params
  })
}

// 积分设置
export function creditsSettingList(params) {
  return request({
    url: 'integral_way',
    method: 'get',
    params
  })
}

export function creditsSettingUpdate(data) {
  return request({
    url: 'integral_way',
    method: 'put',
    data
  })
}
