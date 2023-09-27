/*
 * @Description: 服务超市-服务API
 * @Author: laigt
 * @Date: 2023-04-13
*/

import { post, put, del, get } from '../axios'

const RESOURCE_URL = '/market/server'

export default {
  /**
   * 分页
   * @param typeCode 服务分类编号
   * @returns
   */
  page(query) {
    return get({
      url: '/inside-portal/application',
      params: query
    })
  },

  /**
   * 我已申请成功的服务分页
   * @param typeCode 服务分类编号
   * @returns
   */
  myApp(type?:string, system?:string) {
    return get({
      url: '/inside-portal/application/my/apps',
      data: {
        system,
        type
      }
    })
  },

  /**
   * 接口服务分页
   * @param data
   * @returns
   */
  apiServerPage(data) {
    return get({
      url: '/inside-portal/smartgateway',
      data
    })
  },
  /**
   * 新增
   * @param data
   * @returns
   */
  add(data) {
    return put({
      baseURL: '',
      url: RESOURCE_URL,
      apiMode: 'mock',
      data
    })
  },
  /**
   * 更新
   * @param data
   * @returns
   */
  update(data) {
    return post({
      baseURL: '',
      url: RESOURCE_URL,
      apiMode: 'mock',
      data
    })
  },
  /**
   * 删除
   * @param data
   * @returns
   */
  del(id:string | number) {
    return del({
      baseURL: '',
      url: `${RESOURCE_URL}/${id}`,
      apiMode: 'mock'
    })
  },
  /**
   * 获取服务类型列表
   * @param data
   * @returns
   */
  serverTypes(data) {
    return get({
      url: '/inside-portal/application/types',
      apiMode: 'api',
      data
    })
  },

  /**
   * 单点登陆链接
   * @param data
   * @returns
   */
  getSSOLink(appKey) {
    return post({
      url: '/inside-portal/application/sso/' + appKey
    })
  },

  /**
   * 我的收藏列表
   * @param typeCode
   * @returns
   */
  myCollectList(query) {
    return get({
      url: '/inside-portal/application/my/collection',
      params: query
    })
  },
  /**
   * 我的收藏分页
   * @param typeCode
   * @returns
   */
  myCollectPage(query) {
    return get({
      url: '/inside-portal/application/my/collection/page',
      params: query
    })
  },
  /**
   * 收藏
   */
  collect(data) {
    console.error(data)
    return post({
      url: '/inside-portal/application/collect/' + data.id
    })
  },
  /**
   * 取消收藏
   */
  cancelCollect(data) {
    return put({
      url: '/inside-portal/application/cancel/collect/app/' + data.id
    })
  },
  /**
   * 接口申请
   * @param data
   * @returns
   */
  applyPort(data) {
    return put({
      url: '/inside-portal/smartgateway',
      data
    })
  },
  getTree() {
    return get({
      url: '/inside-portal/smartgateway/tj'
    })
  }
}
