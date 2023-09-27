import type { Rule } from 'ant-design-vue/es/form'

export default {
  async required(_rule: Rule, value: string) {
    if (value === undefined || value === null || value.length === 0) {
      return Promise.reject('这是必填项')
    }
    return Promise.resolve()
  }
}
