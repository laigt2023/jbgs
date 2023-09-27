<template>
  <div class="login">
    <div v-show="visible" ref="logoAndTitle" class="logo-title">
      <div class="logo" />
      <span class="title">智慧化数据采集与管理平台</span>
    </div>
    <div v-show="visible" ref="loginPanelRef">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <h3 class="title">智慧化数据平台登录</h3>
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input
            v-model:value="formState.username"
            size="large"
            class="my-a-input"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            size="large"
            class="my-a-input"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <!-- <a-row>
          <a-col :span="14">
            <a-form-item
              :rules="[{ required: true, message: '请输入验证码' }]"
            >
              <a-input v-model:value="formState.code" size="large" placeholder="请输入验证码" />
            </a-form-item>
          </a-col>
          <a-col :span="8"
            ><div @click="userStore.getCode()">
              <img :src="code" alt="验证码" class="code-img" /></div
          ></a-col>
        </a-row> -->

        <!-- <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember"
              >记住密码</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">忘记密码</a>
        </a-form-item> -->

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            登陆
          </a-button>
<!--          <div class="register"><a href="">立即注册</a></div>-->
        </a-form-item>
      </a-form>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span> -->
    </div>
    <logining-panel :loading="loading" :status="loadingStatus" />
  </div>
</template>

<script name="loginv1" lang="ts" setup>
import { defineComponent, reactive, computed, ref, onMounted } from 'vue'
import { useUserStore } from '@store/index'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import Velocity from 'velocity-animate'
import { Form, message } from 'ant-design-vue'

import LoginingPanel from './logining-panel.vue'
import Router from '@/router'
const ADMIN_PASSWORD = 'gcloud123'

interface FormState {
  username: string
  password: string
  remember: boolean
  code: string
}
defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  LoginingPanel
})

const formState = reactive<FormState>({
  username: 'admin',
  password: ADMIN_PASSWORD,
  remember: true,
  code: ''
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { validate } = Form.useForm(
  formState,
  reactive({
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
  })
)

const loginPanelRef = ref(null)
const logoAndTitle = ref(null)
const loading = ref(false)
const loadingStatus = ref('loading')
const visible = ref(false)
// 获取验证码
const userStore = useUserStore()
userStore.getCode()
// const code = computed(() => userStore.code)

const startLogin = () => {
  Velocity(loginPanelRef.value, {
    opacity: 0,
    rotateX: '80deg',
    right: 0,
    duration: 300,
    easing: 'easeInOutQuart'
  })
  Velocity(logoAndTitle.value, {
    opacity: 0,
    rotateX: '80deg',
    left: 0,
    duration: 300,
    easing: 'easeInOutQuart'
  })
  visible.value = false
  loadingStatus.value = 'loading'
  loading.value = true
}
const errorLogin = (status) => {
  Velocity(loginPanelRef.value, {
    opacity: 1,
    rotateX: '0deg',
    right: 0,
    duration: 500,
    easing: 'linear'
  })
  Velocity(logoAndTitle.value, {
    opacity: 1,
    rotateX: '0deg',
    left: 1,
    duration: 500,
    easing: 'easeInOutQuart'
  })
  visible.value = true
  loadingStatus.value = status
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

      // const userStore = useUserStore()
      // userStore.login(res.username, res.password, res.code).then(() => {
      //   // userStore.checkLogin().then((res) => {
      //   //   if (res) {
      //   //     successLogin()
      //   //     Router.push({ name: 'home' })
      //   //   } else {
      //   //     errorLogin('error')
      //   //     userStore.getCode()
      //   //   }
      //   // })
      // }).catch(() => {
      //   errorLogin('error')
      //   userStore.getCode()
      // })

      if (formState.password !== ADMIN_PASSWORD) {
        message.error('用户名密码不匹配，请输入正确密码')
        // errorLogin('error')
      } else if (formState.username !== 'admin') {
        message.error('用户名密码不存在')
        // errorLogin('error')
      } else {
        startLogin()
        successLogin()
        setTimeout(() => {
          Router.push({ name: 'home' })
        }, 500)
      }
    })
    .catch(() => {
      // 校验不通过
      // No do someting
      console.error('catch')
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})

onMounted(() => {
  startLogin()
  // 校验政务内网登录
  userStore.checkGovLogin().then(res => {
    if (res) {
      successLogin()
      // userStore.checkLogin().then((res) => {
      //   if (res) {
      //     successLogin()
      //     Router.push({ name: 'home' })
      //   } else {
      //     errorLogin('govError')
      //     userStore.getCode()
      //   }
      // })
    } else {
      errorLogin('govError')
    }
  }).catch(() => errorLogin('govError'))
})
</script>

<style rel="stylesheet/scss" lang="scss">
#app,
.main {
  height: 100%;
}
.my-a-input {
  border-radius: 5px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('/public/img/bg/bg-img.png');
  background-size: cover;
  background-color: #101557;
  user-select: none;
}
.logo-title {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-right: 30px;
  .logo {
    width: 76px;
    height: 76px;
    background-image: url('/public/img/logo.png');
    margin-right: 10px;
  }
  .title {
    font-size: 50px;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    color: #fff;
  }
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 25px;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #fff;
    font-size: 26px;
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.login-code-img {
  height: 38px;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-form-button {
  width: 100%;
}
.login-form-forgot {
  float: right;
}
.register {
  color: #337ab7;
  padding-top: 16px;
  float: right;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
.code-img {
  width: 100%;
  height: 41px;
  margin-left: 30px;
  cursor: pointer;
}
</style>
