import hasPermi from './permission/hasPermi'
import hasRole from './permission/hasRole'

const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
}
export default { install }
