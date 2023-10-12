<!--
 * @Description: 工单统计-处理人统计
 * @Author: laigt
 * @Date: 2023-04-24
-->
<template>
    <div ref="auditedStatisticsChart" class="content" :style="{height : props.height+'px',width : props.width+'px'}">
      <h1>统计数据</h1>
    </div>
  </template>
<script setup lang="ts" name="AuditedStatistics">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import gatherApi from '../../../api/gather/gatherApi'

const props = defineProps({
  height: {
    type: String || Number,
    default: '300'
  },
  width: {
    type: String || Number,
    default: '500'
  },
  titilColor: {
    type: String,
    default: '#464646'
  }
})

const auditedStatisticsChart = ref()
let chartInstance

const option = {
  title: {
    text: '异常数据比例',
    left: 'center',
    textStyle: {
      color: props.titilColor
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: '10%',
    textStyle: {
      color: props.titilColor
    }
  },
  series: [
    {
      name: '异常数据比例',
      type: 'pie',
      radius: '70%',
      data: [
        { value: 735, name: '异常数据', itemStyle: { color: '#ee6666' } },
        { value: 1048, name: '正常数据', itemStyle: { color: '#91cc75' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const autoResetSize = () => {
  chartInstance.resize()
}

const refreshChartOption = () => {
  chartInstance.showLoading()

  gatherApi.statistics({}).then((res) => {
    if (res) {
      let correctCount = 0
      let errorCount = 0

      res.forEach((item) => {
        correctCount += item.correctCount
        errorCount += item.errorCount
      })

      option.series[0].data = []
      option.series[0].data.push({
        name: '正常数据',
        value: correctCount,
        itemStyle: { color: '#91cc75' }
      })
      option.series[0].data.push({
        name: '异常数据',
        value: errorCount,
        itemStyle: { color: '#ee6666' }
      })
    }
  }).finally(() => {
    chartInstance.setOption(option)

    chartInstance.hideLoading()
  })
}

onMounted(() => {
  const chartDom = auditedStatisticsChart.value
  chartInstance = echarts.init(chartDom)
  refreshChartOption()
  window.addEventListener('resize', autoResetSize)
})

// 销毁window上的resize方法
onUnmounted(() => {
  window.removeEventListener('resize', autoResetSize)
})

defineExpose({
  refreshChartOption
})
</script>
<style lang="less" scoped>
// .content {
//   min-height: 300px;
//   min-width : 500px;
// }
</style>
