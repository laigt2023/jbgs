<!--
 * @Description: 服务超市-接口服务-申请
 * @Author: laigt
 * @Date: 2023-04-18
-->
<template>
    <gc-modalx
      v-model:show="cfg.show"
      v-model:submitting="cfg.submitting"
      v-model:cancelText="cfg.cancelText"
      v-model:okText="cfg.okText"
      :width="props.with"
      :title="props.title"
      :showCancelBtn="props.showCancelBtn"
      :showOkBtn="props.showOkBtn"
      @on-ok="handelSubmit"
      @on-cancel="handelCancel"
    >
      <gc-formx ref="formx" :formState="formState">
        <a-form-item
        v-for="item in detailFormatArray"
        :key="item.key"
          :label="item.label"
        >
        <template v-if="item.render">
          {{  item.render(cfg.data,item.key)  }}
        </template>
        <template v-else-if="item.htmlRender">
          <div v-html="item.htmlRender(cfg.data,item.key)"></div>
        </template>
        <template v-else>
          <span v-if="!item.type || item.type === 'text'" >{{  cfg.data[item.key] }}</span>
          <a-textarea  v-if="!item.type || item.type === 'textarea'" v-model:value="cfg.data[item.key]" placeholder=""  readonly="readonly" :rows="item.rows || item.row|| 4" />
        </template>
        </a-form-item>
      </gc-formx>
    </gc-modalx>
  </template>

<script setup lang="ts" name="PopupCommonDetail">
import { ref, reactive } from 'vue'
import {
  createCfg,
  hide,
  cancel
} from '@components/gc/utils/modalxUtils'

const props = defineProps({
  title: {
    type: String,
    default: '详情'
  },
  with: {
    type: Number || String,
    default: 600
  },
  detailFormat: {
    type: Array,
    default: () => []
  },
  showCancelBtn: {
    type: Boolean,
    default: false
  },
  showOkBtn: {
    type: Boolean,
    default: true
  }
})

const formx = ref()

const cfg = reactive(
  createCfg({
    data: {}
  })
)

const detailFormatArray = ref([] as any)
// eslint-disable-next-line vue/no-setup-props-destructure
detailFormatArray.value = props.detailFormat

const formState = cfg.data

const emit = defineEmits<{(e: 'onSubmit', event: any): void;}>()

const handelSubmit = () => {
  hide(cfg)
  emit('onSubmit', cfg.data)
}

const handelCancel = () => {
  cancel(cfg)
}

const popupDetail = (defaultData?:any, formatList?:Array<any>) => {
  // 处理函数

  if (formatList) {
    detailFormatArray.value = formatList
  }

  cfg.data = defaultData
  cfg.show = true
}

defineExpose({
  popupDetail,
  hide: () => {
    hide(cfg)
  }
})
</script>
  <style lang="less" scoped></style>
