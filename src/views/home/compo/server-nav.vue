<!--
 * @Description: 框架-首页
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <div class="server-nav">

    <div class="left-btn" @click="onLeftSlide">
      <left-outlined />
    </div>

    <div class="right-btn" @click="onRightSlide">
      <right-outlined />
    </div>

    <section class="slide-box">
      <div ref="serverMeunsRef" class="server-meuns" >
        <div v-for=" (item, index) in serverList" :key="index" class="server-item-warp" >

          <div class="server-item" @click="openOuterLink(item.outerLink)">
              <img :src="item.img">
              <div class="title">
                {{ item.title }}
              </div>
            </div>
        </div>
      </div>
    </section>
  </div>

</template>
<script name="ServerNav" lang="ts" setup>
import Velocity from 'velocity-animate'
import { ref } from 'vue'

import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue'

const SLIDE_STEP_WIDTH = 900

const serverMeunsRef = ref()

const getSidePosition = (type: 'forward' | 'back') => {
  let currentPosition = serverMeunsRef.value.style.left || '0'

  const MAX_POSITION = serverMeunsRef.value.scrollWidth

  currentPosition = currentPosition.replaceAll('px', '')

  let result
  if (type === 'forward') {
    result = Number(currentPosition).valueOf() + SLIDE_STEP_WIDTH
  }
  if (type === 'back') {
    result = Number(currentPosition).valueOf() - SLIDE_STEP_WIDTH
  }

  // 向左偏移超出最大宽度时，不进行偏移（偏移后的页面会没有内容）
  if (result + MAX_POSITION < 0) {
    return currentPosition
  }

  return result <= 0 ? result : 0
}

const onRightSlide = () => {
  Velocity(serverMeunsRef.value, { left: (getSidePosition('back') + 'px') }, { duration: 300 })
}
const onLeftSlide = () => {
  Velocity(serverMeunsRef.value, { left: (getSidePosition('forward') + 'px') }, { duration: 300 })
}

const openOuterLink = (url:string) => {
  console.error(url)
  if (url) {
    window.open(url, '_blank')
  }
}

const serverList = [
  {
    title: '12345',
    routerNmae: '',
    outerLink: '',
    img: '/img/inside/demo/icons/12345.png'
  },
  {
    title: '环境保护',
    routerNmae: '',
    outerLink: '',
    img: '/img/inside/demo/icons/environment.png'
  }, {
    title: '民生服务',
    routerNmae: '',
    outerLink: '',
    img: '/img/inside/demo/icons/people.png'
  }, {
    title: '企业服务',
    routerNmae: '',
    outerLink: 'http://172.19.4.8/platform#/',
    img: '/img/inside/demo/icons/enterprise.png'
  }, {
    title: '安全管理',
    routerNmae: '',
    outerLink: '',
    img: '/img/inside/demo/icons/security.png'
  }, {
    title: '驾驶舱',
    routerNmae: '',
    outerLink: '/cockpit.html',
    img: '/img/inside/demo/icons/more.png'
  }, {
    title: '数据资源管理系统',
    routerNmae: '',
    outerLink: 'http://172.19.4.11/dexchange/portal/',
    img: '/img/inside/demo/icons/more.png'
  }, {
    title: 'AI服务',
    routerNmae: '',
    outerLink: 'http://172.19.4.19/',
    img: '/img/inside/demo/icons/ai.png'
  }
]

</script>
<style lang="less" scoped>
.server-nav {
  position: relative;
}

.right-btn,
.left-btn {
  color: #696ca7;
  font-size: 50px;
  position: absolute;
  cursor: pointer;
  padding-top: 1vw;

  &:hover {
    color: #8b8dbc;
    /* 设置过渡属性 */
    transition-property: color;
    /*设置过渡时长 */
    transition-duration: 0.2s;
    /* 过渡变化速率 */
    transition-timing-function: linear;
  }
}

.right-btn {
  right: -50px;
}

.left-btn {
  left: -50px;
}

.slide-box {
  position: relative;
  overflow: hidden;
  min-height: 200px;
  width: 100%;

  .server-meuns {
    position: absolute;
    left: 0;
  }
}

.server-meuns {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .server-item-warp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
  }

  .server-item {
    display: flex;
    justify-content: space-between;
    opacity: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #316ddb;
    border-radius: 5px;
    height: 130px;
    width: 298px;

    // border: solid slategray 1px;{}
    img {
      height: 50px;
    }

    .title {
      margin-left: 30px;
      font-size: 25px;
      color: #fff;
      width: 100px;
    }

    &:hover {
      background: #608bf0;
      cursor: pointer;
      /* 设置过渡属性 */
      transition-property: all;
      /*设置过渡时长 */
      transition-duration: 0.2s;
      /* 过渡变化速率 */
      transition-timing-function: linear;
    }
  }
}
</style>
