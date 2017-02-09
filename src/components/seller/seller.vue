<template>
  <div class="seller-wrapper" ref="sellerScroll">
    <div id="seller" class="seller">
      <div class="seller__header">
        <div class="seller__header_title">
          <div class="seller__header_title_name">{{seller.name}}</div>
          <div class="seller__header_title_score">
            <star :size="36" :score="seller.score"></star>
            <div class="seller__header_title_score_count">
              ({{seller.ratingCount}})
            </div>
            <div class="seller__header_title_score_sellcount">
              月售{{seller.sellCount}}单
            </div>
          </div>
          <div @click="toggleCollection" class="seller__header_title_heart">
            <i :class="{collected,collected}" class="icon-favorite"></i>
            <div v-if="collected" class="seller__header_title_heart_text">已收藏</div>
            <div v-else class="seller__header_title_heart_text">点击收藏</div>
          </div>
        </div>
        <div class="seller__header_info">
          <div class="seller__header_info_item seller__header_info_item_1">
            <div class="seller__header_info_item_title">
              起送价
            </div>
            <div class="seller__header_info_item_num">
              {{seller.minPrice}}<span class="unit">元</span>
            </div>
          </div>
          <div class="seller__header_info_item seller__header_info_item_2">
            <div class="seller__header_info_item_title">
              商家配送
            </div>
            <div class="seller__header_info_item_num">
              {{seller.deliveryPrice}}<span class="unit">元</span>
            </div>
          </div>
          <div class="seller__header_info_item seller__header_info_item_3">
            <div class="seller__header_info_item_title">
              平均配送时间
            </div>
            <div class="seller__header_info_item_num">
              {{seller.deliveryTime}}<span class="unit">分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="seller__notice">
        <div class="seller__notice_bulletin">
          <h3 class="seller__notice_bulletin_title">公告与活动</h3>
          <p class="seller__notice_bulletin_text">{{seller.bulletin}}</p>
        </div>
        <supports class="seller__notice_supports" :supports="seller.supports"></supports>
      </div>
      <div class="seller__site">
        <h1 class="seller__site_title">商家实景</h1>
        <div class="images-wrapper" ref="imagesWrapper">
          <ul class="seller__site_images" ref="gallery">
            <li class="seller__site_images_image" v-for="(image,index) in seller.pics">
              <img :src="image" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="seller__info"></div>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  import star from 'components/star/star'
  import supports from 'components/supports/supports'
  export default {
    name: 'seller',
    props: ['seller'],
    components: {
      star,
      supports
    },
    computed: {
      collected() {
        return this.$store.state.collected
      },
      clsMap() {
        return this.$store.state.clsMap
      }
    },
    methods: {
      toggleCollection() {
        this.$store.dispatch('toggleCollection')
      },
      _setScroll(DOM, targetScroll) {
        var scroll = new Bscroll(DOM, {
          click: true
        })
        this.$store.dispatch(targetScroll, scroll)
      },
      _setHorizonScroll(DOM, targetScroll) {
        var scroll = new Bscroll(DOM, {
          click: true,
          scrollX: true
        })
        this.$store.dispatch(targetScroll, scroll)
      },
      _setGalleryWidth() {
        let imageWidth = 120
        let imageMargin = 6
        let width = (imageWidth + imageMargin) * this.seller.pics.length - imageMargin
        this.$refs.gallery.style.width = width + 'px'
      }
    },
    created() {
      this.$nextTick(() => {
        this._setScroll(this.$refs.sellerScroll, 'updateSellerScroll')
        this._setGalleryWidth()
        this._setHorizonScroll(this.$refs.imagesWrapper, 'updateImageScroll')
      })
    }
  }

</script>
<style lang="scss">
  @import './seller.scss';

</style>
