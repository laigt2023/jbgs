<!--
 * @Description: 工单统计-处理人统计
 * @Author: laigt
 * @Date: 2023-04-24
-->
<template>
    <div ref="countStatisticsChart" class="content" :style="{height : props.height+'px',width : props.width+'px'}">
      <h1>统计数据</h1>
    </div>
  </template>
<script setup lang="ts" name="AuditedStatistics">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import gatherApi from '../../../api/gather/gatherApi'

const countStatisticsChart = ref()
let chartInstance

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

const option = {
  title: {
    text: '采集数据总数',
    left: 'center',
    textStyle: {
      color: props.titilColor
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false,
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '采集总数',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: true,
      label: {
        show: true,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      },
      data: [{
        name: '采集总数',
        value: 1,
        itemStyle: { color: '#73c0de' }
      }]
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
      let count = 0
      res.forEach((item) => {
        count += item.correctCount + item.errorCount
      })

      option.series[0].data = []
      option.series[0].data.push({
        name: '采集总数:' + count,
        value: count,
        itemStyle: { color: '#73c0de' }
      })
    }
  }).finally(() => {
    chartInstance.setOption(option)

    chartInstance.hideLoading()
  })
}

onMounted(() => {
  const chartDom = countStatisticsChart.value
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
