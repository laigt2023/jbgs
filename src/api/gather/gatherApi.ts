/*
 * @Description: 采集端API
 * @Author: laigt
 * @Date: 2023-09-25
*/

import { get, post } from '../axios'
export default {
// 列表
  errorList(data) {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/errorData',
      data
    })
  },

  // sourceType=csv
  sourcesList(data = { sourceType: 'csv' }) {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/listDataSource',
      data
    })
  },

  // sourceType=csv
  statistics(data) {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/statistics',
      data
    })
  },

  // mode=csv
  checkAndStore(data = { mode: 'csv' }) {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/checkAndStore',
      data
    })
  },

  taskList(data = { mode: 'csv' }) {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/task',
      data
    })
  },

  uploadCsv(formData) {
    const fd = new FormData()
    fd.append('file', formData.file)

    return post({
      baseURL: '/my-api',
      headers: { 'Content-Type': 'multipart/form-data' },
      url: `/gather/api/uploadCsv?dataTypeName=${formData.dataTypeName}&isSaveInDb=${formData.isSaveInDb}`,
      data: fd
    })
  },
  // 单个任务启动
  simpleTaskStart(data) {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/checkOneAndStore',
      data
    })
  },
  // 获取当前进行中任务
  currentTask() {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/currentTask'
    })
  },
  dataTypeList(data) {
    return get({
      baseURL: '/my-api',
      url: '/gather/api/listDataTypeName',
      data
    })
  }
}
