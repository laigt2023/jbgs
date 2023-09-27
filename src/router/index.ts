/*
 * @Description: 路由配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import CONFIG from '@/config'
// import { getToken } from '@/utils/auth'
import main from './main'
import gather from './modules/gather'
// import system from './modules/system'
// import portal from './modules/portal'
// import workOrder from './modules/workOrder'
// import personalCenter from './modules/personalCenter'
// import messageCenter from './modules/messageCenter'
// import marketCenter from './modules/marketCenter'

const IS_HISTORY = CONFIG.ROUTER_MODE === 'history'

// const whiteList = ['/loginv1', '/auth-redirect', '/bind', '/register', '/govLogin']

const router = createRouter({
  history: IS_HISTORY ? createWebHistory() : createWebHashHistory(),
  routes: [...main, ...gather]
})

/**
 * 全局守卫
 * 1.添加页面切换的过渡动画效果，配合rout/routerUtil.routerPush使用
 * 2.路由权限控制
 * 3.登陆校验
 */

// router.beforeEach((to, from, next) => {
//   if (getToken()) {
//     if (to.path === '/loginv1' || to.path === '/register') {
//       next({ path: '/' })
//     } else next()
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     }
//   }
// })
export default router
