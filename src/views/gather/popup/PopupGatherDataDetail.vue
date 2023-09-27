<!--
 * @Description: 弹出框-个人中心-工单申请-创建
 * @Author: laigt
 * @Date: 2023-02-7
-->
<template>
  <gc-modalx
    v-model:show="cfg.show"
    v-model:submitting="cfg.submitting"
    v-model:cancelText="cfg.cancelText"
    v-model:okText="cfg.okText"
    :title="isUpdate?'创建工单':'编辑工单'"
    @on-ok="handelSubmit"
    @on-cancel="handelCancel"
  >
    <gc-formx ref="formx" :formState="formState">
      <a-form-item
      v-if="isUpdate"
        label="工单号"
      >
        <span>{{ formState.no }}</span>
      </a-form-item>
      <a-form-item
        has-feedback
        label="工单名称"
        name="name"
      >
        <span>
        </span>
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
} from '../../../components/gc/utils/modalxUtils'
interface FormState {
  name: string;
  username: string;
  no: string | number;
  phone: string | number;
  position: string;
}

const formx = ref()
const isUpdate = ref(false)

const cfg = reactive(
  createCfg({
    api: undefined,
    data: {
      id: '',
      type: '',
      dataTypeName: '',
      modelName: '',
      fields: '',
      fieldAndData: '',
      errorMsg: '',
      tag: '',
      recordTime: ''
    }
  })
)

const formState: FormState = cfg.data as FormState

const emit = defineEmits<{(e: 'onSubmit', event: any): void;}>()

const handelSubmit = () => {
  const successText = isUpdate.value ? '编辑操作成功' : '创建操作成功'
  commonSubmit(formx.value, cfg, successText)
    .then(() => {
      emit('onSubmit', cfg.data)
    })
    .catch(() => {
      // not do something
    })
}

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
