<!--
 * @Description: 框架-左侧菜单组件
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
    <a-layout>
      <a-layout-sider v-model:collapsed="menuCollapsed" collapsible :trigger="null">
        <menu class="menu-warp" >
          <div class="open-btn-warp">
            <span class="open-btn" @click="toggleCollapsed">
              <menu-unfold-outlined v-if="menuCollapsed" />
              <menu-fold-outlined v-else />
            </span>
          </div>
          <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            class="menu"
            mode="inline"
            theme="dark"
            :inline-collapsed="menuCollapsed"
          >
            <template v-for="d in newMenus">
              <template v-if="d.children && d.children.length">
                <a-sub-menu :key="d.name">
                  <template #icon>
                    <component :is="d.icon" v-if="d.icon" class="icon" />
                    <component :is="d.iconComp" v-if="!d.icon && d.iconComp" class="icon" />
                  </template>
                  <template #title>{{ d.title }}</template>
                  <a-menu-item
                    v-for="subItem in d.children"
                    :key="subItem.name"
                    @click="hangleMenuItemClick(subItem)"
                  >
                    {{ subItem.title }}
                  </a-menu-item>
                </a-sub-menu>
              </template>
              <a-menu-item v-else :key="d.name" @click="hangleMenuItemClick(d)">
                <template #icon>
                  <component :is="d.icon" v-if="d.icon" class="icon" />
                  <component :is="d.iconComp" v-if="!d.icon && d.iconComp" class="icon" />
                </template>
                <span>{{ d.title }}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </menu>
      </a-layout-sider>
    </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from 'vue'
import { recursiveFindItem, getParentNodeToArray } from '../../utils/tree'
// 暂时按照meuns中配置的图标按需引入
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  BlockOutlined,
  DotChartOutlined,
  ChromeOutlined,
  SplitCellsOutlined,
  AimOutlined,
  UserOutlined,
  FlagOutlined,
  AuditOutlined,
  FolderOutlined,
  FileOutlined,
  ContainerOutlined,
  SyncOutlined,
  CarryOutOutlined,
  BulbOutlined,
  FormOutlined

} from '@ant-design/icons-vue'
import router from '@/router'

import { MeunItemType, MeunType } from './type/LeftMenu'
interface MenusState {
  menuCollapsed: boolean;
  selectedKeys: Array<string>;
  openKeys: Array<string>;
  preOpenKeys: Array<string>;
}

/**
 * 获取包含当前url的router对象的name数组
 * @param router router对象
 * @param url url
 */

// const getRouterName = (router, includeUrl: string) => {
//   const result: Array<string> = []
//   if (router && router.getRoutes) {
//     router.getRoutes().forEach((r) => {
//       if (r.path.indexOf(includeUrl)) {
//         result.push(r.name)
//       }
//     })
//   }

//   return result
// }

const handleRouterChange = (
  state: MenusState,
  menus: Array<MeunType>,
  router
) => {
  // 获取当前路由名称
  const currentRouterName = router.currentRoute.value.name

  // 根据路由名称获取当前激活的菜单项 - 按照路由名称查询
  const handleMeuns = recursiveFindItem(menus, 'routerName', currentRouterName)
  let currentMeun
  // 当前路径的路由名称存在于导航菜单（menus） 中时，选中菜单项
  if (handleMeuns && handleMeuns.length) {
    currentMeun = handleMeuns[0]

    // 菜单树中，展开所有父节点
    const openKeys = getParentNodeToArray(
      currentMeun.parentNode,
      'parentNode'
    ).map((item) => item.name)

    // 修改对应state中的状态
    state.selectedKeys = [currentMeun.name]
    // 根据选中节点,展开对应的父节点（目前只有2级菜单）
    state.openKeys = openKeys
  }

  // 处理左侧main导航菜单栏 选中项问题
  if (menus && menus.length) {
    menus.forEach((item) => {
      if (item.routerPath && router.currentRoute.value.fullPath.indexOf(item.routerPath) > -1) {
        state.selectedKeys = [item.name]

        if (currentMeun) {
          state.selectedKeys = [item.name, currentMeun]
        }
      }
    })
  }
}

