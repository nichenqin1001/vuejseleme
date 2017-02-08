<template>
  <div id="ratings" class="ratings" ref="rating">
    <div class="rating-wrapper">
      <div class="ratings__overview">
        <div class="ratings__overview-left">
          <div class="ratings__overview-left_score">{{seller.score}}</div>
          <div class="ratings__overview-left_title">综合评分</div>
          <div class="ratings__overview-left_rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="ratings__overview-right">
          <div class="ratings__overview-right_service">
            <div class="ratings__overview-right_service_text">服务态度</div>
            <star :score="seller.score" :size="36"></star>
            <div class="ratings__overview-right_service_score">
              {{seller.score}}
            </div>
          </div>
          <div class="ratings__overview-right_food">
            <div class="ratings__overview-right_service_text">商品评分</div>
            <star :score="seller.foodScore" :size="36"></star>
            <div class="ratings__overview-right_food_score">
              {{seller.foodScore}}
            </div>
          </div>
          <div class="ratings__overview-right_deliverytime">
            <div class="ratings__overview-right_deliverytime_text">
              送达时间
            </div>
            <div class="ratings__overview-right_deliverytime_time">
              {{seller.deliveryTime}}分钟
            </div>
          </div>
        </div>
      </div>
      <rating class="ratings__rating" :ratings="ratings"></rating>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  import star from 'components/star/star'
  import rating from 'components/rating-type/rating-type'
  const ERR_OK = 0
  export default {
    name: 'ratings',
    props: ['seller'],
    components: {
      star,
      rating
    },
    data() {
      return {
        ratings: []
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
        }
      })
    },
    methods: {
      _setRatingScroll() {
        var scroll = new Bscroll(this.$refs.rating, {
          click: true
        })
        this.$store.dispatch('updateRatingScroll', scroll)
      }
    },
    updated() {
      this._setRatingScroll()
    }
  }

</script>
<style scoped lang="scss">
  @import './ratings.scss';

</style>
