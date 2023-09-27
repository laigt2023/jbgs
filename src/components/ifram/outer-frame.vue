<!--
 * @Description: 框架-外部框架（包括头部导航、底部权限说明）
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
  <a-config-provider
    :locale="locale === 'cn' ? zhCN : enUS"
    :prefix-cls="darkThemes ? 'dark' : 'ant'"
  >
    <a-spin :spinning="appStore.spinning">
      <topic ref="topicRef"/>
      <i-navs v-if="navMode === 'top'" ref="navRef" :menus="mainMenus" :style="{height:NAV_DOM_HEIGHT+'px'}"></i-navs>
      <a-layout>
        <a-layout-sider
          v-show="navMode === 'side'"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <left-menu
            :menus="mainMenus"
            :collapsed="collapsed"
            :trigger="null"
            class="side-menu"
            @toggleCollapsed="
              (menuCollapsed) => {
                handleToggleCollapsed(menuCollapsed);
              }
            "
          ></left-menu>
        </a-layout-sider>
        <a-layout-content :class="{ 'sider-model': navMode === 'side' }">
          <div class="main-content" :style="'min-height: '+ getHeadTotalMinHeightStyle">
            <slot></slot>
          </div>
        </a-layout-content>
      </a-layout>
      <!-- <i-foot></i-foot> -->
    </a-spin>
  </a-config-provider>
</template>

<script setup lang="ts">
// ant-design-vue 全局配置为中文显示
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

import topic from '@components/ifram/i-topic.vue'
import iNavs from '@/components/ifram/i-navs.vue'
// import iFoot from '@components/ifram/i-foot.vue'

import leftMenu from '@components/ifram/left-menu.vue'
import mainMenus from '@/meuns/main'

import { ref, onUnmounted, computed } from 'vue'
import { useAppStore } from '@store/index'

/** nav 组件先未固定高度 后续优化
 * 此处影响【getHeadTotalMinHeightStyle】的计算值
 * */
const NAV_DOM_HEIGHT = 67

const darkThemes = ref(false)
const collapsed = ref(false)

/**
 * 同步侧边导航菜单栏的展开、收起状态
 * @param menuCollapsed true-展开  fasle-收起
 */
const handleToggleCollapsed = (menuCollapsed: boolean) => {
  collapsed.value = menuCollapsed
}

// 头部topic组件ref
const topicRef = ref<InstanceType<typeof topic>>()
// 导航nav组件ref
const navRef = ref<InstanceType<typeof iNavs>>()

// ant全局配置-设置所有ant组件相关提升信息语言格式  cn-中文  en-英文
const locale = ref('cn')

/** wact 用户主题配置，监听navMode的变化（side-侧边导航 top-顶部导航） */
const appStore = useAppStore()
const navMode = ref(appStore.navMode)
const unsubscribe = appStore.$subscribe((mutation, state) => {
  if (navMode.value !== state.navMode) {
    navMode.value = state.navMode
  }
})

/**
 * 计算侧边以及内容区域最小高度（min-height）
 */
const getHeadTotalMinHeightStyle = computed(() => {
  let navHeight = NAV_DOM_HEIGHT
  let totalHeight = 0
  const topicHeight = topicRef.value?.$el.offsetHeight
  if (navMode.value === 'side') {
    navHeight = 0
  }
  totalHeight = topicHeight + navHeight
  return 'calc(100vh - ' + totalHeight + 'px)'
})

onUnmounted(() => {
  unsubscribe()
})
</script>
<style lang="less" scoped>
/**
* 指定topic组件固定高度
*/
@topic-height: 125px;

.main-content {
  // min-height: calc(100vh - @topic-height);
  min-width: 100%;
  position: relative;
}

.sider-model {
  margin-left: 1px;
}

.side-menu {
  height: 100%;
}
:deep(.sider-model .left-side){
  min-height: v-bind(getHeadTotalMinHeightStyle);
}
</style>
