/*
 * @Description: 异常数据路由
 * @Author: laigt
 * @Date: 2023-04-12
*/

export default [
  {
    name: 'gather',
    path: '/gather',
    redirect: '/gather',
    component: () => import('@views/gather/GatherDataCenter.vue'),
    props: {
      permission: ''
    },
    meta: {},
    children: [
      {
        name: 'gatherFullScreen',
        path: '/gather/gatherFullScreen',
        component: () => import('@views/gather/GatherFullScreen.vue'),
        meta: {},
        permission: ''
      },
      {
        name: 'errorDataList',
        path: '/gather/errorData',
        component: () => import('@views/gather/GatherDataPage.vue'),
        meta: {},
        permission: ''
      },
      {
        name: 'pendingDataList',
        path: '/gather/pendingData',
        component: () => import('@views/gather/GatherPendingDataPage.vue'),
        meta: {},
        permission: ''
      }
    ]
  }
]
