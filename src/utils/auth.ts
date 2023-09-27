/*
 * @Description: 用户工具类-提供登陆用户数据持久化方法
 * @Author: laigt
 * @Date: 2023-02-2
*/

/**
 * 使用本地存储保持用户登陆状态
 */
const TokenKey = 'app-token'
// 是否使用本地存储  true-localStorage   false-sessionStorage
const useLocalStorage = true
/**
 * 登陆检查
 * @returns
 */
const isLogin = () => {
  const result = useLocalStorage ? !!localStorage.getItem(TokenKey) : !!sessionStorage.getItem(TokenKey)
  return result
}
/**
 * 获取当前保存的用户token数据
 * @returns
 */
const getToken = () => {
  const result = useLocalStorage ? localStorage.getItem(TokenKey) : sessionStorage.getItem(TokenKey)
  return result
}
/**
 * 保存当前用户的token数据
 * @param token token数据
 */
const setToken = (token: string) => {
  useLocalStorage ? localStorage.setItem(TokenKey, token) : sessionStorage.setItem(TokenKey, token)
}
/**
 * 清理token数据
 */
const clearToken = () => {
  localStorage.removeItem(TokenKey)
  sessionStorage.removeItem(TokenKey)
}

const getStorageMode = () => {
  return useLocalStorage ? 'localStorage' : 'sessionStorage'
}

export { isLogin, getToken, setToken, clearToken, getStorageMode }
export default { isLogin, getToken, setToken, clearToken, getStorageMode }
