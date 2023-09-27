/*
 * @Description: 首页：公告API
 * @Author: laigt
 * @Date: 2023-04-26
*/

import { get } from '../axios'

export default {
  /**
   * 分页
   * @param data
   * @returns
   */
  newest() {
    return get({
      url: '/inside-portal/announcement/newest'
    })
  },
  /**
   * 分页
   * @param data
   * @returns
   */
  search(data) {
    return get({
      baseURL: '',
      url: '/newsCenter/search',
      data
    })
  },
  channel() {
    return get({
      url: '/newsCenter/channel',
      baseURL: ''
    })
  },
  content() {
    return get({
      url: '/newsCenter/content',
      baseURL: ''
    })
  },
  detail(id) {
    return get({
      url: `/newsCenter/content/${id}`,
      baseURL: ''
    })
  }
}
