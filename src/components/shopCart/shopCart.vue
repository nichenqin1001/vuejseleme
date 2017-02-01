<template>
  <div class="cart">
    <div class="content">
      <div class="content__left">
        <div class="content__left_icon">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="content__left_price">￥0</div>
        <div class="content__left_deliveryprice">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content__right">￥{{seller.minPrice}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['seller']
  }

</script>
<style lang="scss">
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
              .icon-shopping_cart {
                font-size: 24px;
                line-height: 44px;
                background: #2b343c;
                color: #80858a;
              }
            }
            #{&}_price {
              vertical-align: top;
              padding-left: 30px;
              padding-right: 12px;
              box-sizing: border-box;
              border-right: 1px solid rgba(255, 255, 255, 0.1);
              font-size: 16px;
              font-weight: 700;
            }
            #{&}_deliveryprice {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.4);
            }
          }
        }
        #{&}__right {
          @extend %flex-center;
          vertical-align: middle;
          flex: 0 0 105px;
          padding: 0 8px;
          height: 100%;
          font-size: 12px;
          font-weight: 700;
          line-height: 24px;
        }
      }
    }
  }

</style>
