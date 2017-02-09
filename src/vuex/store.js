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
  clsMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
  selectedFood: {},
  // boolean
  textOnly: true,
  showFoodsDetail: false,
  collected: false,
  rateType: 2,
  // scroller
  detailScroll: '',
  ratingScroll: '',
  rateTypeFatherScroll: '',
  sellerScroll: ''
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
  },
  TOGGLE_TEXT_ONLY(state) {
    state.textOnly = !state.textOnly
  },
  UPDATE_DETAIL_SCROLL(state, scroll) {
    state.detailScroll = scroll
  },
  UPDATE_RATING_SCROLL(state, scroll) {
    state.ratingScroll = scroll
  },
  UPDATE_SELLER_SCROLL(state, scroll) {
    state.sellerScroll = scroll
  },
  UPDATE_RATETYPE(state, rateType) {
    state.rateType = rateType
  },
  UPDATE_FATHER_SCROLL(state, scroll) {
    state.rateTypeFatherScroll = scroll
  },
  TOGGLE_COLLECTION(state) {
    state.collected = !state.collected
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
  },
  toggleTextOnly({
    commit
  }) {
    commit('TOGGLE_TEXT_ONLY')
  },
  updateDetailScroll({
    commit
  }, scroll) {
    commit('UPDATE_DETAIL_SCROLL', scroll)
  },
  updateRatingScroll({
    commit
  }, scroll) {
    commit('UPDATE_RATING_SCROLL', scroll)
  },
  updateSellerScroll({
    commit
  }, scroll) {
    commit('UPDATE_SELLER_SCROLL', scroll)
  },
  updateRatetype({
    commit
  }, rateType) {
    commit('UPDATE_RATETYPE', rateType)
  },
  updateFatherScroll({
    commit
  }, scroll) {
    commit('UPDATE_FATHER_SCROLL', scroll)
  },
  toggleCollection({
    commit
  }) {
    commit('TOGGLE_COLLECTION')
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
  },
  getTextOnly(state) {
    return state.textOnly
  },
  getRateType(state) {
    return state.rateType
  },
  getDetailScroll(state) {
    return state.detailScroll
  },
  getRatingScroll(state) {
    return state.ratingScroll
  },
  getSellerScroll(state) {
    return state.sellerScroll
  },
  getFatherScroll(state) {
    return state.rateTypeFatherScroll
  },
  getCollection(state) {
    return state.collected
  },
  getClassMap(state) {
    return state.clsMap
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
