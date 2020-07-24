import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import store from './store'
import axios from 'axios'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazy from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
Vue.use(VueCookie)
// Vue.use(Message);
Vue.prototype.$cookie = VueCookie;
Vue.use(VueLazy,{
  loading:'/imgs/loading-cylon-red.svg'
})
// import env from './env.js'
// import jsonp from 'jsonp'
//生产环境的提示
Vue.config.productionTip = false

// const mock = true
// if (mock) {
//   require ('./mock/api')
// }
//根据前端的跨域方式做调整
// axios.defaults.baseURL = '  https://easy-mock.com/mock/5efc1cce4d47bc036db9dad0/mimall'
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
//根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL
//错误拦截
axios.interceptors.response.use (function(response){
  //获取接口的值
  let res = response.data
  let path =location.hash
  if (res.status == 0){
    return res.data
  }else if (res.status == 10){
    //未登录时候跳转到登录界面
    if (path != "#/index"){
      window.location.href = '/#/login'
    }
    return Promise.reject(res)
  }else{
    Message.warning(res.msg)
    return Promise.reject(res)
  }
},(error) => {
 let res = error.response
 Message.error(res.data.message)
 return Promise.reject(error)
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')