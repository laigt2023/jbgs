<template>
    <a-button
        class="btn"
        :class="getButtonState.className"
        v-bind="$attrs"
        >
        <template v-if="typeName" #icon>
            <component :is="getButtonState.iconComp"></component>
        </template>
        <template  v-if="$slots.default">
            <slot></slot>
        </template>
        <span v-else>{{ label || getButtonState.text }}</span>
    </a-button>
</template>
<script setup lang="ts" name="gcButtonx">
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, UploadOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'

type ButtonType = 'add' | 'update' | 'del' | 'export' | 'reset';

interface IProps {
    typeName: ButtonType,
    label?:string,
}

const props = defineProps<IProps>()

const typeTextMap = {
  add: {
    text: '新增',
    className: 'add-btn',
    iconComp: PlusCircleOutlined
  },
  update: {
    text: '编辑',
    className: 'update-btn',
    iconComp: EditOutlined
  },
  del: {
    text: '删除',
    className: 'del-btn',
    iconComp: DeleteOutlined
  },
  export: {
    text: '导出',
    className: 'export-btn',
    iconComp: UploadOutlined
  },
  reset: {
    text: '重置',
    className: 'reset-btn',
    iconComp: SyncOutlined
  }
}

const getButtonState = computed(() => {
  return typeTextMap[props.typeName]
})
</script>
<style lang="less" scoped>
.btn{
  margin-right: 15px;
  border-radius: 5px;
}
.add-btn{
  border-color: #12ab5f ;
  background: #e4fcf0;
  color: #119f58;
  &:hover ,&:focus{
    border-color: #0f9150 ;
    color:#0f884b;
  }
}

.update-btn{
  border-color: #4295cc ;
  background: #daebf5;
  color: #2472a6;
  &:hover ,&:focus{
    border-color: #3283b8 ;
    color:#1e5e88;
  }
}
.del-btn{
  border-color: #ea8282 ;
  background: #fae8e8;
  color: #e36767;
  &:hover ,&:focus{
    border-color: #e45f5f ;
    color:#d93333;
  }
}
.export-btn {
  border-color: #e8b453 ;
  background: #fcf3e4;
  color: #d9a75b;
  &:hover ,&:focus{
    border-color: #e2a32c ;
    color:#d1953a;
  }
}
.reset-btn{
  margin-left: 15px;
  padding: 4px 8px;
}
</style>
