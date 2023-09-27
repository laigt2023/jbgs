/*
 * @Description: 内容审批-内容工单审批API
 * @Author: laigt
 * @Date: 2023-04-20
*/

import { post, get } from '../axios'

export default {
  /**
   * 待处理工单分页
   * @param data
   * @returns
   */
  pendingPage(query) {
    return get({
      url: '/inside-portal/content/auditing',
      params: query
    })
  },
  /**
   * 我待处理的工单分页
   * @param data
   * @returns
   */
  myApprovePage(query) {
    return get({
      url: '/inside-portal/content/audited',
      params: query
    })
  },
  /**
   * 审核
   * @param data
   * @returns
   */
  audit(data) {
    return post({
      url: '/inside-portal/content/comment',
      data
    })
  }
}
