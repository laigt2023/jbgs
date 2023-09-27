/* eslint-disable @typescript-eslint/ban-types */
export interface ColumnsType {
  title: string;
  dataIndex?: string;
  key: string;
}

export interface TablexCfgParamType {
  url?: string;
  api?: any;
  params?: any;
  loading: boolean;
  pageSize?: number;
  pageNo?: number;
  total?: number;
  columns: Array<ColumnsType>;
  data?: Array<any>;
  errorMessage?: string;
  noDataText?: string;
  handleRequest?: Function
  handleResponse?: Function
}

// 配置分页传参参数名 - 当前页数
const PAGE_NO_KEY = 'pageNum'
// 配置分页传参参数名 - 每页条数
const PAGE_SIEZ_KEY = 'pageSize'

/**
 * 构建tablexCfg参数
 * handleRequest: 请求前请求数据处理默认为（data）=>{ return data}  无返回值或返回为null || undefined 时，默认使用原请求参数
 * handleResponse：请求成功时，执行方法handleResponse（cfg:TablexCfgType,response)
 */
export interface TablexCfgType {
  url?: string;
  api?: any;
  params: any;
  loading: boolean;
  pageSize: number;
  pageNo: number;
  total?: number;
  columns: Array<ColumnsType>;
  data: Array<any>;
  errorMessage?: string;
  noDataText?: string;
  handleRequest?: Function
  handleResponse?: Function
}

/**
 * 请求前最后处理一次请求数据-data
 * @param data
 * @returns
 */
export function handleRequest(data: Object): Object {
  return data
}

const defaultCfg: TablexCfgType = {
  url: undefined,
  api: null,
  params: {},
  loading: false,
  pageNo: 1,
  pageSize: 10,
  total: 10,
  columns: [],
  data: [],
  errorMessage: undefined,
  noDataText: undefined,
  // 请求前请求数据处理（data）=>{ return data}
  handleRequest,
  handleResponse: undefined
}

export function createCfg(cfg: TablexCfgParamType): TablexCfgType {
  const result = Object.assign({}, defaultCfg, cfg)
  return result
}
/**
 * 内部统一发起API请求方法
 * @param cfg
 * @returns
 */
const requestApi = (cfg: TablexCfgType) => {
  cfg.errorMessage = ''
  cfg.params[PAGE_NO_KEY] = cfg.pageNo
  cfg.params[PAGE_SIEZ_KEY] = cfg.pageSize

  const requestData = cfg.handleRequest ? cfg.handleRequest(cfg.params) || cfg.params : cfg.params
  return new Promise((resolve, reject) => {
    cfg
      .api(requestData)
      .then((res) => {
        // const data = res.data
        const data = res

        if (data && Array.isArray(data.list)) {
          cfg.data = data.list
        }

        if (data && Array.isArray(data.rows)) {
          cfg.data = data.rows
        }

        cfg.pageNo = data.pageNo ? data.pageNo : cfg.pageNo
        cfg.pageSize = data.pageSize ? data.pageSize : cfg.pageSize

        const total = data.total || data.totalCount

        cfg.total = total || cfg.total
        resolve(res)
      })
      .catch((error) => {
        cfg.errorMessage = error.message
        reject(error)
      })
  })
}
/**
 * 表格：统一搜索方法
 * @param cfg
 * @returns
 */
export function serach(cfg: TablexCfgType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    cfg.loading = true
    cfg.pageNo = 1
    if (cfg.api) {
      requestApi(cfg).then((res) => {
        cfg.loading = false

        // 执行处理请求方法
        if (cfg.handleResponse) {
          cfg.handleResponse(cfg, res)
        }

        resolve(res)
      }).catch(() => {
        cfg.loading = false
      })
    }
  })
}

export function refresh(cfg: TablexCfgType) {
  return new Promise((resolve, reject) => {
    cfg.loading = true
    if (cfg.api) {
      requestApi(cfg).then((res) => {
        cfg.loading = false

        // 执行处理请求方法
        if (cfg.handleResponse) {
          cfg.handleResponse(cfg, res)
        }

        resolve(res)
      }).catch((error) => {
        reject(error)
        cfg.loading = false
      })
    }
  })
}

export default { createCfg, serach, refresh }
