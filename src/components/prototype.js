import initRules from './initRules' // 初始化验证规则

export default {
  install (Vue, options) {
    Vue.prototype.$initRules = initRules

  }
}