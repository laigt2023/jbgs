import required from './required'
import maxLength from './maxLength'
import number from './number'
import network from './network'
import contact from './contact'
import type { Rule } from 'ant-design-vue/es/form'

/**
 * 提供支持多个vaild校验规则同时生效的方法
 * @param vailds 校验列表
 * @returns
 */
function queue(vailds: Array<any>) {
  if (!vailds.length) {
    // eslint-disable-next-line no-unused-expressions
    async () => {
      return Promise.resolve()
    }
  }

  return async (_rule: Rule, value: string) => {
    const promises = new Array<Promise<any>>()
    vailds.forEach((item) => {
      if (isPromise(item)) {
        promises.push(item as Promise<any>)
      } else {
        promises.push(item(_rule, value) as Promise<any>)
      }
    })

    await Promise.all(promises).then(() => {
      return Promise.resolve()
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}

function isPromise(obj) {
  return !!obj && // 有实际含义的变量才执行方法，变量null，undefined和''空串都为false
        (typeof obj === 'object' || typeof obj === 'function') && // 初始promise 或 promise.then返回的
        typeof obj.then === 'function'
}
export default { queue, ...required, ...maxLength, ...number, ...network, ...contact }
