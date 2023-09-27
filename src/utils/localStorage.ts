/*
 * @Description: 本地存储工具类-提供统一的本地存储方法
 * @Author: laigt
 * @Date: 2023-02-22
*/

/**
 * 获取本地存储
 * @param key
 * @returns
 */
export function getLocalStorage(key) {
  return localStorage.getItem(key)
}

/**
 * 设置本地存储数据
 * @param key
 * @param data
 */
export function setLocalStorage (key: string, data) {
  localStorage.setItem(key, data)
}

/**
 * 清理数据
 */
export function clearLocalStorage(key: string) {
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
}

/**
 * 获取本地存储-sessionStorage
 * @param key
 * @returns
 */
export function getSessionStorage(key) {
  return sessionStorage.getItem(key)
}

/**
 * 设置本地存储数据-sessionStorage
 * @param key
 * @param data
 */
export function setSessionStorage (key: string, data) {
  sessionStorage.setItem(key, data)
}

/**
 * 清理数据-sessionStorage
 */
export function clearSessionStorage(key: string) {
  sessionStorage.removeItem(key)
}
