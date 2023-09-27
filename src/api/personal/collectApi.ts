/*
 * @Description: 个人中心-工单申请API
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { put, del, get } from '../axios'

const RESOURCE_URL = '/personal/collect'

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
  }

}
