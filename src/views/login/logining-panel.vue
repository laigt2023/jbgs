<!--
 * @Description: 组件-登陆认证过度动画
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
    <div ref="loginingRef" class="logining-panel" :class="{ visible: visible, expand: expand }">
        <div style="position: relative">
            <div class="loader">
                <!--spin动画class name “ball-clip-rotate-multiple”-->
                <div class="loader-inner ball-clip-rotate-multiple">
                    <div class="ball-outter1"></div>
                    <div class="ball-outter2"></div>
                    <div class="ball-inner"></div>
                </div>
            </div>
            <p class="word">
                {{ authStatus }}
            </p>
        </div>
    </div>
</template>

<script name="loginPanel" setup lang="ts">
import { ref, watch } from 'vue'
import Velocity from 'velocity-animate'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'loading' // 限制输入内容 'loading','success','error','timeout'
  }
})

const loginingRef = ref(null)
const authStatus = ref('认证中')
const visible = ref(false)
const expand = ref(false)

const statusTextMap = {
  success: '认证成功',
  loading: '认证中',
  error: '认证失败',
  govError: '认证失败',
  timeout: '认证超时'
}

watch(
  () => props.loading,
  (value) => {
    if (value) {
      showLogining()
    } else {
      hidelLogining()
    }
  }
)

watch(
  () => props.status,
  (value) => {
    if (value) {
      showLogining()
    } else {
      hidelLogining()
    }
  }
)

watch(
  () => props.status,
  () => {
    authStatus.value = statusTextMap[props.status] || '状态异常'
  }
)

const showLogining = () => {
  visible.value = true
  expand.value = true

  Velocity(loginingRef.value, { opacity: 1, right: -50, duration: 300, easing: 'linear' }, { delay: 100 })
}

const hidelLogining = () => {
  Velocity(loginingRef.value, { opacity: 0, right: 0, duration: 300, easing: 'linear' }).then(() => {
    visible.value = false
    expand.value = false
  })
}

defineExpose({
  showLogining,
  hidelLogining
})
</script>

<style lang="less" scoped>
@import '../../assets/gcloud/spin-loaders.css';

@skyblue-lighten-color: #0c4687;

.logining-panel {
    z-index: 3;
    display: none;
    position: absolute;
    left: 400px;
    right: 0px;
    margin: auto;
    width: 400px;
    height: 300px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    padding: 20px 70px;
    top: 100px;
    bottom: 0;
    opacity: 0;

    &.visible {
        display: block;
    }

    &:before {
        transition: all 100ms linear;
        border-right: 370px solid @skyblue-lighten-color;
        border-top: 0px solid transparent;
        border-bottom: 0px solid transparent;
        height: 100%;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
    }

    &.expand:before {
        border-top-width: 40px;
        border-bottom-width: 40px;
    }

    .word {
        font-size: 25px;
        line-height: 0px;
    }

    .loader {
        margin-left: -250px;
        margin-top: 125px;

        .ball-outter1,
        .ball-outter2,
        .ball-inner {
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }

        .ball-outter1,
        .ball-outter2 {
            width: 75px;
            height: 75px;
        }

        .ball-inner {
            width: 50px;
            height: 50px;
        }
    }
}
</style>
