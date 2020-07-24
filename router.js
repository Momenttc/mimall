import Vue from 'vue'
import Router from 'vue-router'
Vue.use (Router)

import Home from './src/page/home'
import Index from './src/page/index'

const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'product/:id',
          name: 'product',
          component: resolve => require(['./src/page/product.vue'],resolve)
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: resolve => require(['./src/page/detail.vue'],resolve)
        }
      ]
    },
    {
      path: '/login',
      name:'login',
      component: resolve => require(['./src/page/login.vue'],resolve)
    },
    {
      path: '/cart',
      name:'cart',
      component: resolve => require(['./src/page/cart.vue'],resolve)
    },
    {
      path: '/order',
      name:'order',
      component: resolve => require(['./src/page/order.vue'],resolve),
      children: [
        {
          path: 'confirm',
          name:'order-confirm',
          component: resolve => require(['./src/page/orderConfirm.vue'],resolve)
        },
        {
          path: 'list',
          name:'order-list',
          component: resolve => require(['./src/page/orderList.vue'],resolve)
        },
        {
          path: 'pay',
          name:'order-pay',
          component: resolve => require(['./src/page/orderPay.vue'],resolve)
        },
        {
          path: 'alipay',
          name: 'order-alipay',
          component: resolve => require(['./src/page/alipay.vue'],resolve)
        }
      ]
    },
  ]
})