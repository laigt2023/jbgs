/*
 * @Description: 路由工具类-用于自定义的路由切换方法
 * @Author: laigt
 * @Date: 2023-02-2
*/

import Router from '../router/index'

function isString(str) {
  return typeof str === 'string' && str.constructor === String
}

/**
 * 路由切换方法 -- 配合页面切换过渡动画
 * @param {*} data  string  || object
 */
export function routerPush(data) {
  let routerData = {}
  if (isString(data)) {
    routerData.name = data
  } else {
    routerData = {
      ...data
    }
  }

  if (!routerData.params) {
    routerData.params = {}
  }
  routerData.params.routerType = 'push'
  Router.push(routerData)
}

/**
 * 路由返回操作 -- 配合页面切换过渡动画
 * @param {*} data  string  || object
 */
export function routerBack() {
  Router.back()
}
export * from 'vue-router'
