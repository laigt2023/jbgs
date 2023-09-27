import type { Rule } from 'ant-design-vue/es/form'
export default {
  async rtspURL(_rule: Rule, value: string) {
    const URL = 'rtsp://'
    if (!value) {
      return Promise.resolve()
    }

    if (value.indexOf(URL) !== 0) {
      return Promise.reject(`请输入格式为${URL}为首的地址`)
    }

    return Promise.resolve()
  }
}
