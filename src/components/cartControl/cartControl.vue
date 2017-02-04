<template>
  <div class="cartcontrol">
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="food.count>0" class="cartcontrol__decrease" @click="decreaseFoodCount()" key="decrease">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="food.count>0" class="cartcontrol__count" key="count">{{food.count}}</div>
    </transition>
    <div class="cartcontrol__increase" @click="increaseFoodCount()">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'cartcontrol',
    props: ['food'],
    methods: {
      increaseFoodCount() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseFoodCount() {
        if (this.food.count === 0) {
          return
        } else {
          this.food.count--
        }
      }
    }
  }

</script>
<style lang="scss">
  @import '../../common/scss/variables.scss';
  @import '../../common/scss/mixin.scss';
  @import '../../common/scss/placeholder.scss';
  .cartcontrol {
    position: absolute;
    right: 0;
    bottom: 12px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    @at-root {
      #{&}__decrease {
        @extend %flex-center;
        font-size: 24px;
        color: rgb(0, 160, 220);
        flex: 0 0 33.33%;
        height: 100%;
        color: $shop-cart-active-background;
      }
      #{&}__count {
        @extend %flex-center;
        width: 12px;
        font-size: 16px;
        flex: 0 0 33.33%;
        height: 100%;
      }
      #{&}__increase {
        @extend %flex-center;
        font-size: 24px;
        color: rgb(0, 160, 220);
        flex: 0 0 33.33%;
        height: 100%;
        color: $shop-cart-active-background;
      }
    }
  }

  .fadeIn,
  .fadeOut {
    animation-duration: 0.3s;
  }

</style>
