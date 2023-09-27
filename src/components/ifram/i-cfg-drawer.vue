<!--
 * @Description: 框架-全局主题配置组件（左侧抽屉模式）
 * @Author: laigt
 * @Date: 2023-02-22
-->
<template>
  <a-drawer
    ref="drawerRef"
    v-model:visible="visible"
    class="custom-class"
    title="全局配置"
    :forceRender="true"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
    <div v-if="showButton || visible" class="open-btn-warp">
      <a-button
        type="primary"
        size="large"
        class="open-btn"
        @click="switchDrawer()"
      >
        <close-square-outlined v-if="visible" />
        <setting-outlined v-else />
      </a-button>
    </div>

    <div class="config-item">
      <p>主题颜色</p>
      <div>
        <a-tooltip v-for="d in themes" :key="d.color" placement="top">
          <template #title>
            {{ d.title }}
          </template>
          <div
            class="themes-color-item"
            :style="{ backgroundColor: d.color }"
            @click="clickThemeColor(d)"
          >
            <check-outlined v-if="state.themeColor === d.color" />
          </div>
        </a-tooltip>
      </div>

      <div class="custom-themes-warp">
        <p>自定义<a-switch v-model:checked="customThemes" /></p>
        <template v-if="customThemes">
          <a-input
            v-model:value="state.themeColor"
            autocomplete="off"
            style="width: 200px; margin-right: 20px"
            placeholder="请输入颜色（例如：#1890ff）"
          />
          <a-button type="primary" @click="switchThemeColor()">确认 </a-button>
        </template>
      </div>
      <a-divider />
    </div>

    <div class="config-item">
      <div class="cfg-item">
        <p>反色模式</p>
        <p>
          <a-switch
            v-model:checked="inverseColorMode"
            @click="() => switchInverseColorMode"
          />
        </p>
      </div>
      <a-divider />
    </div>
    <div class="config-item">
      <p>导航模式</p>

      <a-tooltip placement="top">
        <template #title>
          <span>侧边导航</span>
        </template>
        <div class="nav-mode-config-item" @click="switchNavMode('side')">
          <img src="/img/svg/side.svg" />
          <check-outlined v-if="state.navMode === 'side'" class="select-icon" />
        </div>
      </a-tooltip>
      <a-tooltip placement="top">
        <template #title>
          <span>头部导航</span>
        </template>
        <div class="nav-mode-config-item" @click="switchNavMode('top')">
          <img src="/img/svg/top.svg" />
          <check-outlined v-if="state.navMode === 'top'" class="select-icon" />
        </div>
      </a-tooltip>
      <a-divider />
    </div>
  </a-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive, onBeforeMount, watch } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import {
  CloseSquareOutlined,
  SettingOutlined,
  CheckOutlined
} from '@ant-design/icons-vue'
import { useAppStore } from '@store/index'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  showButton: {
    type: Boolean,
    default: false
  }
})

// 预设的快捷主题颜色样例
const themes = {
  themes1: { title: '拂晓蓝 （默认）', color: '#1890ff' },
  themes2: { title: '薄暮', color: '#f5222d' },
  themes3: { title: '火山', color: '#fa541c' },
  themes4: { title: '日暮', color: '#faad14' },
  themes5: { title: '明青', color: '#13c2c2' },
  themes6: { title: '极光绿', color: '#52c41a' },
  themes7: { title: '集客蓝', color: '#2f54eb' },
  themes8: { title: '酱紫', color: '#722ed1' }
}

// 全局状态管理-app
const appStore = useAppStore()

// 用户主题配置
const state = reactive({
  themeColor: appStore.themeColor,
  navMode: ''
})

// 当前用户设置的主题颜色
onBeforeMount(() => {
  state.themeColor = appStore.themeColor
  switchThemeColor({ color: state.themeColor })
})

// 加载用户设置的主题颜色
appStore.getUserThemeColor().then(() => {
  state.navMode = appStore.navMode
})
// 加载用户设置的主题配置
appStore.getUserThemeConfig()

const visible = ref<boolean>(props.show)

const afterVisibleChange = () => {
  // to do something
  // console.log('visible', bool)
}

// 自定义主题颜色
const customThemes = ref(false)
// 显示/隐藏全局主题配置抽屉方法
const switchDrawer = (show?: boolean) => {
  if (show === false || show === true) {
    visible.value = show
  } else {
    visible.value = !visible.value
  }
}

// 处理点击快捷主题颜色方法
const clickThemeColor = (theme?) => {
  customThemes.value = false
  switchThemeColor(theme)
}

// 切换当前主题颜色方法
const switchThemeColor = (theme?) => {
  if (theme) {
    state.themeColor = theme.color
  }
  ConfigProvider.config({
    theme: {
      primaryColor: state.themeColor
    }
  })
  // 提交action到全局状态管理中-app
  appStore.themeColorChange(state.themeColor)
}

// 反色模式
const inverseColorMode = ref(false)
// 反色模式切换方法
const switchInverseColorMode = (no: boolean | null | undefined) => {
  if (no === false || no === true) {
    inverseColorMode.value = no
  } else {
    inverseColorMode.value = !inverseColorMode.value
  }

  appStore.inverseColorMode = inverseColorMode.value
}

// 监听反色模式
watch(
  inverseColorMode,
  (newvalue) => {
    const inverColorClassName = 'color-weak'
    const appDom = document.getElementById('app')
    const mainDom =
      appDom && appDom.firstElementChild ? appDom.firstElementChild : null

    if (
      mainDom &&
      newvalue &&
      mainDom.className.indexOf(inverColorClassName) <= -1
    ) {
      mainDom.className += ' ' + inverColorClassName
    } else if (mainDom && newvalue === false && mainDom.className) {
      mainDom.className = mainDom.className.replaceAll(inverColorClassName, '')
    }
  },
  { immediate: false }
)

/**
 * 切换路由显示模式
 * @param navMode side-侧栏  top-头部
 */
const switchNavMode = (navMode: 'side' | 'top') => {
  state.navMode = navMode
  appStore.setUserThemeConfig('navMode', state.navMode)
}

defineExpose({
  switchDrawer,
  switchInverseColorMode,
  switchNavMode
})
</script>
<style lang="less">
/**
 * 注意这里的css的作用域是全局
 */
.color-weak {
  filter: invert(80%);
  -webkit-filter: invert(80%);
}

:deep(.custom-class .ant-drawer-content) {
  overflow: visible;
}

.custom-class {
  .ant-drawer-content {
    overflow: visible;
  }

  .ant-drawer-body {
    overflow: visible;
  }

  .open-btn-warp {
    position: absolute;
    z-index: 999;
    left: -48px;
    top: 280px;
  }

  .themes-color-item {
    width: 25px;
    height: 25px;
    font-size: 17px;
    display: inline-block;
    margin-top: 10px;
    margin-right: 10px;
    color: #fff;
    vertical-align: text-top;
    cursor: pointer;
    text-align: center;
  }

  .custom-themes-warp {
    padding: 20px 0;
  }

  .nav-mode-config-item {
    display: inline-block;
    position: relative;
    margin-right: 20px;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
    }

    .select-icon {
      position: absolute;
      bottom: 12px;
      right: 8px;
      font-size: 18px;
      font-weight: bold;
      color: #1890ff;
    }
  }
}
</style>
