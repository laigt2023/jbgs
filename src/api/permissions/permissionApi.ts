/*
 * @Description: 权限API
 * @Author: laigt
 * @Date: 2023-02-2
*/
import { get } from '../axios'

export default {
  getInfo() {
    return get({
      url: '/system/user/getInfo'
    })
  }
}