export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    BlockOutlined,
    DotChartOutlined,
    ChromeOutlined,
    SplitCellsOutlined,
    AimOutlined,
    UserOutlined,
    FlagOutlined,
    AuditOutlined,
    FolderOutlined,
    FileOutlined,
    ContainerOutlined,
    SyncOutlined,
    CarryOutOutlined,
    BulbOutlined,
    FormOutlined
  },
  props: {
    // menus 为 Array<MeunType> 格式
    menus: {
      type: Array,
      default: () => {
        return []
      }
    },
    collapsed: {
      type: Boolean,
      default: false
    }
    /* 缩放不支持固定宽度  样式变量：@ant-menu-width - 默认展开时的菜单宽度
    width: {
      type: Number,
      default: 200
    }
    */
  },
  setup(props, { emit }) {
    const newMenus = ref(props.menus as Array<MeunType>)

    // const menusWidth = computed(() => { return props.width + 'px' })
    const state = reactive({
      menuCollapsed: false,
      selectedKeys: [''],
      openKeys: [''],
      preOpenKeys: ['']
    })

    handleRouterChange(state, newMenus.value, router)

    // 动态路由，激活服务按钮
    watch(
      () => props.menus,
      () => {
        newMenus.value = props.menus as Array<MeunType>
        handleRouterChange(state, newMenus.value, router)
      },
      { immediate: true }
    )

    // 监听路由变化，激活服务按钮
    watch(
      () => router.currentRoute.value.path,
      () => {
        handleRouterChange(state, newMenus.value, router)
      },
      { immediate: true }
    )

    // 监听展开栏内容，记录当前展开状态，缩放菜单栏时恢复原来状态
    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal
      }
    )

    // 同步props.collapsed与menuCollapsed
    watch(() => props.collapsed,
      (_val) => {
        state.menuCollapsed = _val
      }
    )

    const toggleCollapsed = () => {
      state.menuCollapsed = !state.menuCollapsed
      state.openKeys = state.menuCollapsed ? [] : state.preOpenKeys
      emit('toggleCollapsed', state.menuCollapsed)
    }

    // 菜单路由跳转
    const hangleMenuItemClick = (meunItem: MeunItemType) => {
      if (meunItem.routerName) {
        router.push({ name: meunItem.routerName as string, query: meunItem.query })
      }
    }
    return {
      newMenus,
      // menusWidth,
      ...toRefs(state),
      toggleCollapsed,
      hangleMenuItemClick
    }
  }
})
</script>
<style lang="less" scoped>
@ant-menu-width: 210px;
@ant-menu-item-width: @ant-menu-width - 70px;
@ant-menu-sub-item-width: @ant-menu-item-width - 20px;

.ant-menu {
  height: 100%;
  // font-weight: bold;
}

.menu {
  // background: #32323a;
  min-height: 100%;
  padding-top: 5px;
  font-size: 16px;
}

.ant-menu {
  :deep(.ant-menu-submenu-title > .ant-menu-title-content) {
    padding-right: 10px;
    width: @ant-menu-sub-item-width;
  }

  :deep(.ant-menu-item > .ant-menu-title-content) {
    padding-right: 10px;
    width: @ant-menu-item-width;
  }

  :deep(.ant-menu-dark .ant-menu-item){
    padding-top: 30px;
    padding-bottom: 30px;
    margin: 0;
    border: solid #35353d 1px;
  }
  :deep(.ant-menu-dark .ant-menu-item){
    color: #fff;
  }

  // 覆盖不了
  :deep(.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected) {
    background: #386cbd;
  }
}

.icon {
  font-size: 20px;
}

.open-btn-warp{
  z-index: 9999;
  position: absolute;
  padding: 5px 25px;
  bottom: 5px;
  .open-btn {
    border: 0;
    background: transparent;
    font-size: 25px;
    color: aliceblue;
    width: 55px;
    height: 55px;
    vertical-align: baseline;
    background: transparent;
    cursor: pointer;
  }
}
</style>
