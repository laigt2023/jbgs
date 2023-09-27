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
    <div ref="serverSlideWarpBoxRef" class="slide-box-warp"   v-bind:style="'min-height:'+ slideBoxWarpHeight + 'px'">
      <section ref="serverSlideBoxRef"  class="slide-box">
          <div v-for="appList,i in pages" :key="i" class="server-meuns">
            <a-row type="flex" justify="center" align="top" style="width: 100%;">
              <a-col v-for=" item in appList" :key="item.id" class="server-item-warp">
                <div class="server-item" @click="openOuterLink(item)">
                  <div class="img-warp">
                    <img :src="item.homepageIcon">
                  </div>
                  <div class="title">
                    {{ item.system }}
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
      </section>
    </div>
  </div>

</template>
<script name="ServerNav" lang="ts" setup>
import Velocity from 'velocity-animate'

import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue'
import serverApi from '@api/market/serverApi'
import { openApp } from '../../portal/serverMarket/comps/appUtils'
import { message } from 'ant-design-vue'

const serverSlideWarpBoxRef = ref()
const serverSlideBoxRef = ref()
const slideBoxWarpHeight = ref(400)
// 每页显示的数量
const PAGE_SIZEE = 8

// 获取偏移后的位置
const getSidePosition = (type: 'forward' | 'back') => {
  let currentPosition = serverSlideBoxRef.value.style.left || '0'
  currentPosition = currentPosition.replaceAll('px', '')

  const SLIDE_STEP_WIDTH = serverSlideWarpBoxRef.value.clientWidth

  let result
  if (type === 'forward') {
    result = Number(currentPosition).valueOf() + SLIDE_STEP_WIDTH
  }
  if (type === 'back') {
    result = Number(currentPosition).valueOf() - SLIDE_STEP_WIDTH
  }

  // 向左偏移超出最大宽度时，不进行偏移（偏移后的页面会没有内容）
  if (result > 0) {
    if (pages.value && pages.value.length && pages.value.length > 1) {
      message.success('这是最前一页,请向右滑动')
    }
    return currentPosition
  }

  // 向右不能偏移超出最大宽度时，不进行偏移（偏移后的页面会没有内容）
  if (pages.value.length * SLIDE_STEP_WIDTH + result < SLIDE_STEP_WIDTH) {
    if (pages.value && pages.value.length && pages.value.length > 1) {
      message.success('这是最后一页,请向左滑动')
    }
    return currentPosition
  }

  return result <= 0 ? result : 0
}
// 右按钮-向右偏移
const onRightSlide = () => {
  const left = (getSidePosition('back') + 'px')
  Velocity(serverSlideBoxRef.value, { left }, { duration: 300 }).then(() => {
    // serverSlideBoxRef.value.style.left = left
  })
}

// 左按钮-左偏移
const onLeftSlide = () => {
  const left = (getSidePosition('forward') + 'px')
  Velocity(serverSlideBoxRef.value, { left }, { duration: 300 }).then(() => {
    // serverSlideBoxRef.value.style.left = left
  })
}

const openOuterLink = (row) => {
  openApp(row)
}

const pages = ref([] as any)

const loadApp = () => {
  serverApi.myCollectList({}).then((res) => {
    const list = res.data
    pages.value = splitArray(list, PAGE_SIZEE)
    nextTick().then(() => {
      window.dispatchEvent(new Event('resize'))
    })
  })
}

// 将一维数组转换为二维数组
const splitArray = (arr:Array<any>, len) => {
  const a_len = arr.length
  const result:Array<any> = []
  for (let i = 0; i < a_len; i += len) {
    result.push(arr.slice(i, i + len))
  }
  return result
}

loadApp()

// 监听浏览器窗口变化
const resizeFn = () => {
  if (serverSlideBoxRef.value && serverSlideBoxRef.value) {
    slideBoxWarpHeight.value = serverSlideBoxRef.value.clientHeight
  }
}

onMounted(() => {
  // 添加窗口大小监测方法监测
  window.addEventListener('resize', resizeFn, false)
})

// 移除方法
onUnmounted(() => {
  window.removeEventListener('resize', resizeFn, false)
})
</script>
<style lang="less" scoped>
.server-nav {
  position: relative;
  min-height: 50vh;
}

.right-btn,
.left-btn {
  color: #696ca7;
  font-size: 80px;
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
  right: -80px;
  top:50%;
  transform: translateY(-50%);
}

.left-btn {
  top:50%;
  transform: translateY(-50%);
  left: -80px;
}

.slide-box-warp{
  position: relative;
  overflow: hidden;
  min-height: 50vh;
  margin-bottom: 3vw
}

.slide-box {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 1000vw;
  overflow: hidden;
}

.server-meuns {
  width: calc(80vw);
  position: relative;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  .server-item-warp {
    display: flex;
    // 100 / PAGE_SIZEE / 2 * 100%    每页2行8个
    width: 25%;
    justify-content: space-between;
    align-items: center;
    padding: 2vh 3vw 2vh 3vw;
  }

  .server-item {
    display: flex;
    position: relative;
    top:0;
    justify-content: space-between;
    flex-direction: column;
    opacity: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(0,0,115,0.6);
    border-radius: 5px;
    height: 10vw;
    width: 100%;
    min-width: 100px;
    min-height: 80px;

    .title {
      display: flex;
      // margin-left: 30px;
      font-size: 1.2vw;
      color: #fff;
      // width: 100px;
    }
    .img-warp{
      display: flex;
      margin-bottom: 10px;

      img {
        height: 6vw;
        min-height: 30px;
        max-height: 60px;
      }
    }

    &:hover {
      background: rgba(31,6,185,0.5);
      top:-20px;
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
