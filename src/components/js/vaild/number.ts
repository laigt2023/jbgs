import type { Rule } from 'ant-design-vue/es/form'
export default {
  numberBetween(start: number, end: number) {
    return async (_rule: Rule, value: string) => {
      if (!value) {
        return Promise.resolve()
      }
      const reg = /^(-?\d+)(\.\d+)?$/

      if (!reg.test(value)) {
        return Promise.reject('请输入正确的数字')
      }

      if (Number.parseFloat(value) < start || Number.parseFloat(value) > end) {
        return Promise.reject(`请输入【${start} 至 ${end}】范围的数字`)
      }
      return Promise.resolve()
    }
  }

}
