<!--
 * @Description: 异常数据列表
 * @Author: laigt
 * @Date: 2023-09-25
-->
<template>
    <outer-frame>
      <inner-frame>
        <template #left>
          <left-menu :menus="gatherMenus"></left-menu>
        </template>
        <router-view></router-view>
      </inner-frame>
    </outer-frame>
  </template>
<script name="DatarCenter" setup lang="ts">

import OuterFrame from '../../components/ifram/outer-frame.vue'
// import OuterFrame from '@components/ifram/outer-frame.vue'
import InnerFrame from '../../components//ifram/inner-frame.vue'
import LeftMenu from '../../components/ifram/left-menu.vue'
// import gatherMenus from '@/meuns/data'
import gatherMenus from '../../meuns/gather'

</script>
<style lang="less" scoped>

</style>
