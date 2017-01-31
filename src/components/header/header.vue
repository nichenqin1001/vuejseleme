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
        <div v-if="seller.supports" class="header__notice-detail" v-on:click="showDetail">
          <span class="header__notice-detail_count">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
        </div>
      </div>
    </div>
    <!--header__notice-->
    <div class="header__bulletin" v-on:click="showDetail">
      <span class="header__bulletin-brand"></span>
      <span class="header__bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--header__bulletin-->
    <div class="header__background">
      <img :src="seller.avatar" alt="">
    </div>
    <!--header__background-->
    <transition name="custom-classes-transition"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutLeft">
      <div v-show="coverShow" class="header__cover">
        <div class="header__cover-content">
          <h1 class="header__cover-content_name">{{seller.name}}</h1>
          <div class="header__cover-content_star">
            <v-star v-bind:score="seller.score"></v-star>
          </div>
          <div class="header__cover-content_title">
            <div class="header__cover-content_title_text">优惠信息</div>
          </div>
          <ul class="header__cover-content_supports" v-if="seller.supports">
            <li class="header__cover-content_supports_support" v-for="(support,index) in seller.supports">
              <img :class="'icon-'+clsMap[support.type]" alt="" class="header__cover-content_supports_support_icon">
              <span class="header__cover-content_supports_support_text">{{support.description}}</span>
            </li>
          </ul>
          <div class="header__cover-content_title">
            <div class="header__cover-content_title_text">商家公告</div>
          </div>
          <div class="header__cover-content_bulletin">{{seller.bulletin}}</div>
        </div>
        <footer class="header__cover-close">
          <i class="icon-close" v-on:click="hideDetail"></i>
        </footer>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from 'components/star/star'

  export default {
    name: 'header',
    data() {
      return {
        coverShow: false,
        clsMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    props: ['seller'],
    methods: {
      showDetail() {
        this.coverShow = true
      },
      hideDetail() {
        this.coverShow = false
      }
    },
    components: {
      'v-star': star
    }
  }

</script>
<style lang="scss">
  @import '../../common/scss/base.scss';
  .header {
    position: relative;
    text-align: left;
    color: #fff;
    background: rgba(7, 17, 27, 0.2);
    overflow: hidden;
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
              margin-right: 4px;
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
      #{&}__bulletin {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 28px;
        line-height: 28px;
        padding: 0 12px;
        background: rbga(7, 17, 27, 0.5);
        @at-root {
          #{&}-brand {
            display: inline-block;
            margin-right: 4px;
            min-width: 22px;
            height: 12px;
            background: url('bulletin@2x.png') no-repeat;
            background-size: contain;
          }
          #{&}-text {
            white-space: nowrap;
            overflow: hidden;
            font-size: 10px;
            text-overflow: ellipsis;
          }
          .icon-keyboard_arrow_right {
            font-size: 10px;
          }
        }
      }
      #{&}__background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        filter: blur(10px);
        img {
          width: 100%;
        }
      }
      #{&}__cover {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        min-height: 100vh;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        text-align: center;
        @at-root {
          #{&}-content {
            flex: 1;
            padding-top: 64px;
            @at-root {
              #{&}_name {
                font-size: 16px;
                line-height: 16px;
                font-weight: 700;
              }
              #{&}_star {
                margin: 20px 0;
              }
              #{&}_title {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px auto;
                width: 80%;
                &::before,
                &::after {
                  @extend .pseudo-element;
                  flex: 1;
                  border: 1px solid rgba(255, 255, 255, 0.2)
                }
                @at-root {
                  #{&}_text {
                    padding: 0 12px;
                    font-size: 14px;
                    font-weight: 700;
                  }
                }
              }
              #{&}_supports {
                list-style: none;
                text-align: left;
                @at-root {
                  #{&}_support {
                    display: flex;
                    align-items: center;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    img {
                      width: 24px;
                      height: 24px;
                      margin-right: 10px;
                    }
                    @at-root {
                      #{&}_text {
                        font-weight: 400;
                      }
                    }
                  }
                }
              }
              #{&}_bulletin {
                width: 80%;
                margin: 0 auto;
                text-align: left;
                line-height: 24px;
                font-size: 14px;
                text-indent: 28px;
              }
            }
          }
          #{&}-close {
            margin-bottom: 20px;
            .icon-close::before {
              font-size: 40px;
            }
          }
        }
      }
    }
  }

</style>
