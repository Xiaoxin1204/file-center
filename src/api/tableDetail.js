import request from '@/utils/request'

export function getTableDetail() {
  return request({
    url: '/tableDetail/getTableDetail',
    method: 'post',
  })
}
export function getHeaderNav() {
  return request({
    url: '/tableHeader/nav',
    method: 'post',
  })
}
