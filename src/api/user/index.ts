/*
 * @Description: 用户API
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { get, post, del } from '../axios'

interface LoginResquest {
  username: string
  password: string
  type: string
  code: string
  uuid: string
}

export default {
  login(data: LoginResquest) {
    return post({
      url: '/auth/login',
      data
    })
  },
  logout() {
    return del({
      url: '/auth/logout'
    })
  },
  myself() {
    return get({
      baseURL: '',
      url: '/user/myself'
    })
  },
  // 修改用户密码
  changePwd() {
    return get({
      baseURL: '',
      url: '/user/changePwd'
    })
  },
  // 获取验证码
  getCodeImg() {
    return get({
      url: '/code',
      headers: {
        isToken: false
      },
      timeout: 20000
    })
  },
  // 检查是否在政务内网登录
  checkGovLogin() {
    return post({
      url: '/auth/government/checklogin'
    })
  },
  // 获取登录配置
  getProperties() {
    return get({
      url: '/auth/properties',
      headers: {
        isToken: false
      },
      timeout: 20000
    })
  }
}
