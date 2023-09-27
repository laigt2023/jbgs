<!--
 * @Description: 登陆页面
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <div class="container">
    <div ref="loginPanelRef" class="login-panel">
      <div class="panel-head">
        <Logo :height="40" />
        <div class="panel-title">{{ CONFIG.appName }}</div>
      </div>
      <div class="panel-body">
        <a-form :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed">

          <div class="iform-item">
            <div class="iform-item-label">
              用户名
            </div>
            <div class="iform-item-input">
              <a-form-item v-bind="validateInfos.username" style="width:100%">
                <a-input v-model:value="formState.username" @keyup.enter="onFinish">
                </a-input>
              </a-form-item>
            </div>
          </div>

          <div class="iform-item" :style="{ marginTop: '30px' }">
            <div class="iform-item-label">
              密码
            </div>
            <div class="iform-item-input">
              <a-form-item v-bind="validateInfos.password" style="width:100%">
                <a-input-password v-model:value="formState.password" @keyup.enter="onFinish">
                </a-input-password>
              </a-form-item>
            </div>
          </div>

        </a-form>
      </div>
      <div class="panel-bottom login-button">
        <a-button type="primary" html-type="submit" shape="round" @click="onFinish">
          登录
        </a-button>
      </div>
    </div>
    <logining-panel :loading="loading" :status="loadingStatus" />
  </div>
</template>
<script name="login" setup lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Velocity from 'velocity-animate'
import Router from '../../router/index'
import { Form, message } from 'ant-design-vue'
import Logo from '@/components/ifram/i-logo.vue'

import { useUserStore } from '@store/index'
import LoginingPanel from './logining-panel.vue'
import CONFIG from '@/config'
const ADMIN_PASSWORD = '123456'
defineComponent({
  Logo,
  LoginingPanel
})

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: 'admin',
  password: ADMIN_PASSWORD
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { validate, validateInfos } = Form.useForm(formState, reactive({
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ]
}))

const loginPanelRef = ref(null)
const loading = ref(false)
const loadingStatus = ref('loading')

const startLogin = () => {
  Velocity(loginPanelRef.value, { opacity: 0, rotateX: '80deg', right: 550, duration: 300, easing: 'linear' })
  loadingStatus.value = 'loading'
  loading.value = true
}
const errorLogin = () => {
  Velocity(loginPanelRef.value, { opacity: 1, rotateX: '0deg', right: 0, duration: 500, easing: 'linear' })
  loadingStatus.value = 'error'
  loading.value = false
}
const successLogin = () => {
  loadingStatus.value = 'success'
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const onFinish = () => {
  validate()
    .then(res => {
      // 表单校验通过

      // 启动登录动画
      startLogin()
      // mock 密码校验，联调后去除
      checkPassword(formState.username, formState.password).then(() => {
        // 确认密码正确 - mock  - admin/123456
        const userStore = useUserStore()
        userStore.login(res.username, res.password, '').then(() => {
          // 跳转到首页
          successLogin()
          setTimeout(() => {
            Router.push({ name: 'home' })
          }, 1000)
        }).catch(() => {
          errorLogin()
        })
      }).catch(res => {
        // 显示提示
        message.error(res.message)
      })
    }).catch(() => {
      // 校验不通过
      // No do someting
    })
}

const checkPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    if (username !== 'admin' || password !== ADMIN_PASSWORD) {
      setTimeout(() => {
        errorLogin()
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: '用户名或密码不正确' })
      }, 1500)
    } else {
      resolve({ success: true })
    }
  })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: -webkit-gradient(linear, left top, right top, from(#071627), color-stop(#446fa2), to(#0a2d56));
  background: linear-gradient(90deg, #071627, #446fa2, #0a2d56);
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
}

.login-panel {
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 0.85);
  transition-property: transform, opacity, box-shadow, top, left;
  transition-duration: .3s;
  transform-origin: 161px 100%;
  transform: rotateX(0deg);
  width: 450px;
  height: 350px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  padding: 30px;
  background: #35394a;
  // background: linear-gradient(230deg, @skyblue-color 0%, rgb(0, 0, 0) 100%);
  background: linear-gradient(230deg, #183d68 0%, #1c3552 100%);
  border-radius: 15px;

  &.flip {
    box-shadow: 0px 20px 30px 3px rgba(6, 17, 47, 0.7);
    pointer-events: none;
    top: -10px !important;
    transform: rotateX(70deg) scale(0.8) !important;
    opacity: .3;
    filter: blur(1px);

    &.moveleft {
      left: -320px;
      opacity: 0 !important;
    }
  }
}

.ant-form-item-label>label {
  color: #fff;
  font-size: 20px;
}

.panel-bottom {
  text-align: center;
}

.panel-body {
  padding-top: 40px;
  padding-right: 40px;
}

.iform-item {
  display: flex;
  flex-direction: row;

  .iform-item-label {
    display: flex;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    min-width: 50px;
    width: 25%;
    justify-content: end;
    padding-right: 15px;
    padding-top: 8px;
  }

  .iform-item-input {
    display: flex;
    flex: 1;

    .ant-input-affix-wrapper {
      background: transparent;
      border-color: transparent;
      border-width: 0;
      border-radius: 0;
      border-bottom-width: 2px;
      border-bottom-color: #eee;

      &.ant-input-affix-wrapper-focused {
        background: transparent;
        border-color: transparent;
        border-width: 0;
        border-radius: 0;
        border-bottom-width: 2px;
        border-bottom-color: #eee;
      }

      :deep(.ant-input) {
        font-size: 18px;
        color: #61bfff;
        font-weight: bolder;
        background-color: transparent;
      }
    }

    .ant-form-item-control-input {
      .ant-input {
        font-size: 18px;
        background: transparent;
        border-color: transparent;
        border-width: 0;
        border-radius: 0;
        border-bottom-width: 2px;
        border-bottom-color: #eee;
        color: #61bfff;
        font-weight: bolder;
        background-color: transparent;
      }
    }
  }
}

.login-button {
  margin-top: 10px;
  text-align: center;

  button {
    border-radius: 50px;
    background: transparent;
    padding: 10px 50px;
    border: 2px solid #4FA1D9;
    color: #4FA1D9;
    text-transform: uppercase;
    font-size: 16px;
    transition-property: background, color;
    transition-duration: .2s;
    height: 48px;
    font-weight: bold;

    &:focus {
      box-shadow: none;
      outline: none;
    }

    &:hover {
      color: white;
      background: #4FA1D9;
      cursor: pointer;
      transition-property: background, color;
      transition-duration: .2s;
    }
  }
}

.panel-title {
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  margin-left: 12px;
  position: relative;
  font-weight: bolder;
  top: -2px;
  color: #eee;
}
</style>
