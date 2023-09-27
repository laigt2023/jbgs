/*
 * @Description: 定义用户数据类型
 * @Author: laigt
 * @Date: 2023-02-2
*/

export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserState {
  uuId?: undefined,
  account?:undefined,
  username?: undefined | string,
  password?: undefined,
  nickname?: undefined,
  phone?: undefined,
  type?: undefined,
  tokenId?: string,
  code?: string,
  status?: number | string,
  roles?: Array<any>,
  dept?: any,
}
