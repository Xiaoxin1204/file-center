import request from 'axios'

const URL_BASE = 'http://192.168.4.26:8090/datasource'

export function getBatchData() {
  return request({
    url: URL_BASE + '/io/queryFileBatch',
    method: 'get',
  })
}

export function getFileDetail(data) {
  return request({
    url: URL_BASE + '/io/' + data,
    method: 'get',
  })
}

export function getBatchNode() {
  return request({
    url: URL_BASE + '/node',
    method: 'get',
  })
}

export function getInitStatus() {
  return request({
    url: URL_BASE + '/io/generate',
    method: 'post',
  })
}

export function getImportStatus(sysDate) {
  return request({
    url: URL_BASE + '/node/batchInput?sysDate=' + sysDate,
    method: 'get',
  })
}

export function getExportStatus(sysDate) {
  return request({
    url: URL_BASE + '/node/batchOutput?sysDate=' + sysDate,
    method: 'get',
  })
}

export function doExecute(params) {
  return request({
    url: URL_BASE + '/io/start_files_io',
    method: 'get',
    params,
  })
}

export function getBatchTableData() {
  return request({
    url: URL_BASE + '/fileBatchDefinition',
    method: 'get',
  })
}

export function getFileTableData() {
  return request({
    url: URL_BASE + '/fileDefinition',
    method: 'get',
  })
}

export function getParameterTableData() {
  return request({
    url: URL_BASE + '/parameter',
    method: 'get',
  })
}
export function getWildTableData() {
  return request({
    url: URL_BASE + '/wild',
    method: 'get',
  })
}
