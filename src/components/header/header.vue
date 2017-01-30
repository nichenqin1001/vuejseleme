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
          <span v-if="seller.supports[0].type==0" class="header__notice-content__supports_icon header__notice-content__supports_icon_i_1"></span>
          <span v-if="seller.supports[0].type==1" class="header__notice-content__supports_icon header__notice-content__supports_icon_i_2"></span>
          <span v-if="seller.supports[0].type==2" class="header__notice-content__supports_icon header__notice-content__supports_icon_i_3"></span>
          <span v-if="seller.supports[0].type==3" class="header__notice-content__supports_icon header__notice-content__supports_icon_i_4"></span>
          <span v-if="seller.supports[0].type==4" class="header__notice-content__supports_icon header__notice-content__supports_icon_i_5"></span>
          <span class="header__notice-content__supports_text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="header__notice-detail">
        <span class="header__notice-detail_count">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
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
  .header {
    color: #fff;
    background: #999;
    @at-root {
      #{&}__notice {
        position: relative;
        padding: 24px 12px 18px 24px;
        @at-root {
          #{&}-avatar {
            display: inline-block;
            vertical-align: top;
            img {
              height: 64px;
              width: 64px;
              border-radius: 2px;
            }
          }
          #{&}-content {
            display: inline-block;
            text-align: left;
            @at-root {
              #{&}__title {
                margin: 2px 0 8px 0;
                @at-root {
                  #{&}_brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    background-image: url('brand@3x.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                  }
                  #{&}_name {
                    vertical-align: top;
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                  }
                }
              }
              #{&}__desc {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
              }
              #{&}__supports {
                @at-root {
                  #{&}_icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    background-size: contain;
                    @at-root {
                      @for $i from 1 through 5 {
                        #{&}_i_#{$i} {
                          @if $i==1 {
                            background-image: url('decrease_1@2x.png')
                          }
                          @if $i==2 {
                            background-image: url('discount_1@2x.png')
                          }
                          @if $i==3 {
                            background-image: url('guarantee_1@2x.png')
                          }
                          @if $i==4 {
                            background-image: url('invoice_1@2x.png')
                          }
                          @if $i==5 {
                            background-image: url('special_1@2x.png')
                          }
                        }
                      }
                    }
                  }
                  #{&}_text {
                    vertical-align: top;
                    line-height: 12px;
                    font-size: 12px;
                  }
                }
              }
            }
          }
          #{&}-detail {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;
            @at-root {
              #{&}_count {
                font-size: 10px;
                .icon-keyboard_arrow_right::before {
                  margin-left: 2px;
                  line-height: 24px;
                  font-size: 10px;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
