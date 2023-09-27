<!--
 * @Description: 框架-首页
 * @Author: laigt
 * @Date: 2023-03-23
-->
<template>
  <div class="home-bg">
    <header class="head">
      <div class="head-left-item">
        <span><calendar-outlined /> 今天是{{ dateDay }}</span>
        <span>{{dateWeeker}}</span>
      </div>

<!--      <div class="head-left-item">-->
<!--        <span><img :src="getSrc('/img/inside/v1/weather.png')"></span>-->
<!--        <span>天气：</span>-->
<!--        <span>湖南长沙湘江新区 晴天</span>-->
<!--        <span>温度: 2-10 °C</span>-->
<!--      </div>-->

      <div class="head-left-item">
        <span><bell-outlined /></span>
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{  scrollMessageText  }}</span>
          </template>
          <div class="scroll-messgae"><span class="message">{{ scrollMessageText }}</span></div>
        </a-tooltip>
      </div>

      <div class="head-right-item">
        <span><heart-filled /> {{ userInfo.nickname || userInfo.username }}</span>
        <span @click="handlLogout"><logout-outlined />退出</span>
      </div>
    </header>
    <section class="content-warp" style="width: 100%">
      <div>
        <div class="logo">
          <img :src="getSrc('/img/inside/logo.png')" />
        </div>
        <server-nav></server-nav>
        <div class="server-box">
          <div
            v-for="d in servers"
            :key="d.routerName"
            class="server-item"
            @click="routerTo(d.routerName)">
              <div>
                <a-badge v-if="d.routerName === 'messageCenter'" style="box-shadow: none;" :count="munState.messageNum" :overflow-count="20">
                  <img :src="getSrc(d.img)" />
                </a-badge>

                <a-badge v-else-if="d.routerName === 'workOrder'" style="box-shadow: none;" :count="munState.orderNum" :overflow-count="20">
                  <img :src="getSrc(d.img)" />
                </a-badge>
                  <img  v-else :src="getSrc(d.img)" />
              </div>
              <div>{{  d.title  }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script name="hone" lang="ts" setup>
import moment from 'moment'
import ServerNav from './compoV1/server-nav.vue'
import { useUserStore, useAppStore } from '@store/index'
import { getSrc } from '@utils/imgUtils'
import { onUnmounted, ref, nextTick } from 'vue'
import ROUTER from '@/router'
import newsApi from '@api/home/newsApi'
import Velocity from 'velocity-animate'

// 内部服务导航
const servers = [
  {
    img: '/img/inside/v1/market.png',
    title: '服务超市',
    routerName: 'serverMarket'
  },
  {
    img: '/img/inside/v1/assets.png',
    title: '资产全景',
    routerName: 'assetsCenter'
  },
  {
    img: '/img/inside/v1/message.png',
    title: '消息中心',
    routerName: 'messageCenter'
  },
  {
    img: '/img/inside/v1/news.png',
    title: '新闻中心',
    routerName: 'newsCenter'
  },
  {
    img: '/img/inside/v1/order.png',
    title: '工单列表',
    routerName: 'workOrder'
  },
  {
    img: 'img/inside/v1/user.png',
    title: '个人中心',
    routerName: 'personalCenter'
  }
]

const routerTo = (routerName: string) => {
  // 打开新标签页
  // const { href } = ROUTER.resolve({ name: routerName })
  // window.open(href, '_blank')

  ROUTER.push({ name: routerName })
}

const dateWeeker = ' 星期' + '日一二三四五六'.charAt(new Date().getDay())
const dateDay = moment(new Date()).format('YYYY年MM月DD日')
const scrollMessageText = ref('')

// 获取滚动消息
const fetchScrollMessage = () => {
  newsApi.newest().then((res: any) => {
    scrollMessageText.value = res.data.content
    // scrollMessageText.value = '欢迎登陆，很高兴见到您！请注意保护账号安全，避免泄露个人信息和密码。祝您使用愉快！'
    nextTick().then(() => {
      checkScrollActive()
    })
  })
}
// 检测消息是否需要滚动
const checkScrollActive = () => {
  const scrollMessage = document.querySelector('.scroll-messgae') as HTMLElement
  const message = scrollMessage.children[0] as HTMLElement

  if (message.clientWidth > scrollMessage.clientWidth) {
    const duration = (message.clientWidth / scrollMessage.clientWidth) * 10000
    Velocity(message, { left: -message.clientWidth - 100 + 'px' }, {
      duration,
      delay: 3000,
      easing: 'linear',
      complete: function() {
        message.style.left = '0'
        checkScrollActive()
      }
    })
  }
}

fetchScrollMessage()

// const outerLink = (url:string) => {
//   window.open(url)
// }

// 个人用户信息
const userInfo = ref({ username: '', nickname: '' })
userInfo.value.username = useUserStore().username || ''
userInfo.value.nickname = useUserStore().nickname || ''

const unsubscribeUserInfo = useUserStore().$subscribe(() => {
  userInfo.value.username = useUserStore().username || ''
  userInfo.value.nickname = useUserStore().nickname || ''
})

const handlLogout = () => {
  useUserStore().logout().then(() => {
    // useUserStore().checkLogin()
  })
}

// 待办工单和待通知数量
const munState = ref({
  orderNum: 0,
  messageNum: 0
})

// 获取数量信息
useAppStore().fetchOrderNum()
useAppStore().fetchMessageNum()

munState.value.orderNum = useAppStore().orderNum
munState.value.messageNum = useAppStore().messageNum

const unsubscribeNum = useAppStore().$subscribe(() => {
  munState.value.orderNum = useAppStore().orderNum
  munState.value.messageNum = useAppStore().messageNum
})

onUnmounted(() => {
  unsubscribeUserInfo()
  unsubscribeNum()
})

</script>
<style lang="less" scoped>
.head{
  background: #000073;
  color: #edf1f1;
  font-size: 18px;
  padding: 10px;
  .head-left-item,.head-right-item{
    cursor: pointer;
    :hover{
      color: #fff;
    }
  }
  .head-left-item{
    display: inline-block;
    margin-right: 30px;
    span{
      margin: 3px;
    }
    img{
      height: 13vh;
      margin-bottom: 3px;
    }
  }
  .head-right-item{
    margin-right: 10px;
    float: right;
    span{
      margin: 0 8px;
    }
  }
}
.logo {
  text-align: center;
  padding-top: 0.5vw;
  padding-bottom: 1vh;
  width: 100%;
  img {
    height: 8vh;
    min-height: 40px;
    max-height: 100px;
  }
}

.home-bg {
  min-height: 100vh;
  background: rgba(0, 0, 115, 0.9);
  background-size: 100% 100%;
  overflow: auto;
}

.content-warp {
  /*
  background: url('../../../img/inside/home-bg.png');
  background-size: cover;
  */
  background: url("../../../img/inside/v1/home-bg.png") no-repeat;

  background-size: 100% 100%;

  padding: 20px 10%;
}

.server-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh 30px 1vh 30px;
  .server-item{
    display: flex;
    position: relative;
    top:0;
    justify-content: space-between;
    flex-direction: column;
    opacity: 1;
    justify-content: center;
    align-items: center;
    font-size: 1.5vw;
    color: #fff;
    cursor: pointer;
    position: relative;
    top: 0;
    &:hover{
      top:-10px;
      text-shadow: 2px 8px 8px #0cb0e3;
      /* 设置过渡属性 */
      transition-property: all;
      /*设置过渡时长 */
      transition-duration: 0.2s;
      /* 过渡变化速率 */
      transition-timing-function: linear;
    }

    img{
      height: 10vh;
      min-height: 40px;
      margin-bottom: 10px;
    }
  }
}

.scroll-messgae{
  display: inline-block;
  height: 25px;
  padding-top: 2px;
  font-size: 15px;
  position: relative;
  width:40vw;
  max-width: 500px;
  min-width: 300px;
  overflow: hidden;
  .message{
    position: absolute;
    left: 0;
    white-space: nowrap;
    /* 设置动画 改为 js 动画
    &.active{
      animation-name: scroll-messgae-animation; // 动画名称
      animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
      animation-delay: 0s; // 动画延迟时间
      animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
      animation-duration: 10s; // 动画完成时间
    }
    */
  }
}
@keyframes scroll-messgae-animation{
  0% {
    left:0
  }
  20% {
    left:0
  }
  80% {
    left:calc(-100%)
  }
  100% {
    left:calc(-100%)
  }
}
.main {
  overflow-x: hidden;
}

</style>
