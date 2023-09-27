/*
 * @Description: 全局状态管理-全局配置管理
 * @Author: nieat
 * @Date: 2023-04-24
*/

import { defineStore } from 'pinia'
import userApi from '@api/user'

export interface PropertiesState {
  properties: {
    govAddress: string,
    govLogoutUrl: string,
    normalAddress: string
  }
}

export const usePropertiesStroe = defineStore({
  id: 'properties',
  state: (): PropertiesState => ({
    properties: {
      govAddress: '',
      govLogoutUrl: '',
      normalAddress: ''
    }
  }),
  actions: {
    getProperties() {
      userApi.getProperties().then(res => {
        this.properties = res.data
      }).catch(() => {
        this.properties = {
          govAddress: '',
          govLogoutUrl: '',
          normalAddress: ''
        }
      })
    },
    getGovDomain() {
      const href = this.properties.govAddress
      const matchObj = href.match(/(\w+):\/\/([^/:]+)(:\d*)?/)
      if (matchObj) {
        return matchObj[0]
      } else {
        return ''
      }
    }
  }
})
