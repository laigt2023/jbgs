<!--
 * @Description: 工单列表-全部工单
 * @Author: laigt
 * @Date: 2023-10-09
-->
<template>
  <div class="content-warp">
    <div class="full-screen">
      <div class="title">{{title}}</div>

      <div class="message-bar"> 数据更新时间 ( 30s/次 ) : {{dateInfo.updateDatetime}}</div>
      <div class="message-bar"> 当前新时间 ：{{dateInfo.currentTime}}</div>

      <common-label id="DbHtmlRef" ref="DbHtmlRef" icon-size="40" font-size='20' :style="getPositionDb" icon="HddOutlined"  text='数据库同步 (0)'/>

      <common-label id="CSVHtmlRef" ref="CSVHtmlRef" icon-size="40" font-size='20' :style="getPositionExcel" icon="FileTextOutlined" :text="'CSV录入('+ (countInfo.success + countInfo.error) +')'"  @click="()=>{routerTo('pendingDataList')}"/>

      <CountStatisticsChart :titil-color="'#fff'" height='180' width='200' class="count-chart" />

      <StatisticsChart :titil-color="'#fff'" height='300' width='340' class="statistics-chart" />

      <common-label id="platformRef" height="140" icon-size="100" :style="{ position: 'absolute', left:'500px', top:'150px' }" icon="ClusterOutlined"  text='数据管理平台'/>

      <common-label id="vailRef" height="100" icon-size="60" :style="{ position: 'absolute', left:'520px', top:'340px' }" icon="DeleteRowOutlined"  text='数据平台校验'/>

      <common-label id="rulsRef" height="40" icon-size="25" font-size='15' :style="{ position: 'absolute', left:'900px', top:'270px' ,color:'#ffe58f'}" icon="FileSearchOutlined"  text='映射表 校验规则'/>
      <common-label id="ruls2Ref" height="40" icon-size="25" font-size='15' :style="{ position: 'absolute', left:'900px', top:'320px',color:'#ffe58f' }" icon="FileSearchOutlined"  text='格式 校验规则'/>
      <common-label id="ruls3Ref" height="40" icon-size="25" font-size='15' :style="{ position: 'absolute', left:'900px', top:'370px',color:'#ffe58f' }" icon="FileSearchOutlined"  text='关联限定 校验规则'/>
      <common-label id="ruls4Ref" height="40" icon-size="25" font-size='15' :style="{ position: 'absolute', left:'900px', top:'420px',color:'#ffe58f' }" icon="FileSearchOutlined"  text='取值限定 校验规则'/>
      <common-label id="ruls5Ref" height="40" icon-size="25" font-size='15' :style="{ position: 'absolute', left:'900px', top:'470px',color:'#ffe58f' }" icon="FileSearchOutlined"  text='更多校验规则。。。'/>

      <common-label id="successDataRef" height="80" icon-size="40" font-size='22' :style="{ position: 'absolute', left:'280px', top:'550px',color:'#b7eb8f' }" icon="CheckOutlined"  :text="'正常数据 '+ toFixed(countInfo.success / (countInfo.success + countInfo.error))  +'% (' + countInfo.success + ')'"/>

      <common-label id="errorDataRef" height="80" icon-size="40" font-size='22' :style="{ position: 'absolute', left:'740px', top:'550px',color:'#ffccc7' }" icon="ExclamationCircleOutlined"  :text="'异常数据 ' + toFixed(countInfo.error / (countInfo.success + countInfo.error))  +'% (' + countInfo.error + ')'" @click="()=>{routerTo('errorDataList')}"/>

      <common-label id="endRef" height="80" icon-size="50"  font-size='24' :style="{ position: 'absolute', left:'295px', top:'660px' }" icon="CloudUploadOutlined"  text="正常上报平台"/>

      <common-label id="alarmRef" height="80" icon-size="40"  font-size='22' :style="{ position: 'absolute', left:'775px', top:'660px' }" icon="NotificationOutlined"  :text="'异常告警 (' + countInfo.error + ')'"/>

      <common-label id="noticeRef" height="80" icon-size="40"  font-size='22' :style="{ position: 'absolute', left:'780px', top:'780px' }" icon="MailOutlined"  text="通知责任人"/>

      <template v-for = "(line,i) in lineArray " :key="i + '_line'">
        <div v-html="line.html"></div>
      </template>
    </div>
    <div class="full-screen-content">

    </div>
  </div>
  </template>
