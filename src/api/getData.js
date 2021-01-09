import request from 'axios'

export function getBatchData() {
  return request({
    url: 'http://192.168.4.26:8090/datasource/io/queryFileBatch',
    method: 'get',
  })
}

export function getFileDetail(data) {
  return request({
    url: 'http://192.168.4.26:8090/datasource/io/' + data,
    method: 'get',
  })
}

export function getBatchNode() {
  return request({
    url: 'http://192.168.4.26:8090/datasource/node',
    method: 'get',
  })
}

export function getStargazers(params) {
  return request({
    url:
      'https://api.github.com/repos/chuzhixin/vue-admin-beautiful/stargazers',
    method: 'get',
    params,
    timeout: 10000,
  })
}
