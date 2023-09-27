<template>
  <div class="pagination">
    <a-button class="refresh-button" @click="onRefresh">
      <SyncOutlined />
    </a-button>
    <div class="warp">
      <a-pagination
      :current="props.pageNo"
      :pageSize="props.pageSize"
      :total="getTotal"
      show-less-items
      show-quick-jumper
      :showSizeChanger="props.showSizeChanger"
      @change="handelChange"
      >
        <template #itemRender="{
          /* eslint-disable vue/no-unused-vars */
          type,
          originalElement
        }">
          <component :is="originalElement"></component>
        </template>
      </a-pagination>
    </div>

  </div>
</template>
<script setup lang="ts">
import { SyncOutlined } from '@ant-design/icons-vue'
import { defineComponent, PropType, computed } from 'vue'
import { TablexCfgType } from './utils/tablexUtils'

defineComponent({ SyncOutlined })
const props = defineProps({
  tableCfg: {
    type: Object as PropType<TablexCfgType>
    // required:true
  },
  pageNo: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 10
  },
  // 十分显示分页大小选择器
  showSizeChanger: {
    type: Boolean,
    default: true
  }
})
// 定义emit的触发类型
const emit = defineEmits<{(e: 'change', event: any): void
  (e: 'update:pageNo', event: any): void
  (e: 'update:pageSize', event: any): void
}>()
const handelChange = (pageNo, pageSize) => {
  emit('update:pageNo', pageNo)
  emit('update:pageSize', pageSize)
  emit('change', { pageNo, pageSize })
}
const onRefresh = (event) => {
  emit('change', event)
}

const getTotal = computed(() => {
  let num = props.total
  if (props.pageNo && props.pageSize && props.total) {
    // 当前页最后一条记录被删除时，props.pageNo保留在当前页，total需要添加一页的记录
    if (props.pageNo * props.pageSize > props.total) {
      // 补齐一页
      num = props.total + (props.pageSize - (props.total % props.pageSize))
    }
  }
  return num
})
</script>
<style lang="less" scoped>
.pagination {
  padding: 10px 0;
  text-align: center;
}

.warp {
  display: inline-block;
}

.refresh-button {
  // color: #1890ff;
  // border-color: #1890ff;
  vertical-align: top;
  margin: 0 8px;
  font-size: 18px;
  padding: 4px 10px;

  span {
    vertical-align: top;
    padding-top: 2px;
  }
}
</style>
