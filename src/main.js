// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import store from './vuex/store'

import 'common/scss/index.scss'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
import App from './App'

const routes = [{
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'tab-active'
})

router.push('/goods')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
