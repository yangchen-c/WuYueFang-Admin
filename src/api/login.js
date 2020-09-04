import request from '@/utils/request'

export function loginByUsername(username, password) {
  const params = {
    phone: username,
    pwd: password
  }
  return request({
    url: 'staff/login',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 获取用户信息
export function getUserInfo() {
  // const params = {
  //   token
  // }
  return request({
    url: 'staff/findByToken',
    method: 'get'
  })
}

// 修改密码
export function passwordUpdate(data) {
  return request({
    url: 'staff/updatePwd',
    method: 'put',
    data
  })
}

// 重置密码
export function passwordReset(data) {
  return request({
    url: 'staff/resetPwd',
    method: 'put',
    data
  })
}
