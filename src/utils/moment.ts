/*
 * @Description: 时间日期工具类
 * @Author: laigt
 * @Date: 2023-02-2
*/

import moment from 'moment'
/**
 * 日期统一格式
 * @param str 时间
 * @param format 格式（默认：'YYYY-MM-DD'）
 * @returns
 */
export function dateFormat(str:string, format = 'YYYY-MM-DD'): string {
  if (!str) {
    return '--'
  }
  try {
    return moment(str).format(format)
  } catch (e) {
    return '--'
  }
}

/**
 * 时间统一格式
 * @param str 时间
 * @param format 格式（默认：'YYYY-MM-DD HH:mm:ss'）
 * @returns
 */
export function datetimeFormat(str:string, format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (!str) {
    return '--'
  }
  try {
    return moment(str).format(format)
  } catch (e) {
    return '--'
  }
}
export default {
  dateFormat,
  datetimeFormat
}
