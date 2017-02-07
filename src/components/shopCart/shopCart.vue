<template>
  <div class="cart">
    <div class="content">
      <div class="content__left" @click="listContentShow">
        <div :class="{content__left_icon_status_active:totalCount>0}" class="content__left_icon">
          <i :class="{'icon-active':totalCount>0}" class="icon-shopping_cart"></i>
        </div>
        <div v-if="totalCount>0" class="content__left_count">{{totalCount}}</div>
        <div :class="{'content__left_price_status_active':totalPrice>0}" class="content__left_price">￥{{totalPrice}}</div>
        <div class="content__left_deliveryprice">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div v-if="totalPrice===0" class="content__right">￥{{seller.minPrice}}元起送</div>
      <div v-else-if="totalPrice<seller.minPrice" class="content__right">还差￥{{diffPrice}}元起送</div>
      <div v-else class="content__right content__right_status_active">去结算</div>
    </div>
    <div class="balls">
      <transition-group tag="ul" name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
        <li :key="ball.id" v-if="ball.show" class="balls__ball" v-for="(ball,index) in balls">
        </li>
      </transition-group>
    </div>
    <transition-group name="fold" v-show="listShow" class="list" tag="div">
      <div key="header" class="list__header" v-show="listShow" @click="listContentShow">
        <h3 class="list__header-title">购物车</h3>
        <div class="list__header-empty" @click="empty">清空</div>
      </div>
      <div key="content" class="list__content" ref="listScroll" v-show="!fold">
        <ul>
          <li class="list__content-food" v-for="(food,index) in selectedFoods">
            <span class="list__content-food_name">{{food.name}}</span>
            <span class="list__content-food_price">{{food.price}}</span>
            <cartcontrol @add="drop()" :food="food"></cartcontrol>
          </li>
        </ul>
      </div>
    </transition-group>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div @click="listContentShow" class="cover" v-show="!fold"></div>
    </transition>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  import cartcontrol from 'components/cartControl/cartControl'
  export default {
    data() {
      return {
        balls: [{
            id: 1,
            show: false
          },
          {
            id: 2,
            show: false
          },
          {
            id: 3,
            show: false
          },
          {
            id: 4,
            show: false
          },
          {
            id: 5,
            show: false
          }
        ],
        dropballs: [],
        listScroll: '',
        fold: true
      }
    },
    components: {
      cartcontrol
    },
    props: {
      seller: Object,
      selectedFoods: Array
    },
    computed: {
      totalPrice() {
        var totalPrice = 0
        this.selectedFoods.forEach((food) => {
          totalPrice += food.price * food.count
        })
        return totalPrice
      },
      totalCount() {
        var totalCount = 0
        this.selectedFoods.forEach((food) => {
          totalCount += food.count
        })
        return totalCount
      },
      diffPrice() {
        return parseInt(this.seller.minPrice - this.totalPrice)
      },
      listShow() {
        if (!this.selectedFoods.length) {
          return false
        } else {
          if (!this.fold) {
            this.$nextTick(() => {
              if (!this.listScroll) {
                this.listScroll = new Bscroll(this.$refs.listScroll, {
                  click: true
                })
              } else {
                this.listScroll.refresh()
              }
            })
          }
          return true
        }
      }
    },
    methods: {
      drop() {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            this.dropballs.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          el.style.left = this.$store.getters.getRect.left + 'px'
          el.style.top = this.$store.getters.getRect.top + 'px'
        }
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter(el, done) {
        this.$nextTick(() => {
          el.style.left = 32 + 'px'
          el.style.top = window.innerHeight - 22 + 'px'
        })
        done()
      },
      afterEnter(el) {
        let ball = this.dropballs.shift()
        if (ball) {
          ball.show = false
        }
      },
      empty() {
        this.selectedFoods.forEach((food) => {
          food.count = 0
        })
        this.fold = true
      },
      listContentShow() {
        if (!this.listShow) {
          return
        }
        this.fold = (this.fold) ? '' : true
      }
    }
  }

