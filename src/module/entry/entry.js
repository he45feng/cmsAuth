import Vue from 'vue'
import Element from 'element-ui'
import VueRouter from 'vue-router'
import '../../../theme/index.css'
import routeConfig from '../../router-config'
import App from './App'

Vue.use(Element)
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routeConfig
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})