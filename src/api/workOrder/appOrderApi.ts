/*
 * @Description: 工单列表-APP工单API
 * @Author: laigt
 * @Date: 2023-04-20
*/

import { post, get } from '../axios'

export default {
  /**
   * 分页
   * @param data
   * @returns
   */
  page(query: any) {
    return get({
      url: '/inside-portal/application/order',
      params: query
    })
  },
  /**
   * 发起工单
   * @param data
   * @returns
   */
  add(data) {
    return post({
      url: '/inside-portal/application/order',
      data
    })
  },
  /**
   * 审核
   * @param data
   * @returns
   */
  audit(data) {
    return post({
      url: '/inside-portal/application/order/audit',
      data
    })
  },
  /**
   * 工单统计
   * @param data
   * @returns
   */
  statistic() {
    return get({
      url: '/inside-portal/application/order/statistic'
    })
  }
}
