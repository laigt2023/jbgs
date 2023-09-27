<!--
 * @Description: 框架-APP入口
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <div class="main">
    <router-view> </router-view>
  </div>
  <!-- <i-cfg-drawer v-if="showCfg"></i-cfg-drawer> -->
</template>
<script name="app" setup>
import { provide } from 'vue'
// import router from './router'

const MOCK_USER = {
  userId: '1',
  username: 'admin',
  realName: '系统管理员'
}
provide('userInfo', MOCK_USER)

// router.push({ name: 'home' })
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  min-width: 1000px;
}
</style>
