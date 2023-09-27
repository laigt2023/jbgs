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
      title="上传采集数据"
      @on-ok="handelSubmit"
      @on-cancel="handelCancel"
    >
      <gc-formx ref="formx" :formState="formState">
        <a-form-item
          has-feedback
          label="标识"
          name="tag"
          :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
        >
          <a-input
            v-model:value="formState.tag"
            autocomplete="off"
            placeholder="请输入标识号（例如：20230925161310215）"
            :disabled="cfg.submitting"
          />
        </a-form-item>
        <a-form-item
          has-feedback
          label="数据类型"
          name="dataTypeName"
          :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
        >
          <a-input
            v-model:value="formState.dataTypeName"
            placeholder="请输入数据类型 （例如：MES）"
            autocomplete="off"
            :disabled="cfg.submitting"
          />
        </a-form-item>
        <a-form-item
          label="CSV文件"
          name="csv"
        >
          <input id="fileInput" type="file" name="file">
        </a-form-item>
        <p class="tips">注：上传文件只支持CSV格式文件</p>
      </gc-formx>
    </gc-modalx>
  </template>

<script setup lang="ts" name="PopupWorkOrderApply">
import { ref, reactive } from 'vue'
import {
  createCfg,
  show,
  hide,
  cancel
} from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'
import gatherApi from '@/api/gather/gatherApi'
import { message } from 'ant-design-vue'

  interface FormState {
    dataTypeName: string;
    tag: string | number;
    isSaveInDb:string | boolean
  }

const formx = ref()

const cfg = reactive(
  createCfg({
    api: gatherApi.uploadCsv,
    data: {
      dataTypeName: '',
      tag: '',
      isSaveInDb: true
    }
  })
)

const formState: FormState = cfg.data as FormState

const emit = defineEmits<{(e: 'onSubmit', event: any): void;}>()

const handelSubmit = () => {
  const successText = '上传采集数据成功'
  const errorText = '上传采集数据失败，请确认上传文件是否为CSV格式'
  const fileInput = document.querySelector('#fileInput') as any
  const file = fileInput.files[0]

  const request = {
    file,
    tag: formState.tag as string,
    dataTypeName: formState.dataTypeName,
    isSaveInDb: 'true'
  }

  cfg.loading = true
  gatherApi.uploadCsv(request).then(() => {
    emit('onSubmit', cfg.data)
    message.success(successText)
    hide(cfg)
  }).catch(() => {
    message.error(errorText)
  }).finally(() => {
    cfg.loading = false
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
<style lang="less" scoped>
.tips{
    text-align: center;
    color:red
}
</style>
