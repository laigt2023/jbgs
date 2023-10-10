/*
 * @Description: 菜单-工单列表菜单配置
 * @Author: laigt
 * @Date: 2023-02-2
*/

export default [
  {
    name: 'gather',
    title: '揭榜挂帅',
    icon: 'audit-outlined',
    routerName: '',
    permission: '',
    children: [
      {
        name: 'gatherFullScreen',
        title: '数据流可视化',
        icon: '',
        routerName: 'gatherFullScreen',
        permission: ''
      },
      {
        name: 'errorDataList',
        title: '异常数据告警',
        icon: '',
        routerName: 'errorDataList',
        permission: ''
      },
      {
        name: 'pendingDataList',
        title: '待校验数据',
        icon: '',
        routerName: 'pendingDataList',
        permission: ''
      }
    ]
  }
]
