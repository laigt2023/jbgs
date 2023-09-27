<template>
    <div ref="globalModal">
        <a-modal
            ref="modalRef"
            v-model:visible="visible"
            :width="width"
            :getContainer="() => globalModal"
            :okText="props.okText"
            :class="{ modal: !props.confirm }"
            :cancel-text="props.cancelText"
            :ok-button-props="{ disabled: props.submitting, loading: props.submitting,style: { display: !showOkBtn?'none':'' } }"
            :cancel-button-props="{ disabled: props.submitting, loading: props.submitting,style: { display: !showCancelBtn?'none':'' } }"
            :destroyOnClose="true"
            @ok="handleOk"
            @cancel="handelCancel"
            >
            <template v-if="!props.confirm" #title>
                <div  ref="modalTitleRef" class="modal-title">{{ props.title }}</div>
            </template>

            <template v-if="!confirm">
                <a-spin :spinning="loading">
                    <slot></slot>
                </a-spin>
            </template>

            <div v-else>
                <p class="confirm-title">
                    <exclamation-circle-outlined class="tips-icon" /> <span class="text"> {{ title }}</span>
                </p>
                <div>
                    <a-spin :spinning="loading">
                        <slot></slot>
                    </a-spin>
                </div>
            </div>

            <template #modalRender="{ originVNode }">
              <div :style="transformStyle">
                <component :is="originVNode" />
              </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup lang="ts" name="modalx">
import { ref, watch, computed, CSSProperties, watchEffect } from 'vue'
import { useDraggable } from '@vueuse/core'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const emit = defineEmits<{(e: 'onOk', event: any): void,
    (e: 'onCancel', event: any): void,
    (e: 'update:show', value: any): void,
}>()
const globalModal = ref()
const visible = ref<boolean>(false)

// 同步 props.show 与 visible 的属性
watch(() => props.show, (value) => {
  visible.value = value
})

watch(() => visible.value, (value) => {
  emit('update:show', value)
})

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 520
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  okText: {
    type: String,
    default: '确定'
  },
  title: {
    type: String,
    require: true,
    default: ''
  },
  submitting: {
    type: Boolean,
    default: false
  },
  confirm: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  showCancelBtn: {
    type: Boolean,
    default: true
  },
  showOkBtn: {
    type: Boolean,
    default: true
  }
})
/**
 * 显示
 */
const show = () => {
  visible.value = true
}

/**
 * 隐藏
 */
const hide = () => {
  visible.value = false
}

/**
 * 点击确认后处理方法
 */
const handleOk = (e?: any) => {
  emit('onOk', e)
}
/**
 * 取消后处理方法
 */
const handelCancel = (e?: any) => {
  hide()
  emit('onCancel', e)
}

defineExpose({
  show,
  hide
})

/**
 * 支持拖拽-start
 */

const modalTitleRef = ref<HTMLElement|null>(null)
const { x, y, isDragging } = useDraggable(modalTitleRef)
const startX = ref<number>(0)
const startY = ref<number>(0)
const startedDrag = ref(false)
const transformX = ref(0)
const transformY = ref(0)
const preTransformX = ref(0)
const preTransformY = ref(0)
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 })

watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value
    startY.value = y.value
    const bodyRect = document.body.getBoundingClientRect()
    if (modalTitleRef.value) {
      const titleRect = modalTitleRef.value.getBoundingClientRect()
      dragRect.value.right = bodyRect.width - titleRect.width
      dragRect.value.bottom = bodyRect.height - titleRect.height
      preTransformX.value = transformX.value
      preTransformY.value = transformY.value
    }
  }
  startedDrag.value = true
})
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false
  }
})

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
          preTransformX.value +
          Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
          startX.value
    transformY.value =
          preTransformY.value +
          Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
          startY.value
  }
})
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`
  }
})
/**
 *  支持拖拽-end
 */
</script>
<style  lang="less" scoped>
:deep(.modal .ant-modal-content) {
    border-radius: 35px;
}

:deep(.modal .ant-modal-body) {
    padding: 25px 30px 5px 30px;
}

:deep(.modal .ant-modal-header) {
    background-color: #003366;
    background-color: var(--ant-primary-color);

    border-radius: 30px 30px 0 0;
}

:deep(.modal .ant-modal-footer) {
    padding: 15px 30px;
}

:deep(.modal .ant-modal-close) {
    color: #fff;
}

:deep(.ant-modal-close:focus, .ant-modal-close) {
    :hover {
        color: #fff;
        font-weight: bold;
    }
}

:deep(.ant-form){
  max-height: 70vh;
  overflow: auto;
}

.modal-title {
    text-align: center;
    color: #fff;
    cursor: move;
    font-weight: bold;
    font-size: 18px;
}

.confirm-title {
    line-height: 30px;
    font-size: 15px;
    font-weight: bold;

    .text {
        padding-left: 10px;
    }

    .tips-icon {
        font-size: 30px;
        color: #faad14;
        vertical-align: bottom;
    }
}
</style>
