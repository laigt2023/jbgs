
<!--
* @Description: 框架-头部导航
* @Author: laigt
* @Date: 2023-02-27
-->
<template>
   <nav class="navs">
     <a-dropdown v-for="item in navs" :key="item.routerName">
     <div  class="nav-item" :class="{active:checkPathActive(item.routerPath)}" @click="routerTo(item)">
      <component :is="item.iconComp"></component>
       {{ item.title }}</div>
       <template #overlay>
             <a-menu v-if ='showSubMeun && item.subNav && item.subNav.length'>
               <a-menu-item v-for="(sub,i) in item.subNav" :key="i +'_'+ sub.title" @click="routerTo(sub)">
                 <align-right-outlined class="margin-right-10"/>
                 {{ sub.title }}
               </a-menu-item>
             </a-menu>
        </template>
     </a-dropdown>
   </nav>
</template>
<script setup lang="ts">
import {
  AlignRightOutlined
} from '@ant-design/icons-vue'
import { ref, onUnmounted } from 'vue'
import { useAppStore } from '@store/index'
import router from '@/router'

import { MeunItemType } from './type/LeftMenu'

const props = defineProps({
  // menus 为 Array<MeunType> 格式
  menus: {
    type: Array,
    default: () => {
      return []
    }
  },
  showSubMeun: {
    type: Boolean,
    default: false
  }
})

const navs = props.menus as Array<MeunItemType>

// 添加对useAppStore.state.themeColor 的状态监听
const currentThemeColor = ref(useAppStore().themeColor)
const unsubscribe = useAppStore().$subscribe((mutation, state) => {
  if (currentThemeColor.value !== state.themeColor) {
    currentThemeColor.value = state.themeColor
  }
}
)
onUnmounted(() => {
  unsubscribe()
})

const routerTo = (item) => {
  if (item.routerName) {
    router.push({ name: item.routerName })
  }
}

/**
 * 检查是激活状态
 * @param urlPath 包含url
 */
const checkPathActive = (urlPath) => {
  const url = router.currentRoute.value.fullPath
  if (!urlPath) {
    return false
  }
  return url.indexOf(urlPath) > -1
}
</script>
<style lang="less" scoped>

.navs{
 display: flex;
 background: #fff;
 padding: 19px 30px;
 color: #626262;
 .nav-item{
   font-size: 18px;
   padding: 0 15px;
   cursor: pointer;
   &.active{
     // color: v-bind('currentThemeColor');
     color: var(--ant-primary-color);
   }
   &:hover{
     // color: v-bind('currentThemeColor');
     color: var(--ant-primary-color);
   }
 }
}
</style>
