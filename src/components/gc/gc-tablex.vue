
<template>
  <!-- <a-spin class="tablex-warp" :spinning="loading"> -->
  <a-table :columns="columns"
    class="tablex ant-table-striped"
    :row-selection="checkbox ? { selectedRowKeys: selectedRowKeys, onChange: onSelectChange,selections:checkbox } : null"
    :data-source="tablesData"
    :loading="loading"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    :pagination="false"
    :bordered="props.bordered">
    <template #headerCell="{
      /* eslint-disable vue/no-unused-vars */
      column
    }">
    </template>
    <template #bodyCell="{ column, record, index }">
      <slot name="bodyCell" :column="column" :record="record" :index="index"></slot>
    </template>
    <template #emptyText>
      <div v-if="loading" class="no-data-tips" >
        加载中...
      </div>

      <div  v-if="!loading && !props.errorMessage && (!props.data || !props.data.length)" class="no-data-tips">
        {{ props.noDataText }}
      </div>

      <div  v-if="!loading && props.errorMessage" class="error-tips">
        {{ props.errorMessage }}
      </div>
    </template>
  </a-table>
  <!-- </a-spin> -->
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const props = defineProps({
  columns: {
    type: Array,
    default: () => { return [] }
  },
  data: {
    type: Array,
    default: () => { return [] }
  },
  loading: {
    type: Boolean,
    default: false
  },
  noDataText: {
    type: String,
    default: '暂无数据'
  },
  errorMessage: {
    type: String,
    default: ''
  },
  bordered: {
    type: Boolean,
    default: true
  },
  checkbox: {
    type: Boolean,
    default: false
  }
})

type Key = string | number;

// 处理列表数据，添加key值
const tablesData = computed(() => {
  clearSelectedRowKeys()

  const result:Array<any> = []
  props.data.forEach((item, index) => {
    (item as any).key = index
    result.push(item)
  })
  return result
})

// 选中列表数据key值列表
const selectedRowKeys = ref<Array<Key>>([])

/**
 * 选中表格数据处理方法
 * @param keys
 */
const onSelectChange = (keys: Key[]) => {
  selectedRowKeys.value = [].concat(keys as any)
}

/**
 * 设置选中表格数据
 * @param keys
 */
const setSelectedRowKeys = (keys: Key[]) => {
  selectedRowKeys.value = [].concat(keys as any)
}

/**
 * 获取表格显示数据
 */
const getTablesData = () => {
  return tablesData
}

/**
 * 获取选中的列表数据项
 */
const getSelectedRowData = () => {
  return tablesData.value.filter(item => selectedRowKeys.value.indexOf(item.key) > -1)
}

/**
 * 清空选项
 */
const clearSelectedRowKeys = () => {
  selectedRowKeys.value = []
}
defineExpose({
  selectedRowKeys,
  setSelectedRowKeys,
  getSelectedRowData,
  clearSelectedRowKeys,
  getTablesData
})
</script>

<style lang="less" scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

.ant-table-striped :deep(.ant-table-cell) {
  a {
    margin-right: 5px;
  }
}

:deep(.no-data-tips) {
  text-align: center;
  padding: 10px;
}

:deep(.error-tips) {
  padding: 10px;
  color: red;
  text-align: center;
}
</style>
