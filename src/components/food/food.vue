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
          <div v-if="!selectedFood.count" class="food__content-add_status_empty" @click="addFood">加入购入车</div>
          <cartcontrol :food="selectedFood" v-if="selectedFood.count" class="food__content-add_status_full"></cartcontrol>
        </div>
      </div>
      <div class="food__desc" v-if="selectedFood.info">
        <div class="food__desc-title">商品介绍</div>
        <div class="food__desc-content">{{selectedFood.info}}</div>
      </div>
      <div class="food__ratings">
        <div class="food__ratings-title">商品评价</div>
        <ratingtype :ratings="selectedFood.ratings" :foodDOM="foodDOM"></ratingtype>
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
    updated() {
      this._setDetailScroll()
    },
    methods: {
      _setDetailScroll() {
        if (this.$store.getters.getShowFoodDetail) {
          if (!this.detailScroll) {
            this.detailScroll = new Bscroll(this.$refs.food, {
              click: true
            })
          } else {
            this.detailScroll.refresh()
          }
        }
      },
      exitFoodDetail() {
        this.$store.dispatch('toggleFoodDetail', false)
      },
      addFood() {
        if (!this.selectedFood.count) {
          return
        } else {
          this.$emit('add')
          Vue.set(this.selectedFood, 'count', 1)
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  @import './food.scss';

</style>
