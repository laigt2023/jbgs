/* eslint-disable @typescript-eslint/ban-types */

function isPromise(obj) {
  return !!obj && // 有实际含义的变量才执行方法，变量null，undefined和''空串都为false
        (typeof obj === 'object' || typeof obj === 'function') && // 初始promise 或 promise.then返回的
        typeof obj.then === 'function'
}

/**
 * 统一的定时任务调度器对象（代替setInterval方法，解决间隔时间不稳定问题），对定时循环任务进行控制，避免重复执行，以及停止、启动
 * @param fn  传的类型为Function
 * fn 返回为void时，需要手动执行startNext方式，开启下一次定时任务
 * fn 返回的是Promise对象时，则无需调用startNext方式，在Promise.then中自动开启下一次定时任务，停止时只需要调用TaskScheduler.stop()方法
 * 详细请看callFn方法的实现
 */

export class TaskScheduler {
  taskId: number | undefined
  fn: Function
  delayTime = 1000
  constructor(fn: Function, delayTime?: number) {
    this.taskId = undefined
    this.fn = fn
    this.delayTime = delayTime || this.delayTime
  }

  start = (isDelay = false) => {
    // 不做延迟泽立即执行一遍
    if (!isDelay) {
      this.callFn()
    }
    // 开启一下一次执行任务
    this.startNext()
  }

  stop = () => {
    if (window && window.clearTimeout) {
      window.clearTimeout(this.taskId)
    }
    this.taskId = undefined
  }

  startNext = () => {
    // 避免重复执行
    if (this.taskId) {
      this.stop()
    }
    this.taskId = setTimeout(this.callFn as Function, this.delayTime)
  }

  // 调用fn方法
  callFn = () => {
    const result = this.fn()
    // 如果fn返回的时Promise对象，则自动创建下一次定时任务
    if (isPromise(result)) {
      result.then(() => {
        this.startNext()
      }).catch(() => {
        this.stop()
      })
    }
  }

  setDelayTime = (delayTime?: number) => {
    this.delayTime = delayTime || this.delayTime
  }
}
