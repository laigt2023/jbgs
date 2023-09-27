
<!--
 * @Description: 框架-头部导航
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
  <header class="topic-warp">
    <div class="topic">
      <section class="topic-left">
        <!-- <logo></logo> -->
        <span class="title">{{ CONFIG.appName }}</span>
      </section>

      <section class="topic-right">
        <a-dropdown>
          <div class="user-info">
            <div class="user-text">
              <heart-outlined class="user-icon" />
              <span class="text">{{ userStore.nickname || userInfo.username ||"加载中" }}</span>
              <caret-down-outlined style="color: #fff; margin: 6px 5px" />
            </div>
          </div>
        <template v-if="false" #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handelUserInfo">
                <user-outlined class="margin-right-10"/>
                个人信息
              </a-menu-item>
              <a-menu-item v-if="false" key="2" @click="handelPasswordChange">
                <form-outlined class="margin-right-10"  />
                修改密码
              </a-menu-item>
              <!-- <a-menu-item v-if="false" key="3" @click="handleLayout">
                <appstore-outlined class="margin-right-10" />
                布局配置
              </a-menu-item> -->
              <a-menu-item v-if="false" key="3" @click="logoutClickHandle">
                <logout-outlined class="margin-right-10" />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <div class="user-info" @click="logoutClickHandle">
          <div class="user-text">
              <logout-outlined class="user-icon" />
            <span class="text">退出</span>
          </div>
        </div>
      </section>
    </div>
    <popup-user-password-change ref="popupUserPasswordChangeRef" />
    <!-- <i-cfg-drawer ref="drawerRef" :show-button="false"></i-cfg-drawer> -->
  </header>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useUserStore, useAppStore } from '@store/index'
// import logo from '@/components/ifram/i-logo.vue'
// import ICfgDrawer from '@components/ifram/i-cfg-drawer.vue'
import router from '@/router'
import CONFIG from '@/config'

import PopupUserPasswordChange from './popup/PopupUserPasswordChange.vue'

// const drawerRef = ref<InstanceType<typeof ICfgDrawer>>() // 抽屉组件实例
// 处理布局设置方法
// const handleLayout = () => {
//   drawerRef.value?.switchDrawer()
// }

const userStore = useUserStore()

const popupUserPasswordChangeRef = ref<InstanceType<typeof PopupUserPasswordChange>>()
const handelPasswordChange = () => {
  popupUserPasswordChangeRef.value?.popup()
}

// 添加对useAppStore.state.themeColor 的状态监听
const currentThemeColor = ref(useAppStore().themeColor)
const unsubscribe = useAppStore().$subscribe((mutation, state) => {
  if (currentThemeColor.value !== state.themeColor) {
    currentThemeColor.value = state.themeColor
  }
})

// 用户信息
const userInfo = ref({ username: '', nickname: '' })
userInfo.value.username = useUserStore().username || ''
userInfo.value.nickname = useUserStore().nickname || ''

const unsubscribeUserInfo = useUserStore().$subscribe(() => {
  userInfo.value.username = useUserStore().username || ''
  userInfo.value.nickname = useUserStore().nickname || ''
})

// 待办工单和待通知数量
const munState = ref({
  orderNum: 0,
  messageNum: 0
})

// 获取数量信息
// useAppStore().fetchOrderNum()
// useAppStore().fetchMessageNum()

munState.value.orderNum = useAppStore().orderNum
munState.value.messageNum = useAppStore().messageNum

const unsubscribeNum = useAppStore().$subscribe(() => {
  munState.value.orderNum = useAppStore().orderNum
  munState.value.messageNum = useAppStore().messageNum
})

onUnmounted(() => {
  unsubscribe()
  unsubscribeUserInfo()
  unsubscribeNum()
})

// 退出按钮操作方法
const logoutClickHandle = () => {
  userStore.logout().then(() => {
    // userStore.checkLogin()
  })
}

// 个人信息页面跳转
const handelUserInfo = () => {
  router.push({ name: 'personalMyUserInfo' })
}

/**
 * 路由跳转
 * @param routerName
 */
// const handelRouterTo = (routerName:string) => {
//   router.push({ name: routerName })
// }

</script>
<style lang="less" scoped>
@item-height:60px;
.margin-right-10 {
  margin-right: 10px;
}

.topic-warp {
  // background: #000;
  background: linear-gradient(90deg, #262626, #555, #262626);
}

.title {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  padding-left: 30px;
  display: block; //成为“块级”元素(block-level)；span元素的默认display属性值为“inline”，
  max-width: 15em; //限制字数
  overflow: hidden; //对溢出内容的隐藏
  white-space: nowrap; //只保留一个空白，文本不会换行，会在在同一行上继续，直到遇到br标签为止。
  text-overflow: ellipsis; //使得超出部分用“ … ”代替
}

:deep(.server-info .anticon-caret-down){
  line-height: 22px;
}

:deep(.user-info .anticon-caret-down){
  line-height: 20px;
}

.topic {
  background: #262626;
  // background: url(/img/banner-bg.png);
  // background: url(/img/inside/bg.png) no-repeat 100% 100%;
  background-image: linear-gradient(to right bottom, #7d31d9, #2b63ba);
  // background-size: 50% 100%;
  // background-size:cover;
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  min-width: 800px;

  .topic-left {
    margin: 10px 40px 10px 30px;
    display: flex;
    width: 30%;
    max-width: 400px;
  }

  .topic-middle {
    display: flex;

    .server-info {
      height: @item-height;
      line-height: 30px;
      .server-text {
        display: flex;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        padding: 15px 15px 15px 25px;
        transition: background 0.3;
        height: 100%;
        cursor: pointer;

        &.active {
          background: #2d3139;
        }

        &:hover {
          background: #393e48;
        }
      }
    }
  }

  .topic-right {
    display: flex;
    flex: 1;
    justify-content: end;

    .right-content {
      display: block;
      height: 100%;
      width: 500px;
      padding-right: 10px;
    }
  }

  .user-info {
    font-size: 18px;
    height: @item-height;
    color: #fff;
    .user-text {
      display: flex;
      padding: 15px;
      transition: background 0.3;
      height: 100%;
      cursor: pointer;
      .text {
        margin-left: 10px;
      }
      .text-message{
        margin-left: 18px;
      }
      &:hover {
        background: #393e48;
      }
    }
    .user-icon{
      margin-top: 3px;
      color: #fff;
      font-size: 22px;
    }
  }
}

:deep(.ant-scroll-number){
  right: -15px;
  top: 0px;
  transform: scale(0.7);
}
</style>
