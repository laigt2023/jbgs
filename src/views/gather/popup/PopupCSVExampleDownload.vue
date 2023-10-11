<!--
 * @Description: 弹出框-样例下载
 * @Author: laigt
 * @Date: 2023-02-7
-->
<template>
    <gc-modalx
      v-model:show="cfg.show"
      v-model:submitting="cfg.submitting"
      v-model:cancelText="cfg.cancelText"
      v-model:okText="cfg.okText"
      title="样子例下载"
      @on-ok="handelSubmit"
      @on-cancel="handelCancel"
    >
      <gc-formx ref="formx" :formState="formState">
        <!-- <a-form-item
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
        </a-form-item> -->
        <a-form-item
          has-feedback
          label="CSV样例"
          name="csv"
        >
          <div class='csv-warp'>
            <div v-for="(d,i) in csvArray" :key='i'  class="csv-item">
              <a class="file-download" :href="getSrc(d.url)">
                <span> {{ getFileName(d.url) }}</span>
                <DownloadOutlined class="icon"/>
              </a>
            </div>
          </div>
        </a-form-item>
        <p class="tips">注：下载完成后的样例，可用于数据上传</p>
        <p class="tips">下载的CVS样例文件，可用 WPS Office 查看数据内容</p>
      </gc-formx>
    </gc-modalx>
  </template>

<script setup lang="ts" name="PopupWorkOrderApply">
import { ref, reactive } from 'vue'
import { getSrc } from '@/utils/imgUtils'

import {
  createCfg,
  show,
  hide,
  cancel
} from '@components/gc/utils/modalxUtils'

const csvArray = [
  { url: '/csv/GZW_MES_MODEL_DB示例1.csv' },
  { url: '/csv/GZW_MRI_KPI_DB示例1.csv' }
]

const getFileName = (url) => {
  if (url && url.indexOf('/') > -1) {
    const array = url.split('/')
    return array[array.length - 1]
  }

  return ''
}

  interface FormState {
    dataTypeName: string;
  }

const formx = ref()

const cfg = reactive(
  createCfg({
    api: null,
    data: {}
  })
)

const handelSubmit = () => {
  hide(cfg)
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
.csv-warp{
  margin-top:-5px;
  font-size: 14px;
  .csv-item{
    margin: 10px;
  }
}
.file-download{

  .icon{
    margin: 0 5px;
  }
}
</style>
