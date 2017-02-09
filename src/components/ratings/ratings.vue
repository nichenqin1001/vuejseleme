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
      <transition-group class="ratings__comments" tag='ul' name="custom-classes-transition" enter-active-class='animated bounceInLeft'
        leave-active-class='animated bounceOutLeft'>
        <li :key='rating.rateTime' v-if="toggleComment(rating.rateType,rating.text)" class="ratings__comments-comment" v-for="(rating,index) in ratings">
          <img :src="rating.avatar" alt="" class="ratings__comments-comment_avatar">
          <div class="ratings__comments-comment_username">
            <div class="ratings__comments-comment_username_name">
              {{rating.username}}
            </div>
            <div class="ratings__comments-comment_username_date">
              {{ratingTime[index]}}
            </div>
          </div>
          <div class="ratings__comments-comment_score">
            <star :size="24" :score="rating.score"></star>
            <div v-if="rating.deliveryTime" class="ratings__comments-comment_score_deliverytime">
              {{rating.deliveryTime}}分钟送达
            </div>
          </div>
          <div class="ratings__comments-comment_text">{{rating.text}}</div>
          <div class="ratings__comments-comment_recommend">
            <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" class="icon"></i>
            <div class="ratings__comments-comment_recommend_item" v-for="(recommend,index) in rating.recommend">
              {{recommend}}
            </div>
          </div>
        </li>
        </transition-group>
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
    computed: {
      ratingTime() {
        let ratingTime = []
        this.ratings.forEach((rating) => {
          var date = new Date(rating.rateTime)
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          let D = date.getDate() + ' '
          let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
          let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
          let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
          var newTime = Y + M + D + h + m + s
          ratingTime.push(newTime)
        })
        return ratingTime
      },
      textOnly() {
        return this.$store.getters.getTextOnly
      },
      rateType() {
        return this.$store.getters.getRateType
      }
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
      },
      toggleComment(type, text) {
        if (this.textOnly && !text) {
          return false
        }
        if (this.rateType === 2) {
          return true
        } else {
          return type === this.rateType
        }
      }
    },
    updated() {
      this._setRatingScroll()
      this.$store.dispatch('updateFatherScroll', this.$store.getters.getRatingScroll)
    }
  }

</script>
<style scoped lang="scss">
  @import './ratings.scss';

</style>
