import request from '@/utils/request'

export function getTableDetail() {
  return request({
    url: '/tableDetail/getTableDetail',
    method: 'post',
  })
}
