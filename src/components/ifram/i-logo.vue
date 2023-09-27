<!--
 * @Description: 框架-统一LOGO组件
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
    <div class="logo" :style="{ height: height + 'px' }">
        <img :src="getSrc('/img/logo.png')" />
    </div>
</template>
<script lang="ts" setup>
import { getSrc } from '@/utils/imgUtils'

defineProps({
  height: {
    type: Number, // 参数类型
    default: 40, // 默认值
    required: false // 是否必传
  }
})
</script>

<style lang="less">
.logo {
    display: inline-block;

    img {
        height: 100%;
    }
}
</style>
