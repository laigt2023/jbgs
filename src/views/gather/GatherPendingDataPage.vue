<!--
 * @Description: 工单列表-全部工单
 * @Author: laigt
 * @Date: 2023-02-16
-->
<template>
    <gc-toolbar>
      <template #left>
          <!-- <a-popconfirm placement="right" ok-text="确认" cancel-text="取消" @confirm="handleTableExport('工单列表-全部工单',tableCfg,tableRef)">
            <template #title>
              <div>确认要当前导出表格内容？</div>
            </template>
            <gc-buttonx type-name="export">
            </gc-buttonx>
          </a-popconfirm> -->
          <!-- <StatisticsChart style="display: inline-block;"/> -->
          <!-- <CountStatisticsChart style="display: inline-block;"/> -->
          <a-button type="primary" style="margin-right: 15px;" @click="handleUpload">
                <template #icon>
                  <ToTopOutlined />
                </template>
                数据上传
          </a-button>
          <a-popconfirm placement="topLeft" ok-text="Yes" cancel-text="No" @confirm="handleAllVaild">
            <template #title>
              <p>是否启动当前所有待校验数据的【校验】操作</p>
            </template>
            <gc-buttonx type-name="add">
              启动全部校验
            </gc-buttonx>
          </a-popconfirm>
          <a-button type="primary" style="margin-right: 15px;" @click="handleCSVExampleDownload">
                <template #icon>
                  <CloudDownloadOutlined />
                </template>
                样例下载
          </a-button>
      </template>
      <template #right>
        <!-- <span class="item-label">数据状态</span>
        <a-select
          v-model:value="tableCfg.params.status"
          class="item-input"
          placeholder="状态"
          :allowClear="true"
          style="width: 120px"
          @change="onSearch"
        >
          <a-select-option v-for="(d, key) in statusMap" :key="key" :value="key">{{
            d
          }}</a-select-option>
        </a-select> -->
      </template>
      <template #search>
         <a-space direction="horizontal">
          <!--
        <a-input-search
          v-model:value="tableCfg.params.key"
          class="item-input"
          placeholder="名称/描述关键字搜索"
          enter-button
          @search="onSearch"
        />
        -->
        <gc-buttonx
          type-name="reset"
          @click="handleReset"
          >
          </gc-buttonx>
        </a-space>
      </template>
    </gc-toolbar>
    <gc-tablex
      ref="tableRef"
      :columns="tableCfg.columns"
      :data="tableCfg.data"
      :loading="tableCfg.loading"
      :noDataText="tableCfg.noDataText"
      :errorMessage="tableCfg.errorMessage"
      :pageNo="tableCfg.pageNo"
      :pageSize="tableCfg.pageSize"
      :checkbox="false"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <span>
            {{ (tableCfg.pageNo - 1) * tableCfg.pageSize + index + 1 }}
          </span>
        </template>
        <template v-if="column.key === 'recordTime'">
          <span>
            {{ datetimeFormat(record.recordTime) }}
          </span>
        </template>
        <template v-if="column.key === 'isSaveInDb'">
          <span>
            {{ record.isSaveInDb ? '是':'否' }}
          </span>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>

            <a-popconfirm placement="topLeft" ok-text="Yes" cancel-text="No" @confirm="handleSimpleVaild(record)">
              <template #title>
                <p>是否单独启动当前数据的【校验】操作</p>
              </template>
              <a>校验</a>
            </a-popconfirm>

            <!-- <a @click="hangeToDetail(record)">详细信息</a> -->
          </span>
        </template>
      </template>
    </gc-tablex>
    <!-- <gc-paginationx
      v-model:pageNo="tableCfg.pageNo"
      v-model:total="tableCfg.total"
      v-model:pageSize="tableCfg.pageSize"
      @change="onRefresh"
    >
    </gc-paginationx> -->
    <!-- <popup-gather-data-detail ref="popupDetail" @onSubmit="onRefresh" /> -->
    <popup-upload-data ref="popupUploadDataRef" @onSubmit="onSearch()"></popup-upload-data>
    <PopupCSVExampleDownload ref='popupCSVExampleDownload'></PopupCSVExampleDownload>
    <popup-common-detail ref="popupDetail"></popup-common-detail>
  </template>
<script setup lang="ts" name="WorkOrderAllPage">
import { ref, reactive, onMounted } from 'vue'
import { datetimeFormat } from '../../utils/moment'
import tablexUtils from '../../utils/tablex'
import gatherApi from '../../api/gather/gatherApi'
// import PopupGatherDataDetail from './popup/PopupGatherDataDetail.vue'
import PopupCommonDetail from '../../components/ifram/popup/PopupCommonDetail.vue'
import GcTablex from '../../components/gc/gc-tablex.vue'
import { message } from 'ant-design-vue'
import PopupUploadData from './popup/PopupUploadData.vue'
import PopupCSVExampleDownload from './popup/PopupCSVExampleDownload.vue'
// import StatisticsChart from './statistics/StatisticsChart.vue'
// import CountStatisticsChart from './statistics/CountStatisticsChart.vue'

// const statusMap = {
//   1: '待校验',
//   2: '正常数据',
//   3: '异常数据'
// }

