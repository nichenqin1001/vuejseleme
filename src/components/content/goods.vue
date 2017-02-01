<template>
  <div class="goods">
    <div class="menu" ref="menuScroll">
      <ul class="menu__goods">
        <li class="menu__goods_good" v-for="(good,index) in goods" ref="menuList">
          <span class="menu__goods_good_text">
            <span v-if="good.type>0" class="menu__goods_good_icon" :class="'icon-'+clsMap[good.type]"></span> {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods" ref="foodsScroll">
      <ul class="foods__goods-name">
        <li v-for="(good,index) in goods" class="foods__goods-foods" ref="foodsList">
          <h1 class="foods__goods-foods_name">{{good.name}}</h1>
          <div class="foods__goods-foods_food" v-for="(food,index) in good.foods">
            <img :src="food.image" alt="" class="foods__goods-foods_food_img">
            <div class="foods__goods-foods_food_desc">
              <h2 class="foods__goods-foods_food_desc-name">{{food.name}}</h2>
              <p class="foods__goods-foods_food_desc-desc">{{food.description}}</p>
              <p class="foods__goods-foods_food_desc-sell">
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </p>
              <div class="foods__goods-foods_food_desc-price">
                <span class="foods__goods-foods_food_desc-price_new">￥{{food.price}}</span>
                <span v-if="food.oldPrice" class="foods__goods-foods_food_desc-price_old">￥{{food.oldPrice}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  const ERR_OK = 0
  export default {
    name: 'goods',
    data() {
      return {
        goods: [],
        clsMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        menuScroll: '',
        foodsScroll: '',
        currentScreenIndex: 0,
        scrollY: 0
      }
    },
    props: ['seller'],
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._setMenuBackground()
            this._initScroll()
          })
        }
      })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new Bscroll(this.$refs.menuScroll)
        this.foodsScroll = new Bscroll(this.$refs.foodsScroll, {
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
          this._getCurrentScreenIndex()
          this._setMenuBackground()
          console.log(this.currentScreenIndex)
        })
      },
      _getCurrentScreenIndex() {
        var foodsList = this.$refs.foodsList
        for (var i = 0; i < foodsList.length; i++) {
          var foodsTop = foodsList[i].offsetTop
          if (this.scrollY - foodsTop < 0) {
            break
          }
          this.currentScreenIndex = i
        }
      },
      _setMenuBackground() {
        var menuList = this.$refs.menuList
        menuList.forEach(function (menu) {
          menu.classList.remove('menu-active')
        })
        menuList[this.currentScreenIndex].classList.add('menu-active')
      }
    }
  }

</script>
<style lang="scss">
  .goods {
    display: flex;
    flex-flow: row;
    position: absolute;
    top: 182.5px;
    bottom: 46px;
    overflow: hidden;
    .menu {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      @at-root {
        #{&}__goods {
          list-style: none;
          margin: 0 auto;
          padding: 0 10px;
          @at-root {
            #{&}_good {
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: center;
              text-align: left;
              width: 56px;
              height: 59px;
              border-bottom: 1px solid rgba(7, 17, 27, 0.1);
              &.menu-active{
                background: white;
              }
              @at-root {
                #{&}_text {
                  display: inline-block;
                  font-size: 12px;
                }
                #{&}_icon {
                  display: inline-block;
                  height: 12px;
                  width: 12px;
                  background-size: contain;
                }
              }
            }
          }
        }
      }
    }
    .foods {
      flex: 1;
      @at-root {
        #{&}__goods-name {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        #{&}__goods-foods {
          display: flex;
          flex-flow: column;
          @at-root {
            #{&}_name {
              margin: 0;
              width: 100%;
              height: 26px;
              background: #f3f5f7;
              border-left: 2px solid #d9dde1;
              font-size: 12px;
              color: rgb(147, 153, 159);
              line-height: 26px;
              text-align: left;
              padding-left: 14px;
            }
            #{&}_food {
              display: flex;
              flex-flow: row;
              padding: 18px;
              text-align: left;
              border-bottom: 1px solid rgba(7, 17, 27, 0.1);
              @at-root {
                #{&}_img {
                  display: inline-block;
                  height: 60px;
                  width: 60px;
                  margin-right: 10px;
                }
                #{&}_desc {
                  @at-root {
                    #{&}-name {
                      font-size: 14px;
                      color: rgb(7, 17, 27);
                      line-height: 14px;
                      margin: 2px 0 8px;
                    }
                    #{&}-desc,
                    #{&}-sell {
                      font-size: 10px;
                      color: rgb(147, 153, 159);
                      line-height: 10px;
                      margin-bottom: 8px;
                    }
                    #{&}-price {
                      @at-root {
                        #{&}_new {
                          font-size: 14px;
                          color: red;
                          font-weight: 700;
                          line-height: 24px;
                          &::first-letter {
                            font-size: 10px;
                            color: red;
                          }
                        }
                        #{&}_old {
                          font-size: 10px;
                          color: rgb(147,153,159);
                          font-weight: 700;
                          line-height: 24px;
                          text-decoration: line-through;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>
