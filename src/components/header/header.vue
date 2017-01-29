<template>
  <div class="header">
    <div class="header__notice">
      <div class="header__notice-avatar">
        <img :src="seller.avatar">
      </div>
      <div class="header__notice-content">
        <div class="header__notice-content__title">
          <span class="header__notice-content__title_brand"></span>
          <span class="header__notice-content__title_name">{{seller.name}}</span>
        </div>
        <div class="header__notice-content__desc">
          {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div v-if="seller.supports" class="header__notice-content__supports">
          <span class="header__notice-content__supports_icon"></span>
          <span class="header__notice-content__supports_text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="header__bulletin"></div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: ['seller']
}
</script>

<style lang="scss">
  .header{
    color:#fff;
    background: black;
    @at-root{
      #{&}__notice{
        padding: 24px 12px 18px 24px;
        @at-root{
          #{&}-avatar{
            display: inline-block;
            vertical-align: top;
            img{
              height: 64px;
              width: 64px;
            }
          }
          #{&}-content{
            display: inline-block;
            @at-root{
              #{&}__title{
                margin: 2px 0 8px 0;
                @at-root{
                  #{&}_brand{
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    background-image: url('brand@3x.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                  }
                  #{&}_name{
                    vertical-align: top;
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                  }
                }
              }
              #{&}__desc{}
              #{&}__supports{}
            }
          }
        }
      }
    }
  }
</style>
