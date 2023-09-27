/*
 * @Description: 消息列表-消息API
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { get } from '../axios'

export default {
  /**
   * 分页
   * @param data
   * @returns
   */
  page(query) {
    return get({
      url: '/inside-portal/msg/mine',
      params: query
    })
  },
  /**
   * 标为已读
   * @param data
   * @returns
   */
  read(id) {
    return get({
      url: '/inside-portal/msg/' + id
    })
  },
  /**
   * 标为已读
   * @param data
   * @returns
   */
  unreadNum() {
    return get({
      url: '/inside-portal/msg/mine/unread/count'
    })
  }

}
