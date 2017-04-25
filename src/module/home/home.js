import Vue from 'vue'
import Element from 'element-ui'
import '../../../theme/index.css'
import VueRouter from 'vue-router'
import routeConfig from '../../router-config'
import App from './App'
import MyComponents from '../index'

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
