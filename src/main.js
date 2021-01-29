import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/main.css'

import prototype from '@/components/prototype' // 挂载在原型上的方法
Vue.use(prototype)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
