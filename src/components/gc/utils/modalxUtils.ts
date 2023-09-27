import { message } from 'ant-design-vue'

// 请求前请求自定义处理params方法 - 定义
interface HandleRequestFun{
  (data:any):any
}
// 定义tablexCfg类型
export interface TablexCfgType {
    show?: boolean
    api?: any
    cancelText?: string
    okText?: string
    title?: string
    submitting?: boolean
    data: any,
    errorText?: string,
    loading?: boolean,
    handleRequest?: HandleRequestFun
}
// 默认值配置
const defaultCfg: TablexCfgType = {
  // 初始状态
  show: false,
  // api对象，非调用 (例:userApi.add)
  api: '',
  // 标题
  title: '',
  // 请求中
  submitting: false,
  // 请求数据modal，特殊处理请在handleRequest 进行
  data: {},
  // api请求失败后，异常提示
  errorText: '操作失败',
  loading: false,
  // 请求前请求数据处理（data）=>{ return data}
  handleRequest
}
/**
 * 请求前最后处理一次请求数据-data
 * @param data
 * @returns
 */
export function handleRequest(data: any): any {
  return data
}

/**
 * 创建cfg方法
 * @param cfg
 * @returns
 */
export function createCfg(cfg: TablexCfgType): TablexCfgType {
  const result = Object.assign({}, defaultCfg, cfg)
  return result
}

/**
 * 发起请求
 * @param cfg
 * @param loadingDelay  加载动画时间。默认500
 * @returns
 */
const requestApi = (cfg: TablexCfgType, loadingDelay?: number) => {
  const loadingTime = loadingDelay || 500
  cfg.submitting = true

  const requestData = cfg.handleRequest ? cfg.handleRequest(cfg.data) : cfg.data

  return new Promise((resolve, reject) => {
    cfg.api(requestData).then((res) => {
      setTimeout(() => {
        cfg.submitting = false
        resolve(res)
      }, loadingTime as number)
    }).catch((error) => {
      // api请求异常提示
      cfg.submitting = false
      message.error(cfg.errorText as string)
      reject(error)
    })
  })
}

/**
 * 进行submit操作，配置api，这发起请求
 * @param cfg
 * @returns
 */
export function submit(cfg: TablexCfgType) {
  return new Promise((resolve, reject) => {
    if (!cfg.api) {
      // 隐藏模态框
      hide(cfg)
      resolve(null)
    }

    requestApi(cfg).then((r) => {
      // 隐藏模态框
      hide(cfg)
      resolve(r)
    }).catch((e) => {
      // 隐藏模态框
      hide(cfg)
      reject(e)
    })
  })
}
/**
 * 取消模态框
 * @param cfg
 */
export function cancel(cfg: TablexCfgType) {
  // 隐藏模态框
  hide(cfg)
}
/**
 * 展示模态框
 * @param cfg
 * @param defaultData {} 为清空data  按照defaultData的key值，赋值到cfg.data数据中（如 {}|null 则全数据不重置）
 */
export function show(cfg: TablexCfgType, defaultData?: object) {
  if (defaultData) {
    const keys = Object.keys(cfg.data)
    keys.forEach((key) => {
      cfg.data[key] = defaultData[key] || (cfg.data[key] instanceof Array ? [] : undefined)
    })
  }
  cfg.show = true
}

export function hide(cfg: TablexCfgType) {
  cfg.show = false
}

/**
 * 常规提交方法
 * @param formRef            formxRef对象 例如（formxRef.value）
 * @param cfg                cfgd对象
 * @param successMessage     请求成功提示  可选项: null-不提示   undefine-'操作成功'
 * @returns Promise
 */
export function commonSubmit(formRef, cfg: TablexCfgType, successMessage?: string | null) {
  return new Promise((resolve, reject) => {
    formRef.validateFields().then(() => {
      submit(cfg).then(() => {
        if (successMessage !== null) message.success(successMessage || '操作成功')
        resolve(cfg.data)
      }).catch((err) => {
        reject(err)
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
/**
 * 常规确认提交方法
 * @param formRef            formxRef对象 例如（formxRef.value）
 * @param cfg                cfgd对象
 * @param successMessage     请求成功提示  可选项: null-不提示   undefine-'操作成功'
 * @returns Promise
 */
export function commonConfirm(cfg: TablexCfgType, successMessage?: string | null) {
  return new Promise((resolve, reject) => {
    submit(cfg).then(() => {
      if (successMessage !== null) message.success(successMessage || '操作成功')
      resolve(cfg.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * 操作成功提示
 * @param sucessText
 */
export function messageSucess(sucessText?:string) {
  message.success(sucessText || '操作成功')
}
