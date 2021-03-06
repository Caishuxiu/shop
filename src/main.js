// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'

import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/global.css'

import App from './App'
import myBread from '@/components/custom/myBread.vue'

import router from './router'

Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false

// 全局过滤器 - 处理日期
Vue.filter('fmtDate', (v) => {
  return moment(v).format('YYYY-MM-DD hh:mm:ss')
})

// 全局自定义组件
Vue.component(myBread.name, myBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
