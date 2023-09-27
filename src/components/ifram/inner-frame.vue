<!--
 * @Description: 框架-内部框架（包括菜单插槽、内容等）
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
  <div class="content">
    <aside class="left-side">
      <slot name="left"></slot>
    </aside>
    <section class="right-side">
      <div class="right-contnet">
        <a-card class="card" :title="router.currentRoute.value.meta.title" :bordered="false">
          <template #extra>
            <a-button
              v-if="router.currentRoute.value.meta.showGoBack"
              type="primary"
              @click="goBack(router.currentRoute.value.meta.goBackRouterName)">
              <rollback-outlined />返回
            </a-button>
          </template>
          <slot></slot>
        </a-card>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { RollbackOutlined } from '@ant-design/icons-vue'

const goBack = (routerName) => {
  // 判断历史栈中是否有back记录
  if (router && router.options && router.options.history && router.options.history.state.back) {
    router.back()
  } else if (routerName) {
    router.push({ name: (routerName as string) })
  }
}
</script>
<style lang="less" scoped>
/**
* 指定topic组件固定高度
*/
@topic-height: 125px;

.content {
  display: flex;
  flex-direction: row;
  // height: calc(100vh - @topic-height);

  .card {
    border-radius: 5px;
    // background: url(/img/bg/content-bg.jpg) 90% -3% no-repeat;
    :deep(.ant-card-body) {
      padding: 10px 20px;
    }
  }

}

.left-side {
  display: flex;
}

.right-side {
  // display: inline-block;
  display: flex;
  flex: 1;
  vertical-align: top;
  height: 100%;
  overflow: auto;
  background: #eaedee;

  .right-contnet {
    display: block;
    width: 100%;
    padding: 15px;
    min-height: calc(100vh - @topic-height);
  }
}
</style>
