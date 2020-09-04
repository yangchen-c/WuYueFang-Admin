import request from '@/utils/request'

export function listRole(params) {
  return request({
    url: 'role/get_all',
    method: 'get',
    params
  })
}

// export function createRole(data) {
//   return request({
//     url: '/role/create',
//     method: 'post',
//     data
//   })
// }

// export function readRole(data) {
//   return request({
//     url: '/role/read',
//     method: 'get',
//     data
//   })
// }

export function updateRole(data) {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}

// export function deleteRole(data) {
//   return request({
//     url: '/role/delete',
//     method: 'post',
//     data
//   })
// }

export function getPermission(params) {
  return request({
    url: 'jurisdiction/get_all',
    method: 'get',
    params
  })
}

export function getPermissionByRoleId(params) {
  return request({
    url: 'role/findById',
    method: 'get',
    params
  })
}

// export function updatePermission(data) {
//   return request({
//     url: '/role/permissions',
//     method: 'post',
//     data
//   })
// }

// export function roleOptions(query) {
//   return request({
//     url: '/role/options',
//     method: 'get',
//     params: query
//   })
// }
