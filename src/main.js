// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'
import App from './App'

//引入mintUI
import Mint from 'mint-ui'
Vue.use(Mint)

//引入vuex
import store from '@/store/index'
//svg 引入
import Icon from 'vue-svg-icon/Icon.vue'
//引入fastclick防止移动端300ms延迟
import FastClick from 'fastclick'

Vue.component('icon',Icon)

Vue.config.productionTip = false
import router from './router'
//引用自定义css文件
import './assets/css/all.css'
import 'mint-ui/lib/style.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
