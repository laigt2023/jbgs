/*
 * @Description: 个人中心-审批API
 * @Author: laigt
 * @Date: 2023-04-18
*/

import { post, put, del, get } from '../axios'

const RESOURCE_URL = '/personal/approve'

export default {
  /**
   * 分页
   * @param data
   * @returns
   */
  page(data) {
    return get({
      baseURL: '',
      url: RESOURCE_URL,
      apiMode: 'mock',
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
   *  测回
   */
  recall(data) {
    return post({
      baseURL: '',
      url: `${RESOURCE_URL}`,
      apiMode: 'mock',
      data
    })
  }

}