</script>
<style lang="scss">
  @import '../../common/scss/variables.scss';
  @import '../../common/scss/placeholder.scss';
  @import '../../common/scss/mixin.scss';
  .cart {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 46px;
    .content {
      @extend %flex-center;
      flex-flow: row;
      height: 100%;
      @at-root {
        #{&}__left {
          @extend %flex-center;
          flex: 1;
          height: 100%;
          background: #141d17;
          z-index: 100;
          @at-root {
            #{&}_icon {
              @include absolute-position(-10px, 0, 0, 12px);
              display: inline-block;
              box-sizing: border-box;
              height: 56px;
              width: 56px;
              background: #2b343c;
              border-radius: 50%;
              border: 6px solid #141d17;
              @at-root {
                #{&}_status_active {
                  background: $shop-cart-active-background;
                }
              }
              .icon-shopping_cart {
                font-size: 24px;
                line-height: 44px;
                background: #2b343c;
                color: #80858a;
              }
              .icon-active {
                background: $shop-cart-active-background;
                color: $shop-cart-active-color;
              }
            }
            #{&}_count {
              @include absolute-position(-10px, 0, 0, 44px);
              box-sizing: border-box;
              max-width: 24px;
              height: 18px;
              background: rgb(240, 20, 20);
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
              color: #fff;
              font-size: 9px;
              font-weight: 700;
              line-height: 16px;
              border-radius: 6px/50%;
            }
            #{&}_price {
              vertical-align: top;
              padding-left: 30px;
              padding-right: 12px;
              box-sizing: border-box;
              border-right: 1px solid rgba(255, 255, 255, 0.1);
              font-size: 16px;
              font-weight: 700;
              @at-root {
                #{&}_status_active {
                  color: $shop-cart-active-color;
                }
              }
            }
            #{&}_deliveryprice {
              padding-left: 12px;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.4);
            }
          }
        }
        #{&}__right {
          @extend %flex-center;
          flex: 0 0 105px;
          padding: 0 8px;
          height: 100%;
          vertical-align: middle;
          font-size: 12px;
          font-weight: 700;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.4);
          background: #2b333b;
          z-index: 100;
          @at-root {
            #{&}_status_active {
              background: $shop-cart-active-background;
              color: $shop-cart-active-color;
            }
          }
        }
      }
    }
    .balls {
      @at-root {
        #{&}__ball {
          position: fixed;
          left: 32px;
          bottom: 22px;
          z-index: 200;
          width: 16px;
          height: 16px;
          list-style: none;
          border-radius: 50%;
          background: $shop-cart-active-background;
          transition: all .5s cubic-bezier(0.6, -0.28, 0.735, 0.045)
        }
      }
    }
    .list {
      position: fixed;
      bottom: 46px;
      width: 100%;
      z-index: 99;
      @at-root {
        #{&}__header {
          height: 40px;
          background: #f3f5f7;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          border: 1px solid rgba(7, 17, 27, 0.1);
          @at-root {
            #{&}-title {
              font-size: 14px;
              font-weight: 200;
              color: rgb(7, 17, 27);
              line-height: 40px;
            }
            #{&}-empty {
              font-size: 12px;
              color: $shop-cart-active-background;
              line-height: 40px;
            }
          }
        }
        #{&}__content {
          background: #fff;
          max-height: 211px;
          overflow: hidden;
          ul {
            list-style: none;
            margin: 0;
            padding: 0 18px;
          }
          @at-root {
            #{&}-food {
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid rgba(7, 17, 27, 0.1);
              @at-root {
                #{&}_name {
                  flex: 4;
                  text-align: left;
                  font-size: 14px;
                  color: rgb(7, 17, 27);
                }
                #{&}_price {
                  flex: 1;
                  font-size: 14px;
                  font-weight: 700;
                  color: rgb(240, 20, 20);
                }
              }
              .cartcontrol {
                flex: 1;
                padding: 0;
                position: static;
                @at-root {
                  #{&}__count {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                  }
                }
              }
            }
          }
        }
      }
    }
    .cover {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 98;
      background: rgba(7, 17, 27, .6);
    }
  }
  
  .fold-enter-active,
  .fold-leave-active {
    transition: all .5s
  }
  
  .fold-enter,
  .fold-leave-active {
    transform: translate3d(0, 100%, 0)
  }

</style>
