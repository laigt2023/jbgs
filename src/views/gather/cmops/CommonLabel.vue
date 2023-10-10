<!--
 * @Description: 内容组件
 * @Author: laigt
 * @Date: 2023-10-09
-->
<template>
  <div class="common-label">
    <img :src="getSrc('/img/label-left.png')" width="20" :height="props.height" alt="">
    <component :is="props.icon" :style="{'font-size':props.iconSize + 'px'}" class="icon"/>
    <span class="text" :style="{'font-size':props.fontSize + 'px'}">
      {{ props.text }}
    </span>
  </div>
  </template>
<script setup lang="ts" name="CommonLabel">
import { getSrc } from '@/utils/imgUtils'

const props = defineProps({
  icon: {
    type: String,
    default: 'HddOutlined'
  },
  text: {
    type: String,
    default: '文本'
  },
  height: {
    type: String,
    default: '100'
  },
  iconSize: {
    type: String,
    default: '60'
  },
  fontSize: {
    type: String,
    default: '25'
  }
})

defineExpose({
  show: () => { console.error('common-label') }
})

</script>
<style lang="less">
.common-label{
  display: inline-block;
  color: #fff;
  // background: url(../../../assets/img/label-left.png);
  background: rgba(5, 39, 80,0.7);
  border: #0288bc solid 1px;
  border-left-color: transparent;
  border-radius: 5px;
  min-width: 100px;
  vertical-align: bottom;
  padding-right: 20px;
  min-width: 200px;
  cursor: pointer;

  transition-property: all;
  transition-duration: 0.2s;
  &:hover{
    box-shadow: 5px 5px 20px 5px #0288bc
  }
}

.icon{
  font-size: 60px;
  margin-left: 15px;
  display: inline-block;
  vertical-align: middle;
}
.text{
  padding-left: 10px;
  font-size: 25px;
  padding-bottom: 5px;
  display: inline-block;
  vertical-align: middle;
}
</style>
