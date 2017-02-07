import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  // TODO: 放置初始状态
  rect: {
    top: 0,
    left: 0
  },
  showFoodsDetail: false,
  selectedFood: {}
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // TODO: 放置我们的状态变更函数
  UPDATE_TOP(state, top) {
    state.rect.top = top
  },
  UPDATE_LEFT(state, left) {
    state.rect.left = left
  },
  TOGGLE_FOOD_DETAIL(state, showFoodsDetail) {
    state.showFoodsDetail = showFoodsDetail
  },
  FRESH_SELECTED_FOOD(state, food) {
    state.selectedFood = food
  }
}

const actions = {
  updateTop({
    commit
  }, top) {
    commit('UPDATE_TOP', top)
  },
  updateLeft({
    commit
  }, left) {
    commit('UPDATE_LEFT', left)
  },
  toggleFoodDetail({
    commit
  }, showFoodsDetail) {
    commit('TOGGLE_FOOD_DETAIL', showFoodsDetail)
  },
  freshSelectedFood({
    commit
  }, food) {
    commit('FRESH_SELECTED_FOOD', food)
  }
}

const getters = {
  getRect(state) {
    return state.rect
  },
  getShowFoodDetail(state) {
    return state.showFoodsDetail
  },
  getSelectedFood(state) {
    return state.selectedFood
  }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
