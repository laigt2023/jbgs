<!--
 * @Description: 弹出框-修改用户密码
 * @Author: laigt
 * @Date: 2023-04-14
-->
<template>
  <gc-modalx
    v-model:show="cfg.show"
    v-model:submitting="cfg.submitting"
    v-model:cancelText="cfg.cancelText"
    v-model:okText="cfg.okText"
    title="用户密码修改"
    @on-ok="handelSubmit"
    @on-cancel="handelCancel"
  >
    <gc-formx ref="formx" :formState="formState">
      <a-form-item
        has-feedback
        label="旧密码"
        name="oldPwd"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 18), $vaild.required])}]"
      >
        <a-input-password
          v-model:value="formState.oldPwd"
          placeholder="请输入旧密码"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="新密码"
        name="pwd"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 18), $vaild.required])}]"
      >
        <a-input-password
          v-model:value="formState.pwd"
          placeholder="请输新密码"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="确认密码"
        name="resetPwd"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 18), $vaild.required,$vaild.equationValue(formState.pwd,'两次输入密码不相同')])}]"
      >
        <a-input-password
          v-model:value="formState.resetPwd"
          autocomplete="off"
          placeholder="请输入确认密码"
          :disabled="cfg.submitting"
        />
      </a-form-item>
    </gc-formx>
  </gc-modalx>
</template>

<script setup lang="ts" name="PopupWorkOrderApply">
import { ref, reactive } from 'vue'
import {
  createCfg,
  commonSubmit,
  show,
  hide,
  cancel
} from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'
import orderApi from '@/api/workOrder/orderApi'

interface FormState {
  oldPwd: string | number;
  pwd: string;
  resetPwd: string;
}

const formx = ref()

const cfg = reactive(
  createCfg({
    api: orderApi.add,
    data: {
      oldPwd: '',
      pwd: '',
      resetPwd: ''
    }
  })
)

const formState: FormState = cfg.data as FormState

const emit = defineEmits<{(e: 'onSubmit', event: any): void;}>()

const handelSubmit = () => {
  const successText = '用户密码修改成功'
  commonSubmit(formx.value, cfg, successText)
    .then(() => {
      emit('onSubmit', cfg.data)
    })
    .catch(() => {
      // not do something
    })
}

// const userinfo = {
//   id: 1,
//   name: 'laigt',
//   username: '',
//   password: '',
//   nickname: '',
//   phone: '',
//   sex: 0
// }

const handelCancel = () => {
  cancel(cfg)
}

const popup = (defaultData?: FormState) => {
  // 处理函数
  const data: FormState = defaultData || {} as FormState

  show(cfg, data)
}

defineExpose({
  popup,
  hide: () => {
    hide(cfg)
  }
})
</script>
<style lang="less" scoped></style>
