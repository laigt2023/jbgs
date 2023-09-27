/*
 * @Description:   全局指令-判断当前用户是否有相应角色
 * @Author: laigt
 * @Date: 2023-02-16
*/

import { usePermissionStore } from '@store/index'

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mounted(el, binding, vnode, prevVnode) {
    const usePermission = usePermissionStore()

    const { value } = binding
    const super_admin = 'admin'
    const roles = usePermission.roles

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some(role => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('请设置角色权限标签值"')
    }
  }
}
