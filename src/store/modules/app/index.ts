/*
 * @Description: 全局状态管理-APP内容定义状态
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { defineStore } from 'pinia'
import { get } from '@api/axios'
import orderApi from '@api/workOrder/orderApi'
import messageApi from '@api/message/messageApi'
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '@/utils/localStorage'
interface PropertiesState {
    WS_SERVER_URL: string
}

const USER_THEME_COLOR_KEY = 'USER_THEME_COLOR_KEY'
const USER_THEME_CONFIG_KEY = 'USER_THEME_CONFIG_KEY'
export interface AppState {
    spinning: boolean,
    themeColor: string,
    properties: PropertiesState,
    inverseColorMode: boolean,
    navMode: 'side' |'top',
    orderNum: number,
    messageNum: number,
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    spinning: false,
    themeColor: '#1890ff',
    inverseColorMode: false,
    navMode: 'top',
    orderNum: 0,
    messageNum: 0,
    properties: {
      WS_SERVER_URL: '127.0.0.1'
    }
  }),

  actions: {
    async startSpinning() {
      this.spinning = true
    },
    async stopSpinning() {
      this.spinning = false
    },

    async loadProperties() {
      get({
        baseURL: '/',
        url: '/properties.json'
      }).then((res) => {
        const props = res
        if (props) {
          for (const key in props) {
            this.properties[key] = props[key]
          }
        }
      })
    },
    async getUserThemeColor() {
      this.themeColor = getLocalStorage(USER_THEME_COLOR_KEY) || '#1890ff'
    },
    async themeColorChange(color:string) {
      this.themeColor = color
      setLocalStorage(USER_THEME_COLOR_KEY, this.themeColor)
    },
    /**
     * 获取当前用户本地存储中的主题配置数据
     */
    async getUserThemeConfig() {
      const str = getLocalStorage(USER_THEME_CONFIG_KEY) || '{}'
      let map = { navMode: undefined }
      try {
        map = JSON.parse(str)
      } catch (err) {
        clearLocalStorage(USER_THEME_CONFIG_KEY)
      }
      console.error(map)
      if (map) {
        this.navMode = map.navMode ? map.navMode : this.navMode
      }
    },
    /**
     * 设置用户的主题配置 包括 navMode-导航模式
     * @param key 用户的主题配置项-键名
     * @param value  用户的主题配置项-取值
     */
    async setUserThemeConfig(key:string, value) {
      this[key] = value
      setLocalStorage(USER_THEME_CONFIG_KEY, JSON.stringify({ navMode: this.navMode }))
    },

    /**
     * 获取当前用户的待办工单数量
     */
    async fetchOrderNum() {
      this.orderNum = 0

      orderApi.getOrderStatistic().then((res) => {
        this.orderNum = res.data.notAudited
      })
    },

    /**
     * 获取当前用户的待办消息数量
     */
    async fetchMessageNum() {
      this.messageNum = 0

      messageApi.unreadNum().then((res) => {
        this.messageNum = res.data
      })
    }
  }
})
