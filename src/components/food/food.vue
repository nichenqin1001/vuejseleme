<template>
  <div id='food' class="food" ref="food">
    <div class="food__wrapper">
      <div class="food__header">
        <img :src="selectedFood.image" alt="" class="food__header-img">
        <i class="icon-arrow_lift" @click="exitFoodDetail"></i>
      </div>
      <div class="food__content">
        <div class="food__content-title">{{selectedFood.name}}</div>
        <div class="food__content-rating">月售{{selectedFood.sellCount}}份 好评率{{selectedFood.rating}}</div>
        <div class="food__content-price">
          <span class="food__content-price_status_new">￥{{selectedFood.price}}</span>
          <span v-if="selectedFood.oldPrice" class="food__content-price_status_old">￥{{selectedFood.oldPrice}}</span>
        </div>
        <div class="food__content-add">
          <div v-if="!selectedFood.count" class="food__content-add_status_empty" @click="addFood">加入购入车</div>
          <cartcontrol :food="selectedFood" v-if="selectedFood.count" class="food__content-add_status_full"></cartcontrol>
        </div>
      </div>
      <div class="food__detail"></div>
      <div class="food__desc"></div>
      <div class="food__ratings"></div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Bscroll from 'better-scroll'
  import cartcontrol from 'components/cartControl/cartControl'
  export default {

    name: 'food',
    props: ['selectedFood'],
    components: {
      cartcontrol
    },
    computed: {
      detailScroll() {
        let detailScroll = ''
        if (this.$store.getters.getShowFoodDetail === true) {
          if (!detailScroll) {
            detailScroll = new Bscroll(this.$refs.food, {
              click: true
            })
          } else {
            detailScroll.refresh()
          }
        }
        return detailScroll
      }
    },
    methods: {
      exitFoodDetail() {
        this.$store.dispatch('toggleFoodDetail', false)
      },
      addFood() {
        if (this.selectedFood.count) {
          return
        } else {
          Vue.set(this.selectedFood, 'count', 1)
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  @import '../../common/scss/variables.scss';
  .food {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 46px;
    left: 0;
    z-index: 1;
    width: 100%;
    background-color: #f3f5f7;
    @at-root {
      #{&}__header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        @at-root {
          #{&}-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        .icon-arrow_lift {
          position: absolute;
          top: 10px;
          left: 0;
          display: block;
          padding: 10px;
          font-size: 20px;
        }
      }
      #{&}__content {
        position: relative;
        padding: 18px;
        background-color: #fff;
        text-align: left;
        border-bottom: 1px solid $line-color;
        @at-root {
          #{&}-title {
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
            line-height: 14px;
            padding-bottom: 8px;
          }
          #{&}-rating {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            padding-bottom: 18px;
          }
          #{&}-price {
            @at-root {
              #{&}_status_new {
                font-size: 14px;
                font-weight: 700;
                color: rgb(240, 20, 20);
                line-height: 14px;
              }
              #{&}_status_old {
                font-size: 10px;
                font-weight: 700;
                color: rgb(147, 153, 159);
              }
            }
          }
          #{&}-add {
            position: absolute;
            right: 18px;
            bottom: 18px;
            @at-root {
              #{&}_status_empty {
                height: 24px;
                width: 74px;
                color: #fff;
                background-color: $shop-cart-active-background;
                font-size: 10px;
                text-align: center;
                line-height: 24px;
                border-radius: 12px/50%;
              }
              #{&}_status_full {
                bottom: 0;
              }
            }
          }
        }
      }
      #{&}__detail {}
      #{&}__desc {}
      #{&}__ratins {}
    }
  }

</style>