const tableRef = ref<InstanceType<typeof GcTablex>>()

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: gatherApi.sourcesList,
    url: '',
    params: {
      sourceType: 'csv'
    },
    loading: false,
    columns: [
      { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '标识', dataIndex: 'tag', key: 'tag' },
      { title: '数据名称', dataIndex: 'dataTypeName', key: 'dataTypeName' },
      { title: '存至数据库', dataIndex: 'isSaveInDb', key: 'isSaveInDb' },
      { title: '入库时间', dataIndex: 'recordTime', key: 'recordTime' },
      { title: '操作', key: 'action' }
    ],
    data: [],
    pageNo: 1,
    pageSize: 99999
  })
)

// 样例下载
const popupCSVExampleDownload = ref<InstanceType<typeof PopupCSVExampleDownload>>()

const handleCSVExampleDownload = () => {
  popupCSVExampleDownload.value.popup()
}

// 详情
const popupDetail = ref<InstanceType<typeof PopupCommonDetail>>()

// const detailFormat = [
//   { label: 'ID', key: 'id', type: 'text' },
//   { label: '数据状态', key: 'type', type: 'text' },
//   { label: '表名', key: 'modelName', type: 'text' },
//   // { label: 'modelName', key: 'modelName', type: 'text' },
//   {
//     label: '异常提醒',
//     key: 'errorMsg',
//     type: 'text',
//     htmlRender: (row) => {
//       if (row.errorMsg) {
//         return row.errorMsg.replaceAll('.', '<br/>   ')
//       }
//     }
//   },
//   { label: '入库校验字段', key: 'fields', type: 'text' },
//   { label: '源数据', key: 'fieldAndData', type: 'textarea', row: 8 },
//   // { label: '数据源ID', key: 'tag', type: 'text' },
//   { label: '入库时间', key: 'recordTime', type: 'text', render: (row) => { return datetimeFormat(row.recordTime) } }
// ]

// 详情
// const hangeToDetail = (row) => {
//   console.error('hangeToDetail', row)
//   popupDetail.value?.popupDetail(row, detailFormat)
// }

const popupUploadDataRef = ref<InstanceType<typeof PopupUploadData>>()
const handleUpload = () => {
  popupUploadDataRef.value?.popup()
}

const handleAllVaild = (row) => {
  // gatherApi.taskList().then((res) => {
  //   console.error(res)
  //   message.success('【' + row.tag + ' 】校验启动操作已请求成功，请耐心等待校验完成')
  // })

  gatherApi.checkAndStore({ mode: 'csv' }).then(() => {
    onSearch()
    message.success('【' + (row.tag || '全部') + ' 】校验操作请求已发送成功，请耐心等待校验完成,预计需要3-5分钟', 8)
  })
}

const handleSimpleVaild = (row) => {
  handleAllVaild(row)
}

// 加载统计数据
// const loadStatistics = () => {
//   gatherApi.statistics({}).then((res) => {
//     console.error(res)
//   })
// }

// loadStatistics()

/**
   * 前端导出列表数据
   * @param exportFileName 导出文件名称
   * @param cfg 表格配置对象（例：tableCfg）
   * @param tableInstance 表格对象实例（例：tabaleRef）
   */
// const handleTableExport = (exportFileName = '导出文件', cfg:TablexCfgType, tableInstance?:InstanceType<typeof GcTablex>) => {
//   const arrayData = tableInstance?.getTablesData().value as Array<any>
//   handleExport(exportFileName, cfg, arrayData)
// }

/**
   * 导出excel实现方法
   * @param exportFileName 导出文件名称
   * @param cfg 表格配置对象（例：tableCfg）
   * @param exportDataArray 导出数据
   */
// const handleExport = (exportFileName = '导出文件', cfg:TablexCfgType, exportDataArray?:Array<any>) => {
//   exportFileName += '.xls'
//   // table显示的数据
//   const tableDataArray = exportDataArray || []

//   // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
//   let str = ''
//   const keys:string[] = []

//   // 封装需要导出的key值与标题 （排除action）
//   cfg.columns.forEach((item) => {
//     if (item.key !== 'action') {
//       str += item.title + ','
//       keys.push(item.key)
//     }
//   })
//   if (str.length > 0 && str.endsWith(',')) {
//     str = str.substring(0, str.length - 1) + '\n'
//   }

//   // 增加\t为了不让表格显示科学计数法或者其他格式
//   // 外循环表格数据
//   tableDataArray.forEach((tableDataItem, i) => {
//     // 内循环key
//     keys.forEach((key) => {
//       // 序号
//       if (key === 'index') {
//         str += (i + 1) + '\t,'
//         // 状态
//       } else if (key === 'status') {
//         str += (statusMap[tableDataItem[key]] || '') + '\t,'
//         // 信用风险等级
//       } else {
//         str += tableDataItem[key] + '\t,'
//       }
//     })
//     // 表格数据换行
//     str += '\n'
//   })
//   // encodeURIComponent解决中文乱码
//   const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
//   // 通过创建a标签实现
//   const link = document.createElement('a')
//   link.href = uri
//   // 对下载的文件命名
//   link.download = exportFileName
//   link.click()
// }

// 搜索
const onSearch = () => {
  tablexUtils.serach(tableCfg).then((res) => {
    tableCfg.data = res as any
  })
}

// 重置
const handleReset = () => {
  tablexUtils.serach(tableCfg).then((res) => {
    tableCfg.data = res as any
  })
}

onMounted(() => {
  // 获取当前vue实例对象
  // console.error(getCurrentInstance())
  onSearch()
})
</script>