<script setup lang="ts" name="WorkOrderAllPage">
import moment from 'moment'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import CommonLabel from './cmops/CommonLabel.vue'
import CountStatisticsChart from './statistics/CountStatisticsChart.vue'
import StatisticsChart from './statistics/StatisticsChart.vue'
import router from '@/router'
import gatherApi from '../../api/gather/gatherApi'

const countInfo = ref({
  taskId: null,
  success: 0,
  error: 0
})

const dateInfo = ref({
  taskId: null,
  updateDatetime: '--',
  currentTime: moment().format('YYYY-MM-DD HH:mm:ss')
})

// 加载数据
const loadData = () => {
  gatherApi.statistics({}).then((res) => {
    if (res) {
      let correctCount = 0
      let errorCount = 0

      res.forEach((item) => {
        correctCount += item.correctCount
        errorCount += item.errorCount
      })

      countInfo.value.success = correctCount
      countInfo.value.error = errorCount

      dateInfo.value.updateDatetime = moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }).catch(() => {
    dateInfo.value.updateDatetime = '最新数据获取失败'
  })
}

// 重复获取当前时间
const taskId = setInterval(() => {
  dateInfo.value.currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
}, 1000)

// 重复加载数据 30s/一次
const loadDataTaskId = setInterval(() => {
  loadData()
}, 30 * 1000)

const title = ref('数据流可视化')

const toFixed = (num) => {
  num = num + ''
  if (num) {
    return num.substring(0, num.indexOf('.') + 5)
  }
  return 0
}

const DbHtmlRef = ref<InstanceType<typeof CommonLabel>>()
const CSVHtmlRef = ref<InstanceType<typeof CommonLabel>>()

const lineArray = ref<Array<{ html : string}>>([])

const getPositionDb = computed(() => {
  const top = '100px'
  const left = '120px'
  return { position: 'absolute', left, top, width: '270px' }
})

const getPositionExcel = computed(() => {
  const top = '220px'
  const left = '120px'
  return { position: 'absolute', left, top, width: '270px' }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const drawLine = (startObj, endObj, direction = 'horizontal') => {
  // 水平起点元素中心坐标
  let y_start = Number(startObj.style.top.replace('px', '')) + startObj.offsetHeight / 2
  let x_start = Number(startObj.style.left.replace('px', '')) + startObj.offsetWidth

  // 水平终点元素中心坐标
  let y_end = Number(endObj.style.top.replace('px', '')) + endObj.offsetHeight / 2
  let x_end = Number(endObj.style.left.replace('px', ''))

  if (direction === 'vertical') {
    // 垂直起点元素中心坐标
    y_start = Number(startObj.style.top.replace('px', '')) + startObj.offsetHeight
    x_start = Number(startObj.style.left.replace('px', '')) + startObj.offsetWidth / 2

    // 垂直终点元素中心坐标
    y_end = Number(endObj.style.top.replace('px', ''))
    x_end = Number(endObj.style.left.replace('px', '')) + endObj.offsetWidth / 2
  }

  // 用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
  const lx = x_end - x_start
  const ly = y_end - y_start
  // 计算连线长度
  const length = Math.sqrt(lx * lx + ly * ly)
  // 弧度值转换为角度值
  const c = 360 * Math.atan2(ly, lx) / (2 * Math.PI)

  // 连线中心坐标
  const midX = (x_end + x_start) / 2
  const midY = (y_end + y_start) / 2
  const deg = c <= -90 ? (360 + c) : c // 负角转换为正角

  return `<div class='line' 
                    style='top:${midY}px;left:${midX - length / 2}px;width:${length}px;transform:rotate(${deg}deg);'>
                </div>`
}

onMounted(() => {
  loadData()

  const DbHtmlDom = document.getElementById('DbHtmlRef')
  const CSVHtmlDom = document.getElementById('CSVHtmlRef')
  const platformDom = document.getElementById('platformRef')

  const vailDom = document.getElementById('vailRef')
  const rulsDom = document.getElementById('rulsRef')
  const ruls2Dom = document.getElementById('ruls2Ref')
  const ruls3Dom = document.getElementById('ruls3Ref')
  const ruls4Dom = document.getElementById('ruls4Ref')
  const ruls5Dom = document.getElementById('ruls5Ref')

  const successDataDom = document.getElementById('successDataRef')
  const errorDataDom = document.getElementById('errorDataRef')

  const alarmDom = document.getElementById('alarmRef')
  const endDom = document.getElementById('endRef')
  const noticeDom = document.getElementById('noticeRef')

  lineArray.value.push({ html: drawLine(DbHtmlDom, platformDom) })
  lineArray.value.push({ html: drawLine(CSVHtmlDom, platformDom) })
  lineArray.value.push({ html: drawLine(platformDom, vailDom, 'vertical') })
  lineArray.value.push({ html: drawLine(vailDom, rulsDom) })
  lineArray.value.push({ html: drawLine(vailDom, ruls2Dom) })
  lineArray.value.push({ html: drawLine(vailDom, ruls3Dom) })
  lineArray.value.push({ html: drawLine(vailDom, ruls4Dom) })
  lineArray.value.push({ html: drawLine(vailDom, ruls5Dom) })

  lineArray.value.push({ html: drawLine(vailDom, successDataDom, 'vertical') })
  lineArray.value.push({ html: drawLine(vailDom, errorDataDom, 'vertical') })

  lineArray.value.push({ html: drawLine(errorDataDom, alarmDom, 'vertical') })
  lineArray.value.push({ html: drawLine(alarmDom, noticeDom, 'vertical') })

  lineArray.value.push({ html: drawLine(successDataDom, endDom, 'vertical') })
})

onUnmounted(() => {
  clearInterval(taskId)
  clearInterval(loadDataTaskId)
})
const routerTo = (routerName) => {
  router.push({ name: routerName })
}
</script>
<style lang="less">
.content-warp{
  min-width: 100px;
  position : relative;
  background: #001529;
}
.full-screen{
  // position : absolute;
  width: 100%;
  height: 90vh;
  min-height: 1000px;
  min-width: 1400px;
  background-image: url('../../assets/img/full-screen.jpg');
  // background-size: cover;
  background-size: 100% 100%;
  z-index: 1;
  opacity:1;

  .title{
    color: #fff;
    padding-top: 2%;
    font-size: 30px;
    text-align: center;
  }
  .message-bar{
    color: #4ef3f5;
    font-size: 17px;
    text-align: right;
    padding-right: 50px;
    margin-bottom: 2px;
  }
}
.full-screen-content{
  z-index: 999;
  position: relative;

  z-index: 2;

}
// .ant-card-body{
//   padding: 0 !important;
// }
// .right-contnet{
//   padding: 0px 0 0 2px !important;
// }
.line{
  position: absolute;
  // height: 4px;
  border-radius: 5px;
  border: #fff dashed 2px ;
  // background: #fff;
}

.count-chart{
  position: absolute;
  background: rgba(5, 39, 80,0.7);

  border: #0288bc solid 2px;
  top:340px;
  left: 140px;
}
.statistics-chart{
  position: absolute;
  background: rgba(5, 39, 80,0.7);

  border: #0288bc solid 2px;
  top:550px;
  left: 1100px;
}
</style>
