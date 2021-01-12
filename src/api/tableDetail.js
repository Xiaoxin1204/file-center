import request from '@/utils/request'

export function getTableDetail() {
  return request({
    url: '/tableDetail/getTableDetail',
    method: 'post',
  })
}
export function getTableHeader(data) {
  return request({
    url: '/tableHeader/' + data,
    method: 'post',
  })
}
