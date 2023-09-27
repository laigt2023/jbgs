import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from '@store/index'
import antd from 'ant-design-vue'
import gc from './components/gc/index'
import directives from './components/directive'

// 引入
import * as Icons from '@ant-design/icons-vue'

import './assets/css/reset.css'
// import 'ant-design-vue/dist/antd.min.css'
// import 'ant-design-vue/dist/antd.dark.css'
import 'ant-design-vue/dist/antd.variable.min.css'
// import '@components/inside/theme/antd.dark.css'

// 动画库
// import './assets/css/animate.min.css'

// svg图标组件
import svgIcon from './components/svg/index.vue'
import './components/svg/iconfont'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(piniaStore)
app.use(router)

// 全局注册所有antd的图标
for (const key in Icons) {
  app.component(key, Icons[key])
}

// 添加全局指令
app.use(directives)

// 全局引用antd的UI库
app.use(antd)

// 全局引用自定义组件库gc
app.use(gc)

// 全局注册svgIcon组件
app.component('svg-icon', svgIcon)

app.mount('#app')
