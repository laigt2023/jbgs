/*
 * @Description: 路由配置-框架必要路由配置
 * @Author: laigt
 * @Date: 2023-02-2
 */

const main = [
  {
    path: '',
    redirect: 'home'
  },
  {
    name: 'home',
    path: '/home',
    meta: {
      title: '首页',
      // 取消进入动画flag  true-路由切换关闭进入、退出动画
      cancelTransition: true
    },
    component: () => import('@views/home/Home.vue')
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@views/login/Login.vue')
  },
  {
    name: 'loginv1',
    path: '/loginv1',
    meta: {
      title: '登录'
    },
    component: () => import('@views/login/Login-v1.vue')
  },
  // 404页面匹配未配置的路径
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true
  }
]
export default main
