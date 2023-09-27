/*
 * @Description: 全局状态管理-登陆用户权限
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { defineStore } from 'pinia'
import { setSessionStorage, getSessionStorage, clearSessionStorage } from '@/utils/localStorage'
import permissionApi from '@api/permissions/permissionApi'
import { useUserStore } from '../user'

const USE_INFO_SESSION_KEY = 'USE_INFO_SESSION_KEY'
export interface PermissionsState {
  permissions:Array<string>;
  roles:Array<string>;
  user:object
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionsState => ({
    permissions: [],
    roles: [],
    user: {}
  }),

  actions: {
    async loadPermissions() {
      // 从sessionStorage 中获取当前登陆用户的信息
      const jsonString = getSessionStorage(USE_INFO_SESSION_KEY)
      const userInfo = jsonString && jsonString.length ? JSON.parse(jsonString) : {}
      this.permissions = userInfo.permission || []
      this.roles = userInfo.roles || []
      this.user = userInfo.user || {}

      permissionApi.getInfo().then((res) => {
        this.permissions = res.permissions
        this.roles = res.roles
        this.user = res.user

        // 配置当前用户的信息
        useUserStore().setInfo(this.user)

        // 将当前用户的permissions信息保存到sessionStorage中
        setSessionStorage(USE_INFO_SESSION_KEY, JSON.stringify({ permissions: this.permissions, roles: this.roles, user: this.user }))
      })
    },
    async clearUserInfo() {
      clearSessionStorage(USE_INFO_SESSION_KEY)
    }
  }
})
