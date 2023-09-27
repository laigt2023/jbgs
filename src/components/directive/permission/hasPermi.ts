/*
 * @Description:   全局指令-判断当前用户是否有相应权限
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { usePermissionStore } from '@store/index'

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mounted(el, binding, vnode, prevVnode) {
    const usePermission = usePermissionStore()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe = usePermission.$subscribe((mutation, state) => {
      updateEl()
    })
    el.unsubscribe = unsubscribe

    const { value } = binding
    const all_permission = '*:*:*'

    const updateEl = () => {
      const permissions = usePermission.permissions

      if (value && value instanceof Array && value.length > 0) {
        const permissionFlag = value

        const hasPermissions = permissions.some(permission => {
          return all_permission === permission || permissionFlag.includes(permission)
        })

        if (!hasPermissions) {
          // 记录当前el的父节点，用于后续监听事件中的el节点回复挂载
          el.parentDom = el.parentNode
          el.parentNode && el.parentNode.removeChild(el)
        } else if (el.parentDom) {
          // 注：会出现el节点的位置不可控
          el.parentDom.appendChild(el)
          // 清空当前el节点的父节点记录
          el.parentDom = undefined
        }
      } else {
        throw new Error('请设置操作权限标签值')
      }
    }
    updateEl()
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unmounted(el, binding, vnode, prevVnode) {
    if (el && el.unsubscribe) {
      el.unsubscribe()
    }
  }
}
