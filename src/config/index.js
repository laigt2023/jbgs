/*
 * @Description: 项目配置-自定义全局变量定义
 * @Author: laigt
 * @Date: 2023-02-2
*/

import {
  API_MOCK,
  API_BASE_URL,
  MOCK_API_TARGET_URL,
  MOCK_API_BASE_URL,
  SERVER_PORT,
  ENV_MODE,
  ENV,
  ERROR_404_IMG_URL,
  DEFAULT_IMG_URL,
  APP_NAME,
  ROUTER_MODE,
  APP_IS_DEMO
} from './constant'
const env = ENV_MODE || 'prod'
const CONFIG = {
  env,
  ENV,
  mock: API_MOCK,
  SERVER_PORT,
  baseApi: API_BASE_URL,
  mockApi: MOCK_API_TARGET_URL,
  mockBaseUrl: MOCK_API_BASE_URL,
  error404Url: ERROR_404_IMG_URL,
  defaultUrl: DEFAULT_IMG_URL,
  appName: APP_NAME,
  ROUTER_MODE,
  APP_IS_DEMO
}

export default CONFIG
