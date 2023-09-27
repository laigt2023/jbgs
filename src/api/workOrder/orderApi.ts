/*
 * @Description: 工单列表-工单API
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { del, post, put, get } from '../axios'

const RESOURCE_URL = '/work/order'

export default {
  /**
   *
   * @param data 待办搞工单列表
   * @returns
   */
  pendingPage(query) {
    return get({
      url: '/inside-portal/application/order',
      params: query
    })
  },

  /**
   *
   * @param data 待办搞工单列表
   * @returns
   */
  auditedPage(query) {
    return get({
      url: '/inside-portal/application/order/audited',
      params: query
    })
  },
  /**
   * 新增
   * @param data
   * @returns
   */
  myApprovePage(data) {
    return put({
      baseURL: '',
      url: RESOURCE_URL + '/myapprove',
      apiMode: 'mock',
      data
    })
  },
  /**
   * 新增
   * @param data
   * @returns
   */
  myApprovePage2(data) {
    return post({
      baseURL: '',
      url: RESOURCE_URL + '/myapprove',
      apiMode: 'mock',
      data
    })
  },
  /**
   *  我的申请
   * @param data
   * @returns
   */
  mySubmitList(data) {
    return get({
      url: '/inside-portal/application/order/my/submit',
      params: data
    })
  },

  /**
   * 审核工单
   * @param data
   * @returns
   */
  audit(data) {
    return put({
      url: '/inside-portal/application/order/audit',
      data
    })
  },
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
   * 获取订单统计数据
   * @param data
   * @returns
   */
  getOrderStatistic() {
    return get({
      url: '/inside-portal/application/order/statistic'
    })
  },
  /**
   * 按照处理人统计工单
   * @returns
   */
  statisticByOperator() {
    return get({
      url: '/inside-portal/application/order/statistic/operator'
    })
  },
  /**
   * 按照提交人统计工单
   * @returns
   */
  statisticBySubmit() {
    return get({
      url: '/inside-portal/application/order/statistic/submit'
    })
  },
  /**
   * 按照月度统计工单
   * @returns
   */
  statisticByMonth() {
    return get({
      url: '/inside-portal/application/order/statistic/month'
    })
  }
}
