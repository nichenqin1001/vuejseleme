<template>
  <div id='rating' class='rating'>
    <div class="rating__type">
      <span class="rating__type-text rating__type-text_i_1">
        全部
        <span v-if="ratings" class="rating__type-text_count">{{ratings.length}}</span>
      </span>
      <span class="rating__type-text rating__type-text_i_2">
        满意
        <span v-if="ratings" class="rating__type-text_count">{{positiveRatings.length}}</span>
      </span>
      <span class="rating__type-text rating__type-text_i_3">
        不满意
        <span v-if="ratings" class="rating__type-text_count">{{negtiveRatings.length}}</span>
      </span>
    </div>
    <div @click.stop.prevent='toggleFilter' :class="{'rating__filter_status_all':!textOnly}" class="rating__filter">
      <i class="icon-check_circle"></i>
      <span class="rating__filter__text">只看有内容的评价</span>
      <span v-if="ratings" class="rating__filter__text_count">{{textOnlyRatings.length}}</span>
    </div>
    <ul class="rating__comments">
      <li v-if="toggleComment(rating.rateType,rating.text)" class="rating__comments-comment" v-for="(rating,index) in ratings">
        <div class="rating__comments-comment_left">
          <div class="rating__comments-comment_left__date">{{ratingTime[index]}}</div>
          <div class="rating__comments-comment_left__comment">
            <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i> {{rating.text}}
          </div>
        </div>
        <div class="rating__comments-comment_right">
          <div class="rating__comments-comment_right_username">{{rating.username}}</div>
          <img :src="rating.avatar" alt="" class="rating__comments-comment_right_avatar">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'rating',
    props: ['ratings', 'foodDOM'],
    computed: {
      textOnly() {
        return this.$store.getters.getTextOnly
      },
      ratingTime() {
        let ratingTime = []
        this.ratings.forEach((rating) => {
          var date = new Date(rating.rateTime)
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          let D = date.getDate() + ' '
          let h = date.getHours() + ':'
          let m = date.getMinutes() + ':'
          let s = date.getSeconds()
          var newTime = Y + M + D + h + m + s
          ratingTime.push(newTime)
        })
        return ratingTime
      },
      positiveRatings() {
        return this.ratings.filter((rating) => {
          return rating.rateType === this.$store.getters.getRateType.positive
        })
      },
      negtiveRatings() {
        return this.ratings.filter((rating) => {
          return rating.rateType === this.$store.getters.getRateType.negtive
        })
      },
      textOnlyRatings() {
        return this.ratings.filter((rating) => {
          return rating.text
        })
      }
    },
    methods: {
      toggleFilter() {
        this.$store.dispatch('toggleTextOnly')
      },
      toggleComment(type, text) {
        if (this.textOnly && !text) {
          return false
        } else {
          return true
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  @import './rating-type.scss';

</style>
