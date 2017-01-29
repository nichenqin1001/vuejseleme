// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/content/goods'
import ratings from 'components/content/ratings'
import seller from 'components/content/seller'

Vue.use(VueRouter)
Vue.use(VueResource)

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
