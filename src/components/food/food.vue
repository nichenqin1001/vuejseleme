<template>
  <div id='food' class="food" ref="food">
    <div class="food__wrapper">
      <div class="food__header">
        <img :src="selectedFood.image" alt="" class="food__header-img">
        <i class="icon-arrow_lift" @click="exitFoodDetail"></i>
      </div>
      <div class="food__content">
        <div class="food__content-title">{{selectedFood.name}}</div>
        <div class="food__content-rating">月售{{selectedFood.sellCount}}份 好评率{{selectedFood.rating}}%</div>
        <div class="food__content-price">
          <span class="food__content-price_status_new">￥{{selectedFood.price}}</span>
          <span v-if="selectedFood.oldPrice" class="food__content-price_status_old">￥{{selectedFood.oldPrice}}</span>
        </div>
        <div class="food__content-add">
          <div v-if="!selectedFood.count" class="food__content-add_status_empty" @click="addFood" ref="addFood">加入购入车</div>
          <cartcontrol :food="selectedFood" v-if="selectedFood.count" class="food__content-add_status_full"></cartcontrol>
        </div>
      </div>
      <div class="food__desc" v-if="selectedFood.info">
        <div class="food__desc-title">商品介绍</div>
        <div class="food__desc-content">{{selectedFood.info}}</div>
      </div>
      <div class="food__ratings">
        <div class="food__ratings-title">商品评价</div>
        <ratingtype :ratings="selectedFood.ratings"></ratingtype>
        <transition-group class="rating__comments" tag='ul' name="custom-classes-transition" enter-active-class='animated bounceInLeft'
          leave-active-class='animated bounceOutLeft'>
          <li :key='index' v-if="toggleComment(rating.rateType,rating.text)" class="rating__comments-comment" v-for="(rating,index) in selectedFood.ratings">
            <div class="rating__comments-comment_left">
              <div class="rating__comments-comment_left__date">{{ratingTime[index]}}</div>
              <div class="rating__comments-comment_left__comment">
                <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i> {{rating.text}}
              </div>
            </div>
            <div class="rating__comments-comment_right">
              <div class="rating__comments-comment_right_username">{{rating.username}}</div>
              <img :src="rating.avatar" alt="" class="rating__comments-comment_right_avatar">
            </div>
          </li>
          </transition-group>
          <div v-show="!selectedFood.ratings||!selectedFood.ratings.length" class="rating__no-comment">暂无评价</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Bscroll from 'better-scroll'
  import cartcontrol from 'components/cartControl/cartControl'
  import ratingtype from 'components/rating-type/rating-type'
  export default {
    name: 'food',
    data() {
      return {
        detailScroll: ''
      }
    },
    props: ['selectedFood'],
    components: {
      cartcontrol,
      ratingtype
    },
    computed: {
      ratingTime() {
        let ratingTime = []
        this.selectedFood.ratings.forEach((rating) => {
          var date = new Date(rating.rateTime)
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          let D = date.getDate() + ' '
          let h = date.getHours() + ':'
          let m = date.getMinutes() + ':'
          let s = date.getSeconds()
          var newTime = Y + M + D + h + m + s
          ratingTime.push(newTime)
        })
        return ratingTime
      },
      rateType() {
        return this.$store.getters.getRateType
      },
      textOnly() {
        return this.$store.getters.getTextOnly
      },
      rect() {
        let rect = {
          top: 0,
          left: 0
        }
        return rect
      }
    },
    updated() {
      this._setDetailScroll()
      this._setFatherScroll()
    },
    methods: {
      _setDetailScroll() {
        if (this.$store.getters.getShowFoodDetail) {
          if (!this.$store.state.detailScroll) {
            let scroll = new Bscroll(this.$refs.food, {
              click: true
            })
            this.$store.dispatch('updateDetailScroll', scroll)
          } else {
            this.$store.state.detailScroll.refresh()
            console.log('detailscrollrefresh')
          }
        }
      },
      _setFatherScroll() {
        if (this.$store.state.rateTypeFatherScroll !== this.$store.state.detailScroll) {
          this.$store.dispatch('updateFatherScroll', this.$store.state.detailScroll)
        } else {
          return
        }
      },
      exitFoodDetail() {
        this.$store.dispatch('toggleFoodDetail', false)
      },
      addFood() {
        this.rect.top = this.$refs.addFood.getBoundingClientRect().top
        this.rect.left = this.$refs.addFood.getBoundingClientRect().left
        this.$store.dispatch('updateTop', this.rect.clickTop)
        this.$store.dispatch('updateLeft', this.rect.clickLeft)
        if (!this.selectedFood.count) {
          Vue.set(this.selectedFood, 'count', 1)
        }
        this.$emit('add')
      },
      toggleComment(type, text) {
        if (this.textOnly && !text) {
          return false
        }
        if (this.rateType === 2) {
          return true
        } else {
          return type === this.rateType
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  @import './food.scss';

</style>
