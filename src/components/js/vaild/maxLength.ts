import type { Rule } from 'ant-design-vue/es/form'
export default {
  maxLength(minValue: number, maxValue: number) {
    return async (_rule: Rule, value: string) => {
      if (!value) {
        return Promise.resolve()
      }

      if (value.length > maxValue) {
        return Promise.reject(`长度不能大于${maxValue}`)
      }
      if (value.length < minValue) {
        return Promise.reject('长度不能小于' + minValue)
      }
      return Promise.resolve()
    }
  }

}
