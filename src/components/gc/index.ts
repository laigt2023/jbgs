import Tablex from './gc-tablex.vue'
import Toolbar from './gc-toolbar.vue'
import Paginationx from './gc-paginationx.vue'
import Modalx from './gc-modalx.vue'
import Formx from './gc-formx.vue'
import Buttonx from './gc-buttonx.vue'

export default (Vue) => {
  Vue.component('gc-tablex', Tablex)
  Vue.component('gc-toolbar', Toolbar)
  Vue.component('gc-paginationx', Paginationx)
  Vue.component('gc-modalx', Modalx)
  Vue.component('gc-formx', Formx)
  Vue.component('gc-buttonx', Buttonx)
}
