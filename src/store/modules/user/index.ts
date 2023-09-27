/*
 * @Description: 全局状态管理-登陆用户个人状态数据
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { defineStore } from 'pinia'
import { setToken, isLogin, clearToken, getToken } from '../../../utils/auth'
import { useAppStore, usePermissionStore, usePropertiesStroe } from '@store/index'
import userApi from '@api/user'
import { UserState } from './types'
import router from '@/router'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

const IS_LOGIN = true
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    account: undefined,
    uuId: undefined,
    username: '超级管理员',
    password: undefined,
    nickname: undefined,
    phone: undefined,
    type: undefined,
    code: undefined,
    status: undefined,
    roles: [],
    dept: []
  }),

  actions: {
    /**
    * 用户退出登录
    */
    async logout() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('b', { style: 'color: red; font-size: 16px;' }, '确定注销并退出系统吗？'),
        okText: '确定',
        cancelText: '取消',
        onOk() {
          // userApi.logout().then(res => {
          //   if (!res.code) {
          //     _this.setInfo({})
          //     // 清楚用户信息
          //     usePermissionStore().clearUserInfo()
          //     clearToken()
          //     // 判断是否需要跳转至政务网
          //     const govDomain = usePropertiesStroe().getGovDomain()
          //     const currentUrl = window.location.href
          //     if (currentUrl.indexOf(govDomain) >= 0) {
          //       window.location.href = usePropertiesStroe().properties.govLogoutUrl
          //     } else {
          //       router.push({ name: 'loginv1' })
          //     }
          //   }
          // }).catch()
          _this.setInfo({})
          clearToken()
          // 清楚用户信息
          usePermissionStore().clearUserInfo()
          usePropertiesStroe()
          router.push({ name: 'loginv1' })
        }
      })
    },

    /**
     * async用户登录
     * @param {string} user
     * @param {string} password
     */
    async login(username, password, code) {
      // 是否调用登录接口
      return new Promise((resolve, reject) => {
        if (IS_LOGIN) {
          userApi.login({ username, password, code, uuid: `${this.uuId}`, type: 'government' }).then(res => {
            if (res.code === 0) {
              if (res.data.access_token || res.data) {
                setToken(res.data.access_token || res.data)
              }
            }
            resolve(res)
          }).catch(err => reject(err))
        } else {
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
          setToken(token)
        }
      })
    },

    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    /**
     * 检查登录状态  showSpinning可选项： true-显示加载中遮罩
     */
    async checkLogin(showSpinning?: boolean) {
      if (!isLogin()) {
        // 路由跳转到登录页面
        console.error('用户未登录')
        router.push({ name: 'loginv1' })
      } else {
        // 是否展示加载中遮罩
        if (showSpinning) useAppStore().startSpinning()

        // 加载当前用户信息和权限信息
        usePermissionStore().loadPermissions()

        // 是否调用登录接口
        if (IS_LOGIN) {
          if (showSpinning) useAppStore().stopSpinning()
          return new Promise((resolve) => {
            if (getToken()) resolve(true)
            else resolve(false)
          })
        } else {
          if (showSpinning) useAppStore().stopSpinning()
          const userData:UserState = {}
          this.setInfo(userData)
        }
      }
    },
    getCode() {
      return new Promise((resolve, reject) => {
        userApi.getCodeImg().then(res => {
          resolve(res)
          if (res.code === 0) {
            this.uuId = res.uuid
            this.code = `data:image/gif;base64,${res.img}`
          }
        }).catch(err => reject(err))
      })
    },
    async checkGovLogin() {
      return new Promise((resolve, reject) => {
        userApi.checkGovLogin().then(res => {
          if (res.data.success && res.data.unify) {
            setToken(res.data.data.access_token)
            resolve(true)
          } else resolve(false)
        }).catch(err => reject(err))
      })
    },
    // 获取用户信息
    getUserInfo():UserState {
      return {
        account: this.account,
        uuId: this.uuId,
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        phone: this.phone,
        type: this.type,
        code: this.code,
        roles: this.roles,
        status: this.status,
        dept: this.dept
      }
    }
  }
})
